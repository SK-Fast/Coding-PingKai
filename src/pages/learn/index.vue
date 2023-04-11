<template>
    <div class="page-trans bg-light-400" :class="{ 'loading': lvlLoading }" :style="`--x: ${lvlLoadX}%;--y: ${lvlLoadY}%`">
    </div>
    <div class="mt-5">
        <div class="container text-md-start text-center">
            <h3>เลือกด่าน</h3>
        </div>

        <div class="d-flex justify-content-center" v-if="dataLoading">
            <div class="chick-spinner"></div>
        </div>

        <div class="lvl-scroll" ref="lvlScroll">
            <div class="d-flex p-5 lvl-all" ref="lvlAll">
                <!--
            <div class="lvl-container">
                <div class="lvl-btn done">
                    <img src="@/assets/level/check.png" width="50" height="50">
                </div>
            </div>
            <div class="lvl-container">
                <div class="lvl-btn continue">
                    <img src="@/assets/level/play.png" width="50" height="50">
                </div>
            </div>
            -->
                <div class="lvl-container" v-for="level in levels" :style="`--animDelay: ${level.animDelay}ms;`">
                    <div class="lvl-btn" @dblclick="(event) => goToLesson(previewID, event)" @click="(event) => openPreview(level.levelI, event)" :class="level.lvlState"
                        :style="`--pos: ${level.y}%;`" :title="level.title">
                        <img src="@/assets/level/lock.png" width="50" height="50" v-if="level.lvlState == 'locked'">
                        <img src="@/assets/level/play.png" width="50" height="50" v-if="level.lvlState == 'continue'">
                        <img src="@/assets/level/check.png" width="150" height="150" v-if="level.lvlState == 'done'">

                        <div class="start-tooltip bg-light-100 p-3" v-if="level.lvlState == 'continue'">
                            เริ่ม
                            <img src="@/assets/start_arrow.svg" class="arrow-tooltip" height="20">
                        </div>
                    </div>

                    <div v-if="level.y < -95" class="level-decoration"></div>
                    <div v-if="level.y > 85" class="level-decoration  level-decoration-top"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="level-info bg-light-100 d-flex flex-column p-3"
        :style="{ 'visibility': firstTimeHide ? 'hidden' : 'visible' }" :class="{ 'onpreview': previewingLesson }">
        <div>
            <div class="container-fluid">
                <div class="preview-canvas mt-3" ref="previewCanvas"
                    :style="`aspect-ratio: ${previewDataRef.ratio[0]} / ${previewDataRef.ratio[1]};`">
                </div>
            </div>

            <h3>{{ previewLessonData['levelData'] ? previewLessonData.levelData.title : "" }}</h3>
            <ul>
                <li v-for="pG in previewGoals">{{ pG }}</li>
            </ul>
        </div>
        <div class="flex-grow-1"></div>
        <p class="text-sm text-danger text-center" v-if="previewIsLocked">คุณต้องปลดล็อกด่านที่แล้วก่อน</p>

        <button class="btn btn-primary btn-lg w-100" v-if="!previewIsLocked"
            @click="(event) => goToLesson(previewID, event)">เริ่ม</button>
        <button class="btn btn-primary disabled btn-lg w-100" v-else><vue-feather type="lock" color="#fff"></vue-feather>
            ด่านถูกล็อกไว้</button>
        <button class="btn btn-secondary mt-2 btn w-100" @click="closePreview">ปิด</button>
    </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";

const levels = ref([])
const store = inject("store")
const router = inject("router")
const lvlScroll = ref(null)
const lvlAll = ref(null)
const previewDataRef = ref({
    ratio: [1, 1]
})
const dataLoading = ref(true)

const lvlLoading = ref(false)
const previewingLesson = ref(false)
const previewID = ref(0)
const previewIsLocked = ref(false)
const firstTimeHide = ref(true)
const previewCanvas = ref()
const previewLessonData = ref({})
const previewGoals = ref([])
const lvlLoadX = ref(0)
const lvlLoadY = ref(0)
let userData;

onMounted(async () => {
    const { sections } = await import("@/lessons/lessons.js")
    const { getUserData } = await import("libs/firebaseSystem.js")

    userData = await getUserData(store)

    let i = 0
    let delayT = 0

    for (const section of sections) {
        for (const level of section.levels) {
            let lvlState = "locked"

            if (userData.level_passed == i) {
                lvlState = "continue"
            } else if (userData.level_passed > i) {
                lvlState = "done"
            }

            if (i > 15) {
                delayT = 0
            }

            levels.value.push({
                y: Math.sin(i * 100) * 100,
                lvlState: lvlState,
                title: level.title,
                animDelay: delayT,
                levelI: i
            })

            i += 1
            delayT += 50
        }
    }

    dataLoading.value = false

    setTimeout(() => {
        if (window.outerWidth < 500) {
            console.log(userData.level_passed * 150)
            window.scroll(0, userData.level_passed * 150)
        } else {
            window.scroll(userData.level_passed * 150, 0)
        }
    }, 100);

    setTimeout(() => {
        firstTimeHide.value = false
    }, 500);
})

let oldApp;

const closePreview = async () => {
    previewingLesson.value = false

    previewID.value = -1

    if (oldApp) {
        oldApp.view.remove()
        oldApp.destroy(true)
        oldApp = null
    }

}

