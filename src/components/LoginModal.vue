<script setup>
import Modal from "./modal/Modal.vue"
import ThirdPartyButton from "./login/ThirdPartyButton.vue"
import { ref, inject } from "vue";
import { newUserData } from "libs/firebaseSystem"
import { useI18n } from "vue-i18n"

const loggingIn = ref(false)
const errorMsg = ref("")
const router = inject("router")
const modalBase = ref(null)

const modalTitle = ref("กรุณาลงชื่อเข้าใช้เพื่อใช้ โค้ดดิง ปิ้งไก่")
const modalSub = ref("ลงชื่อเข้าใช้")
const { t } = useI18n()

const knownErrors = {
    "(auth/popup-closed-by-user)": "การลงชื่อเข้าใช้ถูกยกเลิก",
    "(auth/account-exists-with-different-credential)": "มีบัญชีนี้อยู่แล้ว กรุณาลงชื่อเข้าใช้ด้วยวิธีอื่น",
    "(auth/popup-blocked)": "การลงชื่อเข้าใช้ถูกยกเลิกโดยเบราว์เซอร์",
}

let loginPromise;
let loginKind = "login"

const openL = async (kindOf) => {
    modalBase.value.openModal()

    loginKind = kindOf

    if (kindOf == "reauth") {
        modalTitle.value = "กรุณาลงชื่อเข้าใช้ใหม่เพื่อไปต่อ"
        modalSub.value = "ลงชื่อเข้าใช้เพื่อไปต่อ"
    } else {
        modalTitle.value = "กรุณาลงชื่อเข้าใช้เพื่อใช้ โค้ดดิง ปิ้งไก่"
        modalSub.value = t('signin')
    }

    return new Promise((resolve) => {
        loginPromise = resolve
    })
}

const closeL = () => {
    modalBase.value.closeModal()
}

const socialLogin = async (t) => {
    const { getAuth, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } = await import('firebase/auth')

    let provider;
    let authProvider;

    if (t == "google") {
        provider = new GoogleAuthProvider()
        authProvider = GoogleAuthProvider
    } else if (t == "facebook") {
        provider = new FacebookAuthProvider()
        authProvider = FacebookAuthProvider
    }

    loggingIn.value = true
    errorMsg.value = ""

    const auth = getAuth()

    const result = await signInWithPopup(auth, provider).catch((error) => {
        loggingIn.value = false

        let errS = error.toString()
        let errRegex = errS.match(/\([^{}]*\)/)

        if (knownErrors[errRegex[0]]) {
            errorMsg.value = knownErrors[errRegex[0]]
        } else {
            errorMsg.value = error
        }
    })

    if (result['user']) {
        const credential = authProvider.credentialFromResult(result);

        loginPromise(credential)

        let isNewUser = await newUserData(result.user)
        closeL()

        loggingIn.value = false

        if (isNewUser) {
            router.push("/workspace/0")
        } else if (loginKind == "login") {
            router.push("/dashboard")
        }
    }

}

defineExpose({ openL, closeL })
</script>

<template>
    <Modal ref="modalBase" class="lm">
        <div class="login-header"></div>
        <div class="text-center">
            <h3>{{ modalSub }}</h3>
            <p class="text-muted">{{ modalTitle }}</p>
        </div>

        <div class="alert alert-danger" v-if="errorMsg != ''">
            {{ errorMsg }}
        </div>

        <div class="d-flex justify-content-center" v-if="loggingIn">
            <div class="chick-spinner"></div>
        </div>

        <div v-if="loggingIn == false">
            <h3 class="text-subtext">เข้าสู่ระบบด้วยโซเชียลมีเดีย</h3>
            <ThirdPartyButton text="ลงชื่อเข้าใช้ด้วย Google" @click="socialLogin('google')" image="/google.png" />
            <ThirdPartyButton text="ลงชื่อเข้าใช้ด้วย Facebook" @click="socialLogin('facebook')" image="/facebook.png" />
        </div>
        <!--
                    <hr />
                    <h3 class="text-subtext">Email Login</h3>
                    <input class="w-100 form-control" placeholder="Email Address" ref="emailAddress" />
                    <h3 class="text-subtext mt-2">Phone Login</h3>
                    <input class="w-100 form-control" placeholder="Phone number" />
                    <button class="btn btn-primary w-100 mt-2">Continue</button>
                    -->
    </Modal>
</template>

<style scoped>
.lm {
    z-index: 99999;
}
</style>