<script setup>
    import ModalBack from "./modal/ModalBack.vue"
    import Modal from "./modal/Modal.vue"
</script>  

<template>
    <ModalBack>
        <Modal>
            <div class="text-center">
                <h3>ลงชื่อเข้าใช้</h3>
                <p class="text-muted">กรุณาลงชื่อเข้าใช้เพื่อใช้ โค้ดดิง ปิ้งไก่</p>
            </div>
            <h3 class="text-subtext">Social Media Login</h3>
            <button class="btn btn-with-left btn-light-200 w-100 text-start p-0"><div class="button-left"><img width="30" height="30" src="@/assets/google.png"></div> ลงชื่อเข้าใช้ด้วย Google</button>
        </Modal>
    </ModalBack>
</template>