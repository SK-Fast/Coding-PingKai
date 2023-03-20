<script setup>
import { inject, onMounted, ref } from 'vue';
import { getUserData } from 'libs/firebaseSystem.js'
import { getSectionFromID } from '@/lessons/lessons.js'
import achievementsData from '../../achievements/achievements.js'

const store = inject('store')
const userData = ref({})
const sectionData = ref({})
const updateAvailable = ref(false)
const updatingApp = ref(false)
const updateProgress = ref(0)
const oldVersion = ref("")
const newVersion = ref("")

const achievementList = ref([])

onMounted(async () => {
    userData.value = await getUserData(store)
    sectionData.value = getSectionFromID(userData.value.level_passed)

    let achievements = []

    if (!userData.value.achievements) {
        achievements = []
    } else {
        achievements = userData.value.achievements
    }

    for (const achievementID of achievements) {
        achievementList.value.push({
            id: achievementID,
            ...achievementsData[achievementID]
        })
    }

    checkForUpdates()
})

const appUpdate = async () => {
    updateAvailable.value = false
    updatingApp.value = true

    console.log("Updating")

    if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()

        let prog = 0
        for (let registration of registrations) {
            registration.update()
            console.log("Updating Register ", prog)
            updateProgress.value = (prog / registrations.length) * 100
            prog++
        }

        const names = await caches.keys()

        prog = 0

        for (let name of names) {
            caches.delete(name)
            console.log("Clearing Cache ", name)
            updateProgress.value = (prog / names.length) * 100
        }
    }

    location.href = location.href
    //window.location.reload(true)
}

const checkForUpdates = async () => {
    const versionRes = await fetch("/version.json", { cache: "no-store" })
    const versionData = await versionRes.json()

    if (versionData.version != __APP_VERSION__) {
        oldVersion.value = __APP_VERSION__
        newVersion.value = versionData.version
        updateAvailable.value = true
    }
}

</script>

<template>
    <div class="d-flex align-items-start">
        <div class="col-2 d-md-block d-none side-container">
            <img src="/side-imgs/sun.png" class="img-fluid side-img">
        </div>

        <div class="flex-grow mt-3">
            <div class="d-flex flex-column align-items-center p-2">
                <div class="d-flex flex-column align-items-center">
                    <div class="avatar col-5 img-rounded"
                        :style="`background-image: url(${(store.state.user.photoURL || '/placeholder-avatar.jpg')})`"></div>
                    <div class="d-flex flex-column align-items-center ms-2 ms-md-0">
                        <h2 class="mt-3">{{ store.state.user.displayName }}</h2>
                        <p class="m-0 mt-1 text-monospace">
                            <span class="text-primary me-2">STREAK {{ userData['streak'] || '0' }}</span>
                            <span class="text-warning">EXP {{ userData['exp'] || '0' }}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="d-flex flex-column align-items-center mt-2 main-content">
                <div class="btn col-md-8 btn-primary text-center mb-2" v-if="updateAvailable" @click="appUpdate">
                    <p class="m-0"><vue-feather type="refresh-cw" animation="spin" animation-speed="slow"
                            size="15"></vue-feather> มีอัปเดตใหม่! แตะเพื่อดาวน์โหลด ({{ oldVersion }} <vue-feather
                            type="arrow-right" size="10"></vue-feather> {{ newVersion }})</p>
                </div>

                <div class="bg-warning mt-2 col-md-8 mb-2 p-2 text-center rounded" v-if="updatingApp">
                    <vue-feather type="refresh-cw" animation="spin" animation-speed="fast"
                            size="15"></vue-feather>
                    กำลังอัปเดต...
                </div>

                <div class="card col-md-8 w-md-100" v-if="userData != {} && sectionData != {} && sectionData !== undefined">
                    <div class="card-body">
                        <div class="d-flex">
                            <div class="flex-grow-1 bg">
                                <p class="text-muted">ต่อจากครั้งที่แล้ว</p>
                                <h3>{{ sectionData['title'] || 'กำลังโหลด...' }}</h3>
                                <p class="m-0">{{ sectionData['desc'] || '' }}</p>
                            </div>

                            <div class="col-md-3 d-flex align-items-end justify-content-end">
                                <router-link to="/learn" class="btn btn-primary">ไปต่อ</router-link>
                            </div>
                        </div>
                        <div class="progress mt-2">
                            <div class="progress-bar level-passed-bar rounded" role="progressbar"
                                :style="`--progress-gotten: ${((userData.level_passed - sectionData.startIndex) * 100) / (sectionData.levelCount - sectionData.startIndex)}%`">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card col-md-8 mt-2">
                    <div class="card-body">
                        <div class="d-flex">
                            <p class="text-muted">ด่านต่างๆ</p>
                            <div class="flex-grow-1"></div>
                        </div>

                        <router-link to="/learn">
                            <img src="@/assets/levels_dashboard.png" class="img-fluid">
                        </router-link>
                    </div>
                </div>

                <div class="card col-md-8 mt-2" v-if="achievementList && achievementList.length > 0">
                    <div class="card-body">
                        <div class="d-flex">
                            <p class="text-muted">รางวัลต่างๆ</p>
                            <div class="flex-grow-1"></div>
                            <!--<router-link to="/Moreinfo2" class="float-end text-primary">ดูทั้งหมด</router-link>-->
                        </div>

                        <div class="d-flex">
                            <div class="card col-md-3 btn-transparent" v-for="achievement in achievementList">
                                <img :src="`/achievements/${achievement.id}.png`" class="img-fluid badge-img">

                                <div class="p-2 mt-1 text-center">
                                    <h5>{{ achievement.title }}</h5>
                                    <p class="text-muted m-0">{{ achievement.desc }}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <div class="col-2 d-md-block d-none side-container">
            <img src="/side-imgs/flowers.png" class="img-fluid side-img" style="position: relative;top: 40px;">
        </div>
    </div>
</template>

<style scoped>
.avatar {
    width: 150px;
    height: 150px;
}

.level-card-img {
    height: 150px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 10px;
}

.badge-img {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.container>div:nth-child(1) {
    animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1);
    animation-fill-mode: forwards;
}

.main-content>div:nth-child(1) {
    animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1);
    animation-delay: 0.1s;
    opacity: 0;
    animation-fill-mode: forwards;
}

.main-content>div:nth-child(2) {
    animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1);
    animation-delay: 0.2s;
    opacity: 0;
    animation-fill-mode: forwards;
}

.main-content>div:nth-child(3) {
    animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1);
    animation-delay: 0.3s;
    opacity: 0;
    animation-fill-mode: forwards;
}

.level-passed-bar {
    animation: progressReveal 1s cubic-bezier(0.16, 1, 0.3, 1);
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
}

.side-container {
    min-height: 100vh;
}

.side-img {
    position: relative;
}

@keyframes progressReveal {
    0% {
        width: 0%;
    }

    100% {
        width: var(--progress-gotten);
    }
}

@keyframes slideUp {
    0% {
        transform: translateY(50px) scale(0.9);
        opacity: 0;
    }

    100% {
        transform: translateY(0px) scale(1);
        opacity: 1;
    }
}
</style>