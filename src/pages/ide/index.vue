<template>
    <CongratsModal ref="congratModal" @continue="continueLevel"/>
    <AchievementModal ref="achievementModal"/>
    <canvas class="confetti-view" ref="confettiView"></canvas>
    <div class="page-trans bg-light-400" :class="{ 'loaded': !nextMapLoading, 'loading': pageLoading}">
        <div class="w-100 h-100 d-flex justify-content-center align-items-center flex-column pg-fadein" v-if="!nextMapLoading">
            <div class="chick-spinner" style="height: 100px; width: 100px;"></div>
            <h4 class="mt-2">กำลังโหลด...</h4>
            <p class="text-muted">ใช่ครับ สิ่งที่คุณกำลังเห็นอยู่คือมันกำลังโหลด</p>
        </div>
    </div>
    <div class="editor-top flex-row justify-content-center" :class="{ 'loading': !codeDone }">
        <div class="d-flex align-items-center p-2 ms-3">
            <a @click="requestEnd" href="#"><vue-feather type="x" class="me-2" stroke="#606060" /></a>
            <a @click="toggleBlocksMenu" id="blocksMenuBtn" href="#" class="blockmenu-btn me-2 d-md-none d-block"><img src="@/assets/blocks_icon.svg"></a>

            <img src="@/assets/logo/logobeta.png" class="me-2" height="35">
        </div>
        <div class="flex-grow-1 d-flex justify-content-center d-md-block d-none">
            <div class="text-center">
                <h5 class="m-0">{{ levelDataRef['title'] || "[]" }}</h5>
                <p class="text-muted m-0">ไก่น้อย ผจญภัย</p>
            </div>
        </div>
        <div class="flex-grow-1 d-md-none d-block"></div>
        <div class="col-md-2 d-md-block d-none">
            <div class="rounded bg-light-400 p-1 editor-mode float-end me-2">
                <button class="btn btn-primary">Block</button>
                <!--
                    <button class="btn btn-transparent">Python</button>
                    -->
            </div>
        </div>
        <div class="col-md-2 d-md-none d-block">
            <a @click="togglePlayMode" id="playModeBtn" href="#" class="playmode-btn"><vue-feather type="play" class="me-2" stroke="#606060" /></a>
        </div>
    </div>
    <div class="d-flex flex-md-row flex-column editor-middle" ref="editorMiddle">
        <div class="col-md-3 p-4 pt-0 run-code-menu" :class="{'open': playModeEnabled}">
            <div id="runResult" class="runResult mt-3" ref="runResult"
                :style="`aspect-ratio: ${lessonKindData.ratio[0]} / ${lessonKindData.ratio[1]};`">
            </div>
            <div class="d-flex justify-content-center mt-2">
                <div class="btn-group tool-btns" id="runCodeBtn">
                    <div class="btn btn-success run-code-btn" @click="runCode" v-if="!codeRunning">
                        <vue-feather type="play" stroke="#FFF" />
                    </div>
                    <div class="btn btn-warning" @click="stopCode" v-if="codeRunning && codeDone">
                        <vue-feather type="refresh-cw" stroke="#FFF" />
                    </div>
                    <div class="btn btn-danger" @click="stopCode" v-if="codeRunning && !codeDone">
                        <vue-feather type="octagon" stroke="#FFF" />
                    </div>
                    <div class="btn btn-danger d-md-none d-block" @click="exitPlayMode()">
                        <vue-feather type="chevron-down" stroke="#FFF" />
                    </div>
                </div>
            </div>

            <div class="card shadow-sm mt-2 d-md-block d-none" v-if="hasBlockLimit">
                <div class="card-body d-flex">
                    <vue-feather type="alert-circle" stroke="#F23051" size="20px"></vue-feather>
                    <p class="m-0 ms-2" v-if="blockLeft != 0">คุณใข้บล็อกได้อีกแค่ <b>{{ blockLeft }}</b> บล็อกเท่านั้น
                    </p>
                    <p class="m-0 ms-2 text-danger" v-else>คุณไม่เหลือบล็อกให้ใช้แล้ว ถ้าต้องการแก้ไข ให้ลบบล็อกออกก่อน
                    </p>
                </div>
            </div>
        </div>
        <div class="flex-grow-1 d-flex flex-column editor-container">
            <div class="flex-grow-1 editor-zone" :class="{ 'editor-running': codeRunning && !codeDone }"
                @mousemove="updateBlockLimit" @touchend="updateBlockLimit" @touchstart="updateBlockLimit">

                <BlockEditor ref="bEditor" :options="blocklyConfig">
                </BlockEditor>
            </div>

            <div class="shadow-sm p-2 d-md-none d-block border border-1" v-if="hasBlockLimit" :class="{'border-danger': blockLeft == 0}">
                <div class="card-body d-flex">
                    <vue-feather type="alert-circle" stroke="#F23051" size="20px"></vue-feather>
                    <p class="m-0 ms-2">คุณใข้บล็อกได้อีกแค่ <b>{{ blockLeft }}</b> บล็อกเท่านั้น
                    </p>
                </div>
            </div>

            <DialogueView ref="dialogueView" @onDialogueData="newDialogueData"/>
            
        </div>
