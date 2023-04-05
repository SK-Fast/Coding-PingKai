<template>
    <CongratsModal ref="congratModal" @continue="continueLevel" />
    <AchievementModal ref="achievementModal" />
    <canvas class="confetti-view" ref="confettiView"></canvas>
    <div class="page-trans bg-light-400"
        :class="{ 'loaded': !pageLoading, 'loading-no-anim': pageLoading && !nextLevelWarp, 'loading': nextLevelWarp }">
        <div class="w-100 h-100 d-flex justify-content-center align-items-center flex-column pg-fadein"
            v-if="!nextLevelWarp">
            <div class="chick-spinner" style="height: 100px; width: 100px;"></div>
            <h4 class="mt-2">กำลังโหลด...</h4>
            <p class="text-muted">ใช่ครับ สิ่งที่คุณกำลังเห็นอยู่คือมันกำลังโหลด</p>
        </div>
    </div>
    <div class="editor-top flex-row justify-content-center" :class="{ 'loading': !codeDone }">
        <div class="d-flex align-items-center p-2 ms-3">
            <a @click="requestEnd" href="#"><vue-feather type="home" class="me-2" stroke="#606060" /></a>
            <a @click="toggleBlocksMenu" id="blocksMenuBtn" class="blockmenu-btn me-2 d-md-none d-block"><img
                    src="@/assets/blocks_icon.svg"></a>

            <img src="@/assets/logo/Logo_Text.png" class="me-2" height="35">
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
                <button class="btn" :class="{ 'btn-primary': editorMode == 0, 'btn-transparent': editorMode != 0 }"
                    @click="switchMode(0)">Block</button>
                <button class="btn" :class="{ 'btn-primary': editorMode == 1, 'btn-transparent': editorMode != 1 }"
                    @click="switchMode(1)">Python</button>
            </div>
        </div>
        <div class="col-md-2 d-md-none d-block">
            <a @click="togglePlayMode" id="playModeBtn" href="#" class="playmode-btn"><vue-feather type="play" class="me-2"
                    stroke="#606060" /></a>
        </div>
    </div>
    <div class="d-flex flex-md-row flex-column editor-middle" ref="editorMiddle">
        <div class="col-md-3 p-4 pt-0 run-code-menu d-flex flex-column" :class="{ 'open': playModeEnabled }">
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

            <div class="card shadow-sm mt-2 d-md-block d-none" v-if="hasBlockLimit && editorMode == 0">
                <div class="card-body d-flex">
                    <vue-feather type="alert-circle" stroke="#F23051" size="20px"></vue-feather>
                    <p class="m-0 ms-2" v-if="blockLeft != 0">คุณใช้บล็อกได้อีกแค่ <b>{{ blockLeft }}</b> บล็อกเท่านั้น
                    </p>
                    <p class="m-0 ms-2 text-danger" v-else>คุณไม่เหลือบล็อกให้ใช้แล้ว ถ้าต้องการแก้ไข ให้ลบบล็อกออกก่อน
                    </p>
                </div>
            </div>

            <div class="card shadow-sm mt-2 d-md-block d-none" v-if="editorMode == 1">
                <div class="card-header">
                    <h5 class="mb-0">ฟังก์ชั่นต่างๆ</h5>
                </div>
                <div class="card-body python-snippets">
                    <div v-for="ps in blocksetRef.pythonSnippets" class="mb-2">
                        <div>
                            <code class="user-selectable">{{ ps.insertText.replace('\n', '') }}</code><br>
                        </div>
                        <p class="mb-0 text-muted">{{ ps.documentation }}</p>
                        <hr>
                    </div>
                </div>
            </div>

            <div class="card shadow-sm mt-2 d-md-block d-none error-flash" v-if="pythonError != '' && editorMode == 1">
                <div class="card-body d-flex">
                    <vue-feather type="alert-circle" stroke="#F23051" size="20px"></vue-feather>
                    <p class="m-0 ms-2 text-danger">{{ pythonError }}</p>
                </div>
            </div>

        </div>
        <div class="flex-grow-1 d-flex flex-column editor-container">
            <div class="flex-grow-1 editor-zone" :class="{ 'editor-running': codeRunning && !codeDone }">

                <BlockEditor ref="bEditor" :options="blocklyConfig" :class="{ 'd-none': editorMode != 0 }">
                </BlockEditor>
                <PythonEditor ref="pEditor" class="h-100" :class="{ 'd-none': editorMode != 1 }"></PythonEditor>
            </div>

            <div class="shadow-sm p-2 d-md-none d-block border border-1" v-if="hasBlockLimit && editorMode == 0"
                :class="{ 'border-danger': blockLeft == 0 }">
                <div class="card-body d-flex">
                    <vue-feather type="alert-circle" stroke="#F23051" size="20px"></vue-feather>
                    <p class="m-0 ms-2">คุณใช้บล็อกได้อีกแค่ <b>{{ blockLeft }}</b> บล็อกเท่านั้น
                    </p>
                </div>
            </div>

            <div class="shadow-sm p-2 d-md-none d-block border border-1 error-flash"
                v-if="pythonError != '' && editorMode == 1" :class="{ 'border-danger': blockLeft == 0 }">
                <div class="card-body d-flex">
                    <vue-feather type="alert-circle" stroke="#F23051" size="20px"></vue-feather>
                    <p class="m-0 ms-2 text-danger">{{ pythonError }}
                    </p>
                </div>
            </div>

            <DialogueView ref="dialogueView" @onDialogueData="newDialogueData" />

        </div>
    </div>
