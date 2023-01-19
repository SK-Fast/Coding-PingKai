<template>
    <div class="container d-flex flex-column flex-md-row mt-5">
        <div class="d-flex flex-column col-md-3 me-2">
            <h2 class="ms-0 mb-2">การตั้งค่า</h2>   
            <router-link class="btn settings-btn" active-class="btn-primary" to="/settings/general">
                ข้อมูลผู้ใช้
            </router-link>
            <!--
            <router-link class="btn settings-btn" active-class="btn-primary" to="/settings/password">
               รหัสผ่าน
            </router-link>
            -->
            <router-link class="btn settings-btn" active-class="btn-primary" to="/settings/dev">
               สำหรับผู้พัฒนา
            </router-link>

            <button class="btn btn-outline-danger settings-btn" @click="logoutClicked">ลงชื่อออก</button>
        </div>
        <div class="flex-grow-1 mt-md-0 mt-2">
            <router-view></router-view>
        </div>
    </div> 
</template>

<script setup>
import { onMounted, inject } from 'vue';
import { currentPagePath } from 'libs/routeLib.js'
import { promptLogout } from 'libs/firebaseSystem.js'

const router = inject('router')

onMounted(() => {
    if (currentPagePath() == "/settings") {
        router.push('/settings/general');
    }
})

const logoutClicked = () => {
    promptLogout()
}

</script>

<style scoped>
.settings-btn {
    margin-bottom: 5px;
    text-align: left;
}

.settings-btn:not(.btn-primary) {
    background: rgba(0, 0, 0, 0.1);
}
</style>