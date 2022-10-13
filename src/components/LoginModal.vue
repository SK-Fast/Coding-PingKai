<script setup>
    import Modal from "./modal/Modal.vue"
    import ThirdPartyButton from "./login/ThirdPartyButton.vue"
import { ref } from "vue";

    const modalBase = ref(null)
</script>  

<script>
export default {
    openL: () => { Modal.methods.openModal() }
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
        <ThirdPartyButton text="ลงชื่อเข้าใช้ด้วย Google" image="google.png" />
        <ThirdPartyButton text="ลงชื่อเข้าใช้ด้วย Facebook" image="Face.png" />
        <hr />
        <h3 class="text-subtext">Email Login</h3>
        <input class="w-100 form-control" placeholder="Email Address" />
        <button class="btn btn-primary w-100 mt-2">Continue</button>
    </Modal>
</template>