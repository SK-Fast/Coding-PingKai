<template>
    <div class="mt-5">
        <div class="container text-md-start text-center">
            <h3>เลือกด่าน</h3>
        </div>
        
        <div class="lvl-scroll" ref="lvlScroll">
        <div class="d-flex flex-md-row flex-column p-5 lvl-all">
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
            <div class="lvl-container" v-for="level in levels">
                <div class="lvl-btn locked" :style="'--pos: ' + level.y + '%'">
                    <img src="@/assets/level/lock.png" width="50" height="50">
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const levels = ref([])
const lvlScroll = ref(null)

onMounted(async() => {
    const { sections } = await import("@/lessons/lessons.js")

    let i = 0

    for (const section of sections) {
        for (const level of section.levels) {
            levels.value.push({
                y: Math.cos(i * 100) * 100
            })

            i += 1
        }
    }
})

</script>

<style scoped>
.lvl-scroll {
    overflow-x: scroll;
}

.lvl-all {
    height: calc(100vh - 262px);
}

.lvl-container {
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 1rem;
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

@media only screen and (max-width: 1000px) {
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

    .lvl-all {
        height: auto;
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