</div>
</template>

<script setup>
import BlockEditor from './editors/block.vue'
import { onMounted, ref, inject } from 'vue'
import { findLevel } from '@/lessons/lessons.js'
import { playAudio } from '../../libs/audioSystem.js'
import { giveAchievement } from '../../libs/achievementUtils.js'
import { save_mergeable } from '../../libs/blocklyFiles.js'
import { writeUserData, getUserData, writeStorageData } from '../../libs/firebaseSystem.js'
import CongratsModal from "@/components/CongratsModal.vue"
import DialogueView from "./component/DialogueView.vue"
import AchievementModal from "@/components/AchievementModal.vue"

const toolbox = {
    kind: "flyoutToolbox",
    contents: []
}

const router = inject("router")
const store = inject("store")

let lessonData;
let lessonKind;
let blockset;

const levelDataRef = ref({})
const bEditor = ref(null)
const pageLoading = ref(true)
const codeRunning = ref(false)
const runResult = ref(null)
const codeDone = ref(true)
const congratModal = ref(null)
const editorMiddle = ref(null)

const dialogueView = ref(null)
const achievementModal = ref(null)

const hasBlockLimit = ref(false)
const blockLeft = ref(4)
const confettiView = ref()

const delayInms = ref(500)

const lessonKindData = ref({
    ratio: [1, 1]
})

let levelID = ""
let sessionData = {
    codeStop: false
}

let blocklyWorkspace;
let interpreterData;

const blocklyConfig = ref({
    toolbox: toolbox,
    media: "/blockly_editor/",
    grid: {
        colour: "#00000005",
        length: 50,
        spacing: 20
    },
    zoom: {
        controls: true,
        wheel: true
    },
    trashcan: true
})

const nextMapLoading = ref(false)

const updateBlockLimit = () => {
    blockLeft.value = blocklyWorkspace.remainingCapacity()
    
    dialogueView.value.blockCountUpdate(blocklyWorkspace.getAllBlocks(false).length)
}

let toolboxE;

onMounted(async () => {
    // Load Level
    levelID = router.currentRoute.value.params['id']

    playModeEnabled.value = true

    if (typeof (levelID) == 'string') {
        const b = findLevel(levelID)

        if (b) {
            lessonData = await b.levelData()
            lessonKind = await lessonData.levelKind()
            blockset = await lessonKind.blockset()

            lessonKindData.value = lessonKind.kindData

            interpreterData = await lessonKind.init(runResult.value, lessonData.levelData)

            blockset.init()
            toolbox.contents = lessonData.blocks

            levelDataRef.value = lessonData.levelData

            if (lessonData.levelData["blockLimit"]) {
                blocklyConfig.value['maxBlocks'] = lessonData.levelData.blockLimit
                hasBlockLimit.value = true
            }

            blocklyWorkspace = bEditor.value.initBlockly()
            

            console.log(blocklyWorkspace)

            pageLoading.value = false

            updateBlockLimit()

            if (window.outerWidth <= 600) {
                setTimeout(() => { 
                    playModeEnabled.value = false
                    dialogueView.value.runDialogue(lessonData.dialogue)
                }, 2000)
            } else {
                setTimeout(() => {
                    console.log(lessonData.dialogue)
                    dialogueView.value.runDialogue(lessonData.dialogue)
                }, 2000)
            }

            toolboxE = document.querySelectorAll('.injectionDiv .blocklyFlyout')[1]

        } else {

            await Swal.fire({
                title: 'ไม่เจอบทเรียน',
                text: "ไม่พบบทเรียนในระบบ",
                icon: 'error',
                confirmButtonText: 'ออก',
            })

            router.push('/learn')
        }
    }
})

