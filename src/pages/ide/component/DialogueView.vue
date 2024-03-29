<template>
    <div
        class="tutorial-view justify-content-center align-items-center p-md-3 p-0 bg-light-300 border-light-400 border-top">
        <div class="d-flex flex-column flex-md-row">
            <div class="col-md-1 text-center d-md-block d-none">
                <img src="/chick.png" class="chick-frame mb-2">
            </div>
            <div class="ms-md-3 ms-0 flex-grow-1">
                <div class="card bg-light-200 p-md-0 p-2 h-100 w-100" @click="continueSection">
                    <div class="card-body d-flex flex-column text-box-body">
                        <div class="text-scrollable d-flex">
                            <div class="flex-grow-1 d-flex flex-column">
                                <div class="flex-grow-1">
                                    <p ref="textBox">{{ textContent }}</p>
                                </div>

                                <div v-if="buttonContinue">
                                    <div class="float-end">
                                        <button class="btn btn-secondary me-2" v-if="previousBtnEnabled"
                                            @click="previousSection">ขั้นตอนที่แล้ว</button>
                                        <button class="btn btn-primary" v-if="nextBtnEnabled"
                                            @click="continueSection">ไปต่อ</button>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex justify-content-end tutorial-vid" v-if="vidURL !== ''">
                                <video width="320" height="150" muted autoplay loop :src="vidURL"></video>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const textContent = ref(null)
let sectionIndex = 0
let dialogue = []
const buttonContinue = ref(false)
const vidURL = ref("")
const nextBtnEnabled = ref(true)
const previousBtnEnabled = ref(true)
let blockCount = 0
let updateIntervals = []
let typing = false
let textTyping = false

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}

const emit = defineEmits(['onDialogueData'])

const typeText = async (txt) => {
    if (textTyping) {
        return
    }
    textTyping = true

    for (var i = 0; i < txt.length; i++) {
        textContent.value += txt.charAt(i)
        await delay(25)
    }
    textTyping = false
}

const waitForBlockCount = (bC) => {
    return new Promise((resolve) => {
        let iv = setInterval(() => {
            console.log(bC, blockCount)
            if (blockCount >= (bC + 1)) {
                console.log("resolve")
                resolve()
                clearInterval(iv)
            }
        }, 100)

        updateIntervals.push(iv)
    })
}

const runSection = async (section) => {
    buttonContinue.value = false
    typing = true

    for (const data of section) {
        let doRun = true

        if (data['mobile']) {
            if (window.outerWidth > 600) {
                doRun = false
            }
        }

        if (doRun) {
            if (data.type == "txt") {
                textContent.value = ""
            }

            if (data.type == "vid") {
                vidURL.value = data.src
            }

            if (data.type == "vid-close") {
                vidURL.value = ""
            }

            if (data.type == "txt" || data.type == "txt-continue") {
                await typeText(data.text)
            }

            emit("onDialogueData", data)

            if (data.type == "delay") {
                await delay(data.ms)
            }

            if (data.type == "focus_element") {
                document.getElementById(data.id).classList.add("element-focus")

                setTimeout(() => {
                    document.getElementById(data.id).classList.remove("element-focus")
                }, 1000);
            }

            if (data.type == "focus_block" || data.type == "guide_block_drag") {
                let blockElementAll = document.querySelectorAll(`.blocklyFlyout .blocklyDraggable`)
                let blockElement = blockElementAll[data.blockIndex]

                if (blockElement) {
                    blockElement.classList.add("worked")

                    setTimeout(() => {
                        blockElement.classList.remove("worked")
                    }, 1000);
                }
            }

            /*
            if (data.type == "guide_block_drag") {
                let blockElementAll = document.querySelectorAll(`.blocklyFlyout .blocklyDraggable`)
                let blockElement = blockElementAll[data.blockIndex]

                if (blockElement) {
                    const img = document.createElement("img")
                    img.src = "/blockly_editor/dragdown.png"

                    const rect = blockElement.getBoundingClientRect();

                    img.style.top = (rect.top - 10) + 'px'
                    img.style.left = rect.left + 'px'

                    img.classList.add("dragdown-guide")
                    img.width = 200

                    document.body.append(img)

                    setTimeout(() => {
                        img.remove()
                    }, 10000);
                }
            }
            */

            if (data.type == "wait_block_paste") {
                await waitForBlockCount(data.count)

                if (data['autoJump']) {
                    typing = false
                    continueSection()
                    return
                }
            }
        }
    }

    if (sectionIndex <= 0) {
        previousBtnEnabled.value = false
    } else {
        previousBtnEnabled.value = true
    }

    if (sectionIndex >= dialogue.length - 1) {
        nextBtnEnabled.value = false
    } else {
        nextBtnEnabled.value = true
    }

    buttonContinue.value = true

    typing = false
}

function updateDialogue() {
    runSection(dialogue[sectionIndex])
}

const continueSection = () => {
    if (typing) {
        return
    }
    sectionIndex++
    updateDialogue()
}

const previousSection = () => {
    sectionIndex--
    updateDialogue()
}

const runDialogue = (d) => {
    dialogue = d
    sectionIndex = 0
    updateDialogue()
}

const resetText = () => {
    textContent.value = ""
}

onUnmounted(() => {
    for (const i of updateIntervals) {
        clearInterval(i)
    }
})

const blockCountUpdate = (bC) => {
    blockCount = bC
}

defineExpose({ runDialogue, typeText, resetText, blockCountUpdate })
</script>

<style scoped>
.tutorial-view {
    height: 220px;
}

.text-box-body {
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.text-scrollable {
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;
}

.text-scrollable p {
    width: 100%;
    display: block;
    word-wrap: break-word;
    margin: 0;
}

.textSpan {
    animation: textSpanAnim 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
}

@keyframes textSpanAnim {
    0% {
        bottom: -10px;
        opacity: 0;
    }

    100% {
        bottom: -0px;
        opacity: 1;
    }
}

.nextBtn img {
    image-rendering: optimizeSpeed;
}

.tutorial-vid {
    border-radius: 10px;
    background-color: white;
}

@media only screen and (max-width: 768px) {
    .tutorial-vid {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    }
}
</style>