<script setup>
import ModalBack from "./modal/ModalBack.vue"
import { ref } from "vue";

const firstTime = ref(true)
const isopen = ref(false)
const acData = ref({})
const achID = ref('')
const modalVisible = ref(false)

const closeM = () => {
    isopen.value = false
}

const openM = (acID, data) => {
    acData.value = data
    achID.value = acID
    isopen.value = true
    firstTime.value = false
    modalVisible.value = false

    setTimeout(() => {
        modalVisible.value = true
    }, 50);

    setTimeout(closeM, 5000);
}

defineExpose({ openM, closeM })
</script>

<template>
    <ModalBack @click="closeM" ref="modalBack" class="modalback d-flex flex-column"
        :class='[{ "modal-opened": isopen }, { "modal-closed": !isopen }, { "d-none": firstTime }]'>
        <div class="p-3" v-if="modalVisible">
            <div class="bg-light-100 timeend-p rounded"></div>
        </div>
        <div v-if="modalVisible" class="d-flex justify-content-center align-items-center flex-grow-1">
            <div class="text-center a-container">
                <h1 class="mb-5 text-white a-header">รางวัลใหม่!</h1>
                <img :src="`/achievements/${ achID || '' }.png`" class="img-fluid col-md-6 a-badge">
                <h1 class="m-5 text-white a-title">{{ acData.title || "title" }}</h1>
                <h4 class="m-5 text-light-500 a-desc">{{ acData.desc || "desc" }}</h4>
            </div>
        </div>
    </ModalBack>
</template>

<style scoped>
.a-badge {
    animation-name: badgeWobble;
    animation-duration: 1s;
}

.a-header {
    animation: headerPops 0.5s cubic-bezier(.36, 2, .65, .91);
    animation-delay: 0.3s;
    opacity: 0;
    animation-fill-mode: forwards;
}

.a-title,
.a-desc {
    animation: titlePops 0.5s cubic-bezier(.36, 2, .65, .91);
    animation-delay: 0.3s;
    opacity: 0;
    animation-fill-mode: forwards;
}

.a-container {
    animation: containerScaleUp 7s linear;
}

.timeend-p {
    animation: timeendScale 4s linear;
    animation-delay: 1s;
    width: 0%;
    height: 5px;
    animation-fill-mode: forwards;
}

@keyframes timeendScale {
    0% {
        width: 0%;
        opacity: 0;
    }

    100% {
        width: 100%;
        opacity: 1;
    }
}

@keyframes containerScaleUp {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.15);
    }
}

@keyframes headerPops {
    0% {
        opacity: 0;
    }

    1% {
        opacity: 1;
        transform: translateY(25px);
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}

@keyframes titlePops {
    0% {
        opacity: 0;
    }

    1% {
        opacity: 1;
        transform: translateY(-25px);
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}

.modalback {
    cursor: pointer;
}

@keyframes badgeWobble {
    0% {
        transform: scale3d(1, 1, 1) scale(0);
    }

    30% {
        transform: scale3d(1.25, 0.75, 1);
    }

    40% {
        transform: scale3d(0.75, 1.25, 1);
    }

    50% {
        transform: scale3d(1.15, 0.85, 1);
    }

    65% {
        transform: scale3d(.95, 1.05, 1);
    }

    75% {
        transform: scale3d(1.05, .95, 1);
    }

    100% {
        transform: scale3d(1, 1, 1) scale(1);
    }
}
</style>