const requestEnd = async () => {
    const res = await Swal.fire({
        title: 'ยืนยันการออกจากบทเรียน',
        text: "คุณต้องการที่จะออกจากบทเรียนหรือไม่?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ออก',
        cancelButtonText: 'ยกเลิก',
    })

    if (res.isConfirmed) {
        router.push('/learn')
    }
}

const delay = () => {
    return new Promise(resolve => setTimeout(resolve, delayInms.value));
}

const continueLevel = async() => {
    congratModal.value.closeM()
    nextMapLoading.value = true
    pageLoading.value = true
    
    setTimeout(() => {
        router.push(`/workspace/${parseInt(levelID) + 1}`)

        setTimeout(() => {
            router.go(0) 
        }, 100)
    },500)
}

const stopCode = async () => {
    sessionData.codeStop = true

    codeRunning.value = false
    codeDone.value = true

    lessonKind.reset(blocklyWorkspace, interpreterData)
}

const playModeEnabled = ref(false)

const enterPlayMode = () => {
    playModeEnabled.value = true
    playAudio("play-mode.mp3")
}

const togglePlayMode = () => {
    if (playModeEnabled.value) {
        playModeEnabled.value = false
        playAudio("exit-play-mode.mp3")
    } else {
        playModeEnabled.value = true
        playAudio("play-mode.mp3")
    }
}

const exitPlayMode = (playSound = true) => {
    if (!codeDone.value) {
        return
    }
    playModeEnabled.value = false

    if (playSound) {
        playAudio("exit-play-mode.mp3")
    }
}

const newDialogueData = (data) => {
    

    if (data.type == "enterPlayMode") {
        playModeEnabled.value = true
    }
    if (data.type == "exitPlaymode") {
        playModeEnabled.value = false
    }
}
/*
const saveCodeUser = async () => {
    console.log(Blockly)
    console.log(Blockly.serialization)
    const serializer = new Blockly.serialization.blocks.BlockSerializer();
    const state = serializer.save(blocklyWorkspace);

    console.log(state)

    //serializer.load(state, blocklyWorkspace);

    await writeStorageData(store, `blockly_saves/${levelID}.moderm`)
}
*/

const runCode = async () => {
    lessonKind.reset(blocklyWorkspace, interpreterData)

    let code = blockset.generate(blocklyWorkspace)

    codeRunning.value = true

    console.log(code)

    codeDone.value = false

    sessionData.codeStop = false
    let levelPassed = await lessonKind.run(code, interpreterData, delay, blocklyWorkspace, sessionData)

    console.log(levelPassed)

    await delay()

    codeDone.value = true

    if (levelPassed) {

        store.state.fireLoading()

        let achRes;

        if (levelDataRef.value["achievement"]) {
            achRes = await giveAchievement(store, levelDataRef.value["achievement"])
        }

        const userData = await getUserData(store)

        if (userData.level_passed == parseInt(levelID)) {
            await writeUserData(store.state.user, {
                level_passed: parseInt(levelID) + 1
            })
        }

        await writeUserData(store.state.user, {
            exp: userData.exp + 10
        })

        if (achRes && achRes.success) {
            achievementModal.value.openM(levelDataRef.value["achievement"], achRes.data)
        }

        playAudio("correct.wav")

        //await saveCodeUser()

        congratModal.value.openM(levelID)

        store.state.fireLoadStop()

        const confetti = await import('canvas-confetti');

        let confEmitter = confetti.create(confettiView.value, {
            resize: true,
            useWorker: true
        })

        confEmitter({
            particleCount: 250,
            spread: 360,
        })
    } else {
        playAudio("failed-run.mp3")

        dialogueView.value.resetText()
        dialogueView.value.typeText("ดูเหมือนว่าโค้ดยังไม่ถูกน่ะ ลองแก้ไขโค้ดดูใหม่น่ะ คุณทำได้!")

        if (window.outerWidth < 600) {
            exitPlayMode(false)
        }
    }
}

