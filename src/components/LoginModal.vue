<script setup>
    import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
    import Modal from "./modal/Modal.vue"
    import ThirdPartyButton from "./login/ThirdPartyButton.vue"
    import { ref } from "vue";
    import { newUserData } from "libs/firebaseSystem"

    const modalBase = ref(null)

    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        const auth = getAuth()

        const result = await signInWithPopup(auth, provider).catch((error) => {console.log(error)})

        console.log(result)

        if (result['user']) {
            await newUserData(result.user)
            Modal.methods.closeModal()
        }
    }
</script>  

<script>
const emailAddress = ref(null)

export default {
    openL: () => {
        Modal.methods.openModal()
    },
    closeL: () => {
        Modal.methods.closeModal()
    },
}
</script>

<template>
    <Modal ref="modalBase">
        <div class="login-header"></div>
        <div class="text-center">
            <h3>ลงชื่อเข้าใช้</h3>
            <p class="text-muted">กรุณาลงชื่อเข้าใช้เพื่อใช้ โค้ดดิง ปิ้งไก่</p>
        </div>
        <h3 class="text-subtext">Social Media Login</h3>
        <ThirdPartyButton text="ลงชื่อเข้าใช้ด้วย Google" @click="googleLogin" image="google.png" />
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