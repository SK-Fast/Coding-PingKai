<template>
    <canvas class="confetti-view" ref="confettiView"></canvas>
    <div class="page-trans bg-light-400 loaded" :class="{ 'loading': pageLoading }">
        <div class="w-100 h-100 d-flex justify-content-center align-items-center flex-column pg-fadein">
            <div class="chick-spinner" style="height: 100px; width: 100px;"></div>
            <h4 class="mt-2">กำลังโหลด...</h4>
            <p class="text-muted">ใช่ครับ สิ่งที่คุณกำลังเห็นอยู่คือมันกำลังโหลด</p>
        </div>
    </div>
    <div class="editor-top flex-column flex-md-row" :class="{ 'loading': !codeDone }">
        <div class="d-flex align-items-center p-2 ms-3">
            <a @click="requestEnd" href="#"><vue-feather type="x" class="me-2" stroke="#606060" /></a>

            <img src="@/assets/logo/logobeta.png" class="me-2" height="35">

            <div class="flex-grow-1 d-md-none d-block"></div>
        </div>
        <div class="flex-grow-1 d-flex justify-content-center d-md-block d-none">
            <div class="text-center">
                <h5 class="m-0">สอนเดิน</h5>
                <p class="text-muted m-0">ไก่น้อย ผจญภัย</p>
            </div>
        </div>
        <div class="col-md-2 d-md-block d-none">
            <div class="rounded bg-light-400 p-1 editor-mode float-end me-2">
                <button class="btn btn-primary">Block</button>
                <!--
                <button class="btn btn-transparent">Python</button>
                -->
            </div>
        </div>
    </div>
    <div class="d-flex flex-md-row flex-column editor-middle">
        <div class="col-md-3 p-4 pt-0">
            <div class="runResult" ref="runResult"
                :style="`aspect-ratio: ${lessonKindData.ratio[0]} / ${lessonKindData.ratio[1]};`">
            </div>
            <div class="d-flex justify-content-center mt-2">
                <div class="btn-group tool-btns">
                    <div class="btn btn-success run-code-btn" @click="runCode" v-if="!codeRunning">
                        <vue-feather type="play" class="me-1" stroke="#FFF" />
                    </div>
                    <div class="btn btn-warning" @click="stopCode" v-if="codeRunning" :disabled="!codeDone">
                        <vue-feather type="refresh-cw" stroke="#FFF" />
                    </div>
                </div>
            </div>

            <div class="card shadow-sm mt-2" v-if="hasBlockLimit">
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
            <div class="flex-grow-1 editor-zone" :class="{'editor-running': codeRunning}" @mousemove="updateBlockLimit" @touchend="updateBlockLimit">

                <BlockEditor ref="bEditor" :options="blocklyConfig">
                </BlockEditor>
            </div>
            <div
                class="tutorial-view justify-content-center align-items-center p-3 bg-light-300 border-light-400 border-top">
                <div class="d-flex flex-column flex-md-row">
                    <div class="col-md-1 text-center">
                        <img src="/chick.png" class="chick-frame mb-2">
                        <h5>ไก่น้อย</h5>
                    </div>
                    <div class="ms-3 flex-grow-1">
                        <div class="card bg-light-200 p-2 h-100 w-100">
                            <div class="card-body d-flex flex-column">
                                <div class="flex-grow-1">
                                    <p>hi</p>
                                </div>

                                <div>
                                    <div>
                                        <div class="float-end">
                                            <button class="btn btn-secondary me-2">ขั้นตอนที่แล้ว</button>
                                            <button class="btn btn-primary">ไปต่อ</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BlockEditor from './editors/block.vue'
import { onMounted, ref, inject } from 'vue'
import { findLevel } from '@/lessons/lessons.js'
import { writeUserData } from '../../libs/firebaseSystem.js'

const toolbox = {
    kind: "flyoutToolbox",
    contents: []
}

const router = inject("router")
const store = inject("store")

let lessonData;
let lessonKind;
let blockset;

const bEditor = ref(null)
const pageLoading = ref(true)
const codeRunning = ref(false)
const runResult = ref(null)
const codeDone = ref(true)

const hasBlockLimit = ref(false)
const blockLeft = ref(4)
const confettiView = ref()

const delayInms = ref(500)

const lessonKindData = ref({
    ratio: [1, 1]
})

let levelID = ""

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

const updateBlockLimit = () => {
    blockLeft.value = blocklyWorkspace.remainingCapacity()
}

onMounted(async () => {
    levelID = router.currentRoute.value.params['id']

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

            if (lessonData.levelData["blockLimit"]) {
                blocklyConfig.value['maxBlocks'] = lessonData.levelData.blockLimit
                hasBlockLimit.value = true
            }

            blocklyWorkspace = bEditor.value.initBlockly()

            console.log(blocklyWorkspace)

            pageLoading.value = false

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

const runCode = async () => {
    let code = blockset.generate(blocklyWorkspace)

    codeRunning.value = true

    console.log(code)

    codeDone.value = false

    let levelPassed = await lessonKind.run(code, interpreterData, delay, blocklyWorkspace)

    console.log(levelPassed)

    await delay()

    codeDone.value = true

    if (levelPassed) {
        await writeUserData(store.state.user, {
            level_passed: parseInt(levelID) + 1
        })

        const confetti = await import('canvas-confetti');

        let confEmitter = confetti.create(confettiView.value, {
            resize: true,
            useWorker: true
        })

        confEmitter({
            particleCount: 250,
            spread: 360,
        })

    }
}


const stopCode = async () => {
    if (!codeDone.value) {
        return
    }
    codeRunning.value = false

    lessonKind.reset(blocklyWorkspace, interpreterData)
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

.tutorial-view {
    height: 200px;
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
    z-index: 9999;
}

.editor-zone.editor-running {
    opacity: 0.9;
    pointer-events: none;
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