const blockMenuOn = ref(true)

const openBlocksMenu = () => {
    blockMenuOn.value = true

    setTimeout(() => {
        toolboxE.style.display = "block"
    }, 10);
}


const closeBlocksMenu = () => {
    blockMenuOn.value = false

    toolboxE.style.display = "none"
}

const toggleBlocksMenu = () => {
    if (blockMenuOn.value) {
        closeBlocksMenu()
    } else {
        openBlocksMenu()
    }
}

</script>

<style scoped>
.runResult {
    background-color: black;
    border-radius: 10px;
    overflow: hidden;
}

.tool-btns {
    overflow: hidden;
    border-radius: 10px;
}

.progressBar .prog {
    height: 100%;
    background-color: #f23051;

    transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);

    box-shadow: inset 0px -2px 0px rgb(21 21 21 / 25%);

    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
}

.progressBar {
    width: 150px;
    background-color: #ca233f;

    animation: progressBarShow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    animation-fill-mode: forwards;

    cursor: pointer;
}

@keyframes stopCodeBtn {
    from {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }

    to {
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
    }
}


@keyframes progressBarShow {
    from {
        width: 0px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    to {
        width: 150px;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
    }
}

@keyframes runCodeHide {
    from {
        width: 198px;
        background-color: #f23051;
    }

    to {
        width: 52px;
        background-color: #26BF5B;
    }
}

.editor-container {
    background-color: white;
}

.no-blockwrite {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
}

.editor-top {
    display: flex;
    height: 60px;
    align-items: center;
}

@media only screen and (max-width: 600px) {
    .editor-top {
        height: auto;
    }
}

@keyframes editorTopPop {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
}

.pg-fadein {
    animation: fadeIn 0.5s;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
}

.editor-middle {
    height: calc(100vh - 50px);
}

.editor-mode {
    display: inline-block;
}

.chick-frame {
    border-radius: 50px;
    width: 100px;
    height: 100px;
    background: #DFDFDF;
}

.editor-zone {
    overflow: hidden;
}

.confetti-view {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 1056;
}

.editor-zone.editor-running {
    opacity: 0.9;
    pointer-events: none;
}

.playmode-btn .vue-feather {
    animation: focusScale 0.5s linear;
    animation-delay: 5s;
}

@keyframes focusScale {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}

@media only screen and (max-width: 600px) {
    .editor-zone {
        height: calc(100vh - 200px);
    }

    .run-code-menu {
        position: fixed;
        height: calc(60vh + 100px);
        width: 100%;
        z-index: 50;
        background: linear-gradient(180deg, #D8D8D8 0%, #F3F3F3 100%);
        top: 100%;
        transition: top 0.25s;
        transition-timing-function: cubic-bezier(0.36, 0, 0.66, -0.56);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .run-code-menu.open {
        transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        top: calc(40vh - 50px);
        box-shadow: 0 -0.5rem 1rem rgb(0 0 0 / 7%) !important;
    }
}

.editor-top.loading {
    background: linear-gradient(90deg, #F3F3F3 0%, #FFD5BF 34.05%, #F3F3F3 61.46%, #F3F3F3 100%);
    animation: loadingGradient 2s linear;
    animation-iteration-count: infinite;
    background-size: 400% 100%;

    background-repeat: repeat-y;
}


@keyframes loadingGradient {
    0% {
        background-position: -100% 0%;
    }

    100% {
        background-position: 100% 0%;
    }
}
</style>
