<script setup>
    import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
    import Modal from "./modal/Modal.vue"
    import ThirdPartyButton from "./login/ThirdPartyButton.vue"
    import { ref, inject } from "vue";
    import { newUserData } from "libs/firebaseSystem"

    const loggingIn = ref(false)
    const errorMsg = ref("")
    const router = inject("router")
    const modalBase = ref(null)

    const modalTitle = ref("กรุณาลงชื่อเข้าใช้เพื่อใช้ โค้ดดิง ปิ้งไก่")
    const modalSub = ref("ลงชื่อเข้าใช้")

    const knownErrors = {
        "(auth/popup-closed-by-user)": "การลงชื่อเข้าใช้ถูกยกเลิก",
        "(auth/account-exists-with-different-credential)": "มีบัญชีนี้อยู่แล้ว",
        "(auth/popup-blocked)": "การลงชื่อเข้าใช้ถูกยกเลิกโดยเบราว์เซอร์",
    }

    let loginPromise;
    let loginKind = "login"

    const openL = async(kindOf) => {
        modalBase.value.openModal()

        loginKind = kindOf

        if (kindOf == "reauth") {
            modalTitle.value = "กรุณาลงชื่อเข้าใช้ใหม่เพื่อไปต่อ"
            modalSub.value = "ลงชื่อเข้าใช้เพื่อไปต่อ"
        } else {
            modalTitle.value = "กรุณาลงชื่อเข้าใช้เพื่อใช้ โค้ดดิง ปิ้งไก่"
            modalSub.value = "ลงชื่อเข้าใช้"
        }

        return new Promise((resolve) => {
            loginPromise = resolve
        })
    }

    const closeL = () => {
        modalBase.value.closeModal()
    }

    const googleLogin = async () => {
        loggingIn.value = true
        errorMsg.value = ""

        const provider = new GoogleAuthProvider();

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
            await newUserData(result.user)
            closeL()

            const credential = GoogleAuthProvider.credentialFromResult(result);

            loginPromise(credential)

            loggingIn.value = false

            if (loginKind == "login") {
                router.push("/dashboard")
            }
        }
    }

    defineExpose({openL, closeL})
</script>

<template>
    <Modal ref="modalBase">
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
            <h3 class="text-subtext">Social Media Login</h3>
            <ThirdPartyButton text="ลงชื่อเข้าใช้ด้วย Google" @click="googleLogin" image="/google.png" />
        </div>
        <!--
        <ThirdPartyButton text="ลงชื่อเข้าใช้ด้วย Facebook" image="Face.png" />
        <hr />
        <h3 class="text-subtext">Email Login</h3>
        <input class="w-100 form-control" placeholder="Email Address" ref="emailAddress" />
        <h3 class="text-subtext mt-2">Phone Login</h3>
        <input class="w-100 form-control" placeholder="Phone number" />
        <button class="btn btn-primary w-100 mt-2">Continue</button>
        -->
    </Modal>
</template>