</template>

<script setup>
import BlockEditor from './editors/block.vue'
import PythonEditor from './editors/python.vue'
import { onMounted, ref, inject } from 'vue'
import { findLevel } from '@/lessons/lessons.js'
import { playAudio } from '../../libs/audioSystem.js'
import { giveAchievement } from '../../libs/achievementUtils.js'
import { writeUserData, getUserData, writeStorageData, readStorageData } from '../../libs/firebaseSystem.js'
import CongratsModal from "@/components/CongratsModal.vue"
import DialogueView from "./component/DialogueView.vue"
import AchievementModal from "@/components/AchievementModal.vue"

const toolbox = {
    kind: "flyoutToolbox",
    contents: []
}

const router = inject("router")
const store = inject("store")
const editorMode = ref(0)

let lessonData;
let lessonKind;
let blockset;

const levelDataRef = ref({})
const bEditor = ref(null)
const pEditor = ref(null)
const pageLoading = ref(true)
const codeRunning = ref(false)
const runResult = ref(null)
const codeDone = ref(true)
const congratModal = ref(null)
const editorMiddle = ref(null)

const dialogueView = ref(null)
const achievementModal = ref(null)
const blocksetRef = ref(null)

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
let monacoEditor;
let pythonError = ref("")
const nextLevelWarp = ref(false)

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

const updateBlockLimit = () => {
    if (editorMode.value !== 0) {
        return
    }

    blockLeft.value = blocklyWorkspace.remainingCapacity()

    dialogueView.value.blockCountUpdate(blocklyWorkspace.getAllBlocks(false).length)
}

let toolboxE;

const loadUserCode = async () => {
    const rs = await readStorageData(store, `blockly_saves/${parseInt(levelID)}.moderm`)
    if (rs == false) {
        return false
    } else {
        const rqData = JSON.parse(rs)

        console.log(rqData)

        bEditor.value.loadCode(rqData.blockly)
        pEditor.value.loadCode(rqData.python)

        return true
    }
}