const openPreview = async (i) => {
    if (previewID.value == i) {
        return
    }

    previewID.value = i

    previewingLesson.value = true

    store.state.fireLoading()

    const { findLevel, kindOBlockName } = await import("@/lessons/lessons.js")
    const lessonBasic = findLevel(i)
    const lessonData = await lessonBasic.levelData()
    const lessonKind = await lessonData.levelKind()
    const blockset = await lessonKind.blockset()

    if (oldApp) {
        oldApp.view.remove()
        oldApp.destroy(true)
    }

    previewIsLocked.value = i > userData.level_passed && import.meta.env.MODE !== 'development'

    previewLessonData.value = lessonData
    let canvasprev = await lessonKind.init(previewCanvas.value, lessonData.levelData)

    oldApp = canvasprev.pixiApp

    console.log(canvasprev)

    previewGoals.value = []

    let goals = []

    for (const b of lessonData.blocks) {
        const bT = blockset.blocklyJSON.find((e) => b.type == e.type)

        let procBT = kindOBlockName[bT.kindoblock]

        if (!goals.find((e) => e == procBT)) {
            goals.push(procBT)
        }
    }
    
    previewGoals.value = goals

    previewDataRef.value.ratio = lessonData.levelData.ratio || lessonKind.kindData.ratio

    store.state.fireLoadStop()

}

const goToLesson = (i, e) => {
    console.log(i, userData.level_passed)
    if (i > userData.level_passed && import.meta.env.MODE !== 'development') {

        Swal.fire({
            title: 'ด่านถูกล็อกไว้',
            text: "คุณต้องผ่านด่านที่แล้วก่อน",
            icon: 'error',
            confirmButtonText: 'ปิด',
        })


        return
    }

    store.state.fireLoadStop()

    lvlLoading.value = true

    lvlLoadX.value = (e.clientX / window.innerWidth) * 100
    lvlLoadY.value = (e.clientY / window.innerHeight) * 100

    setTimeout(() => {
        router.push(`/workspace/${i}`)
    }, 500)
}
</script>

<style scoped>
.lvl-scroll {
    overflow: visible;
}

.lvl-all {
    height: calc(100vh - 262px);
    overflow-y: visible;
    overflow-x: scroll;
    flex-direction: row;
}

@media only screen and (min-width: 400px) {
    .lvl-all {
        height: calc(100vh - 60px);
    }
}

.level-decoration {
    background-image: url(/decorations/chick.png);
    background-position: center;
    background-size: cover;
    height: 200px;
    width: 200px;

    position: absolute;
    bottom: 0;
}

.level-decoration-top {
    top: 0;
}

.start-tooltip {
    filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));
    border: 3px solid #DFDFDF;
    position: absolute;
    bottom: calc(100% + 45px);
    border-radius: 10px;

    animation: tooltipFloatin 5s linear;
    animation-iteration-count: infinite;
    z-index: 55;

}

.level-info {
    filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));
    border: 3px solid #DFDFDF;
    position: fixed;
    top: 50px;
    right: 0;
    border-radius: 10px;

    width: 400px;
    height: calc(100vh - 50px);
    border-radius: 20px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;

    animation: levelInfoSlideEnd 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    animation-fill-mode: forwards;
}

.level-info.onpreview {
    animation: levelInfoSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes levelInfoSlide {
    from {
        transform: translateX(100%);
    }
}

@keyframes levelInfoSlideEnd {
    to {
        transform: translateX(100%);
    }
}

.start-tooltip .arrow-tooltip {
    position: absolute;
    top: calc(100% + 10px);
    right: 25%;
}

@keyframes tooltipFloatin {
    0% {
        transform: translateY(0px);
    }

    25% {
        transform: translateY(10px);
    }

    50% {
        transform: translateY(0px);
    }

    75% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0px);
    }
}

.lvl-container {
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 1rem;
    transform: translateY(150%);

    animation: 0.5s lvlBtnPop cubic-bezier(0.34, 1.56, 0.64, 1);
    animation-delay: var(--animDelay);
    animation-fill-mode: forwards;
}

@keyframes lvlBtnPop {
    0% {
        transform: translateY(100%);
    }

    100% {
        transform: translateY(0%);
    }
}

.lvl-btn {
    width: 150px;
    height: 150px;
    border-radius: 100px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    transform: translateY(var(--pos));
}

.preview-canvas {
    border-radius: 10px;
    background-color: white;
    margin-bottom: 10px;
}

@media only screen and (max-width: 500px) {
    .lvl-btn {
        transform: translateX(calc(var(--pos) / 2));
    }

    .lvl-container {
        width: 100%;
        height: 150px;
        margin-right: 0;
        margin-bottom: 1rem;
        align-items: center;
        justify-content: center;
    }

    .lvl-scroll {
        overflow: visible;
    }

    .lvl-all {
        height: auto;
        overflow-y: visible;
        overflow-x: visible;
        flex-direction: column;
    }

    .level-decoration {
        right: 0;
        height: 100px;
        width: 100px;
    }

    .level-decoration-top {
        left: 0;
    }

    .level-info {
        position: fixed;
        top: 0;
        bottom: 60px;
        left: 0;
        width: 100%;

        border-radius: 0;
    }

    @keyframes levelInfoSlide {
        from {
            transform: translateY(100%);
        }
    }


    @keyframes levelInfoSlideEnd {
        to {
            transform: translateY(100%);
        }
    }
}

.lvl-btn.locked {
    background: #F3F3F3;
    border: 10px solid #DFDFDF;
    box-shadow: 0px 8px 0px #C4C4C4;
}

.lvl-btn.continue {
    background: #FF8833;
    border: 10px solid #FF7733;
    box-shadow: 0px 8px 0px #E66B2E;
}

.lvl-btn.done {
    background: #FFB524;
    border: 10px solid #FF9224;
    box-shadow: 0px 8px 0px #E68320;
}

.lvl-btn:active {
    box-shadow: none;
    position: relative;
    bottom: -8px;
}</style>
