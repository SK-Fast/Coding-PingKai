<template>
    <div class="bg-primary d-md-none d-block text-white p-5 d-flex">
            <div class="avatar img-rounded col-3" style="height:80px;width:80px" :style="'background-image: url(\'' + (store.state.user.photoURL || '/placeholder-avatar.jpg') + '\')'">
                <div class="avatar-status" />

            </div>
        <div class="flex-grow-1 d-flex align-items-center">
            <h4 class="m-0 ms-4">{{ store.state.user.displayName }}</h4>
        </div>
    </div>

    <div class="container d-flex flex-column flex-md-row mt-md-5 mt-3">
        <div class="d-flex flex-column col-md-3 me-2">
            <h2 class="ms-0 mb-2">การตั้งค่า</h2>   
            <router-link class="btn settings-btn" active-class="btn-primary" to="/settings/general">
                ข้อมูลผู้ใช้
            </router-link>
            <router-link class="btn settings-btn" active-class="btn-primary" to="/settings/pref">
                การตั้งค่าแอป
            </router-link>
            <router-link class="btn settings-btn" active-class="btn-primary" to="/settings/dev">
               สำหรับผู้พัฒนา
            </router-link>
            
            <button class="btn btn-outline-danger settings-btn" @click="logoutClicked">ลงชื่อออก</button>
        
            <code class="text-muted user-selectable">Coding Pingkai {{ appVersion }}<br/>{{ pwaInstalled ? "PWA Installed" : "PWA not installed" }}<br/>{{ browserName }} {{ osName }}</code>
        </div>
        <div class="flex-grow-1 mt-md-0 mt-2">
            <router-view></router-view>
        </div>
    </div> 
</template>

<script setup>
import { onMounted, inject, ref } from 'vue';
import { currentPagePath } from 'libs/routeLib.js'
import { promptLogout } from 'libs/firebaseSystem.js'
const router = inject('router')
const store = inject('store')
const appVersion = ref("...")
const browserName = ref("Unknown browser")
const osName = ref("Unknown os")
const pwaInstalled = ref(false)

onMounted(async () => {
    appVersion.value = __APP_VERSION__
    pwaInstalled.value = window.matchMedia('(display-mode: standalone)').matches

    const { detect } = await import("detect-browser")

    const browser = detect()

    if (browser) {
        browserName.value = `${browser.name} ${browser.version}`
        osName.value = browser.os
    }

    if (currentPagePath() == "/settings") {
        router.push('/settings/general');
    }
})
const logoutClicked = () => {
    if (store.state.user.isAnonymous) {
        annoymousDeleteAccount()
    } else {
        promptLogout()
    }
}

const annoymousDeleteAccount = async () => {
    const { deleteUser } = await import('@firebase/auth');

    const res = await Swal.fire({
        title: 'ยืนยันการลงชื่อออก',
        html: `
        <p>บัญชีนี้เป็นบัญชีแบบไม่ใช้รหัสผ่าน คุณจะไม่สามารถลงชื่อใหม่ได้อีกแล้ว และข้อมูลของคุณจะหายไป คุณยืนยันหรือไม่</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
    })

    if (res.isConfirmed) {
        setTimeout(async () => {
            const { deleteUserData } = await import('libs/firebaseSystem.js')


            await deleteUserData(store.state.user)

            await deleteUser(store.state.user)

            document.body.classList.add("circle-close")

            setTimeout(async () => {
                window.location.href = '/?deleted=true'
            }, 1200)
        }, 200)
    }
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