onMounted(async () => {
    // Load Level
    levelID = router.currentRoute.value.params['id']

    playModeEnabled.value = true

    if (typeof (levelID) == 'string') {
        const b = findLevel(levelID)

        if (b) {
            const userData = await getUserData(store)

            if (userData.level_passed !== parseInt(levelID)) {
                await Swal.fire({
                    title: 'ด่านถูกล็อกไว้',
                    text: "คุณต้องผ่านด่านที่แล้วก่อน",
                    icon: 'error',
                    confirmButtonText: 'ปิด',
                })

                router.push('/learn')

                return
            }

            lessonData = await b.levelData()
            lessonKind = await lessonData.levelKind()
            blockset = await lessonKind.blockset()

            lessonKindData.value = lessonKind.kindData
            blocksetRef.value = blockset
            lessonKindData.value.ratio = lessonData.levelData.ratio || lessonKind.kindData.ratio

            interpreterData = await lessonKind.init(runResult.value, lessonData.levelData)

            blockset.init()
            toolbox.contents = lessonData.blocks
            levelDataRef.value = lessonData.levelData
            console.log("levelDataRef", levelDataRef.value)

            if (lessonData.levelData["blockLimit"]) {
                blocklyConfig.value['maxBlocks'] = lessonData.levelData.blockLimit + 1
                hasBlockLimit.value = true
            }

            let [bW, onStartBlock] = bEditor.value.initBlockly(blockset.blocklyJSON)
            blocklyWorkspace = bW

            blocklyWorkspace.addChangeListener(updateBlockLimit)

            updateBlockLimit()

            let pythonSnippets = blockset.pythonSnippets

            console.log(pEditor.value)
            monacoEditor = await pEditor.value.initEditor(pythonSnippets)

            console.log('pageLoading.value', pageLoading.value)

            const fileExists = await loadUserCode()
            if (fileExists) {
                onStartBlock.dispose(true)
            }

            pageLoading.value = false

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

const switchMode = (v) => {
    editorMode.value = v

    if (v == 1) {
        let originCode = monacoEditor.getValue()
        let codeLine = originCode.split('\n')

        if (originCode == '' || codeLine == '\tpass') {
            let code = blockset.generate(blocklyWorkspace, true)
            let lines = []

            for (const l of code.split('\n')) {
                if (l == 'async def main():' || l == 'main()') {
                    continue
                }
                lines.push(l.replace('  ', ''))
            }

            if (lines[1] !== '	pass') {
                monacoEditor.getModel().setValue(lines.join('\n'));
            }
        }
    }
}

const continueLevel = async () => {
    congratModal.value.closeM()
    nextLevelWarp.value = true
    pageLoading.value = true

    setTimeout(async () => {
        router.push(`/workspace/${parseInt(levelID) + 1}`)

        const { detect } = await import("detect-browser")

        const browser = detect()

        if (browser.os == 'iOS' || browser.name == 'safari' || browser.os == 'Mac OS') {
            console.log("iOS detected, reloading the application...")
            setTimeout(() => {
                location.href = `/workspace/${parseInt(levelID) + 1}?skip-loading=true`
            }, 20);
        }

    }, 500)
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

const saveCodeUser = async () => {
    const blocklyCode = bEditor.value.saveCode()
    const pythonCode = pEditor.value.saveCode()

    const fileData = {
        version: __APP_VERSION__,
        level: parseInt(levelID),
        blockly: blocklyCode,
        python: pythonCode
    }

    await writeStorageData(store, `blockly_saves/${parseInt(levelID)}.moderm`, JSON.stringify(fileData))
}

const evalCode = async (code) => {
    codeRunning.value = true

    codeDone.value = false

    console.log(code)

    sessionData.codeStop = false

    pythonError.value = ""

    let levelPassed = await lessonKind.run(code, interpreterData, delay, blocklyWorkspace, sessionData).catch((ee) => {
        pythonError.value = ee
    })

    console.log(levelPassed)

    await delay()

    codeDone.value = true

    if (levelPassed) {

        store.state.fireLoading()

        await saveCodeUser()

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
            exp: userData.exp + 10,
            last_level_date: new Date()
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

const runCode = () => {
    lessonKind.reset(blocklyWorkspace, interpreterData)

    if (editorMode.value == 0) {
        let code = blockset.generate(blocklyWorkspace)

        code = '"""\n' + code + '"""\n'

        evalCode(code)
    } else if (editorMode.value == 1) {
        let originCode = monacoEditor.getValue()
        let resultCode = ""

        for (const v of originCode.split('\n')) {
            let tabC = ''
            const tabCount = (v.match(/  /g) || []).length;

            console.log(tabCount)

            tabC = '  '.repeat(tabCount)

            resultCode += `\n${tabC}check_code_stop()\n`
            resultCode += `${v}\n`
        }

        console.log(resultCode)
        evalCode(resultCode)
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

.error-flash {
    animation: errorFlash 1s;
}

@keyframes errorFlash {
    from {
        background-color: hsl(0, 100%, 89%);
    }
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

@media only screen and (max-width: 768px) {
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

@media only screen and (max-width: 768px) {
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

.python-snippets {
    overflow-y: scroll;
    height: 30vh;
}
</style>
