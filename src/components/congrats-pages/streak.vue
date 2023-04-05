<script setup>
import { ref, toRefs, onMounted } from 'vue'

const props = defineProps({
    pageData: {
        type: Object
    }
})

const { pageData } = toRefs(props)
const canvasImg = ref()
const scrollWidth = ref()

onMounted(async () => {
    const { Rive } = await import("@rive-app/canvas");

    setTimeout(() => {
        new Rive({
            src: "/rive/streak.riv",
            canvas: canvasImg.value,
            autoplay: true,
        });
    }, 250);

    scrollWidth.value = (20 * pageData.value.oldStreak.toString().length);


})

</script>

<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <canvas class="col-5 img-fluid mb-3" ref="canvasImg" width="350" height="350"/>

        <h3 class="text-primary d-flex"><span><div class="num-scroll" :style="`width: ${scrollWidth}px`">
            <div class="scroll-container">
            <div class="one">
                {{ pageData.oldStreak }}
            </div>
            <div class="two">
                {{ pageData.streak }}
            </div>    
            </div>
        </div></span> วันรวด!</h3>
        <p>การเรียนทุกวันช่วยให้คุณพัตณาได้เร็วขึ้นน่ะ!</p>
    </div>
</template>

<style scoped>
.num-scroll {
    width: 20px;
    height: 33px;
    overflow: hidden;
}

.scroll-container {
    transform: translateY(0%);

    animation: scrollAnim 500ms cubic-bezier(0.16, 1, 0.3, 1);
    animation-delay: 500ms;
    animation-fill-mode: forwards;
}

@keyframes scrollAnim {
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-50%);
    }
}
</style>