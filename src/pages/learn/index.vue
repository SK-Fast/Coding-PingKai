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
            <div class="d-flex flex-md-row flex-column p-5 lvl-all" ref="lvlAll">
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
                    <div class="lvl-btn" @click="(event) => goToLesson(level.levelI, event)" :class="level.lvlState"
                        :style="`--pos: ${level.y}%;`" :title="level.title">
                        <img src="@/assets/level/lock.png" width="50" height="50" v-if="level.lvlState == 'locked'">
                        <img src="@/assets/level/play.png" width="50" height="50" v-if="level.lvlState == 'continue'">
                        <img src="@/assets/level/check.png" width="150" height="150" v-if="level.lvlState == 'done'">

                        <div class="start-tooltip bg-light-100 p-3" v-if="level.lvlState == 'continue'">
                            เริ่ม
                            <img src="@/assets/start_arrow.svg" class="arrow-tooltip" height="20">
                        </div>

                        <!--
                    <div class="level-tooltip bg-light-100 p-3" v-if="level.lvlState == 'continue'">
                        <img src="@/assets/arrow_up.svg" class="arrow-tooltip" height="20">
                        <h3>{{ level.title }}</h3>
                        <button class="btn btn-primary w-100">เริ่ม</button>
                    </div>
                    -->
                    </div>

                    <div v-if="level.y < -95" class="level-decoration"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";

const levels = ref([])
const store = inject("store")
const router = inject("router")
const lvlScroll = ref(null)
const lvlAll = ref(null)
const dataLoading = ref(true)

const lvlLoading = ref(false)
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
        }
    }, 100);
})

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
}

.level-decoration {
    background-image: url(/decorations/grass.png);
    background-position: center;
    background-size: cover;
    height: 100px;
    width: 100px;

    position: absolute;
    bottom: 0;
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

.level-tooltip {
    filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));
    border: 3px solid #DFDFDF;
    position: absolute;
    top: calc(100% + 55px);
    min-width: 250px;
    border-radius: 10px;

    left: 25%;
    z-index: 55;
}

.level-tooltip .arrow-tooltip {
    position: absolute;
    bottom: calc(100% + 10px);
}

.start-tooltip .arrow-tooltip {
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
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

@media only screen and (max-width: 600px) {
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
}
</style>
