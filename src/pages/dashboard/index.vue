<script setup>
import { inject, onMounted, ref } from 'vue';
import { getUserData } from 'libs/firebaseSystem.js'
import { getSectionFromID } from '@/lessons/lessons.js'

const store = inject('store')
const userData = ref({})
const sectionData = ref({})

onMounted(async() => {
    userData.value = await getUserData(store)
    sectionData.value = getSectionFromID(userData.value.level_passed)
})

</script>

<template>
    <div class="container">
        <div class="d-flex flex-column align-items-center p-2">
            <div class="d-flex flex-column align-items-center">
                <div class="avatar col-5 img-rounded" :style="`background-image: url(${(store.state.user.photoURL || '/placeholder-avatar.jpg')})`"></div>
                <div class="d-flex flex-column align-items-center ms-2 ms-md-0">
                    <h2 class="mt-3">{{ store.state.user.displayName }}</h2>
                    <p class="m-0 mt-1 text-monospace">
                        <span class="text-primary me-2">STREAK {{ userData['streak'] || '0' }}</span>
                        <span class="text-warning">EXP {{ userData['exp'] || '0' }}</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="d-flex flex-column align-items-center mt-2">
            <div class="card col-md-6" v-if="userData != {} && sectionData != {} && sectionData !== undefined">
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
                      <div class="progress-bar" role="progressbar" :style="`width: ${((userData.level_passed - sectionData.startIndex) * 100) / (sectionData.levelCount - sectionData.startIndex)}%`"></div>
                    </div>
                </div>
            </div>

            <div class="card col-md-6 mt-2">
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

            <!--
            <div class="card col-md-6 mt-2">
                <div class="card-body">
                    <div class="d-flex">
                        <p class="text-muted">รางวัลต่างๆ</p>
                        <div class="flex-grow-1"></div>
                        <router-link to="/Moreinfo2" class="float-end text-primary">ดูทั้งหมด</router-link>
                    </div>

                    <div class="d-flex">
                        <div class="card col-3 btn-transparent">
                            <img src="@/assets/badges/the_beginnings.png" class="img-fluid badge-img">
                            
                            <div class="p-2 mt-1 text-center">
                                <h5>จุดเริ่มต้น</h5>
                                <p class="text-muted m-0">สำหรับคนที่ผ่านด้านแรก</p> 
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            -->

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
</style>