<script setup>
import { inject, onMounted, ref } from 'vue';

const store = inject("store")
const captureCard = ref()
const confettiView = ref()
const canShare = ref(false)

const cofiDefaults = { startVelocity: 30, spread: 360, ticks: 200, zIndex: 0, particleCount: 100 };

onMounted(async () => {
    if (navigator['share']) {
        canShare.value = true
    }

    setTimeout(async () => {
        const confetti = await import('canvas-confetti');

        setTimeout(() => {
            let confEmitter = confetti.create(confettiView.value, {
                resize: true,
                useWorker: true
            })

            confEmitter({
                ...cofiDefaults,
            })
        }, 250);
    }, 0);

    const ctx = captureCard.value.getContext('2d')

    const fontFace = new FontFace('bai', 'url(/fonts/bai.woff2)');
    const fontFaceThai = new FontFace('bai', 'url(/fonts/bai2.woff2)');

    await fontFace.load()
    await fontFaceThai.load()

    document.fonts.add(fontFace);
    document.fonts.add(fontFaceThai);

    const background = new Image();
    background.src = "/congrats_card.png";

    background.onload = async () => {
        ctx.drawImage(background, 0, 0);

        ctx.font = "bold 45px bai";
        ctx.fillStyle = "white"
        ctx.fillText(store.state.user.displayName, 24, 110);
    }
})

const saveImg = async () => {
    const image = captureCard.value.toDataURL("image/png")
    image.replace("image/png", "image/octet-stream")

    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    downloadLink.href = image;
    downloadLink.target = '_self';
    downloadLink.download = 'congrats.png';
    downloadLink.click();
}

function urltoFile(url, filename, mimeType) {
    return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
}

const shareImg = async () => {
    const image = captureCard.value.toDataURL("image/png")

    const finalFile = await urltoFile(image, "congrats.png", "image/png")

    navigator.share({
        files: [finalFile]
    })
}
</script>

<template>
    <div class="text-container d-flex flex-column justify-content-center align-items-center">

        <div class="col-md-4 p-2 mb-2">
            <div class="w-100">
                <canvas ref="captureCard" id="capture-card" style="font-family: 'Bai Jamjuree';" class="img-fluid"
                    width="881" height="300"></canvas>
            </div>
        </div>

        <h1 class="congrats-text">ยินดีด้วย!</h1>
        <p class="subtext">คุณผ่านด่านทั้งหมดแล้ว!</p>

        <div class="d-flex btn-options">
            <button v-if="canShare" class="btn btn-primary me-2" @click="shareImg">แชร์</button>
            <button class="btn btn-light-100 me-2" @click="saveImg">Save รูปภาพ</button>
            <router-link class="btn btn-secondary" to="/credits">ปิด</router-link>
        </div>
    </div>
    <canvas class="confetti-view" ref="confettiView"></canvas>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

.confetti-view {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
}

.text-container {
    width: 100vw;
    height: 100vh;
    background-color: var(--bs-light-400) !important;
}

#capture-card {
    animation: cardWobble 1s ease-out;
}

.congrats-text {
    animation: textPopUp 1s cubic-bezier(0.16, 1, 0.3, 1);
    animation-delay: 0.25s;
    opacity: 0;
    animation-fill-mode: forwards;
}

.subtext {
    animation: textPopUp 1s cubic-bezier(0.16, 1, 0.3, 1);
    animation-delay: 0.5s;
    opacity: 0;
    animation-fill-mode: forwards;
}

.btn-options {
    animation: textPopUp 1s cubic-bezier(0.16, 1, 0.3, 1);
    animation-delay: 0.75s;
    opacity: 0;
    animation-fill-mode: forwards;
}

@keyframes textPopUp {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    0.01% {
        opacity: 1;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}

@keyframes cardWobble {
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