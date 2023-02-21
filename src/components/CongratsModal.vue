<script setup>
    import Modal from "./modal/Modal.vue"
    import { ref, inject } from "vue";
    import { getMaxLevel } from "../lessons/lessons";

    const modalBase = ref("modalBase")
    const userData = ref({})
    const continueEnabled = ref(true)

    const openM = (levelID) => {
        modalBase.value.openModal()
        levelID = parseInt(levelID)

        if (levelID + 1 >= getMaxLevel()) {
            continueEnabled.value = false
        }
    }

    const closeM = () => {
        modalBase.value.closeModal()
    }

    defineExpose({openM, closeM})

    const emit = defineEmits(['continue'])
</script>

<template>
    <Modal ref="modalBase">
        <div class="d-flex flex-column justify-content-center align-items-center">
            <img src="@/assets/chick_congrats.png" class="col-8 img-fluid">
            <h3>ยินดีด้วย!</h3>
            <p>คุณผ่านด่านนี้แล้ว!</p>
            <button class="btn btn-secondary w-100" @click="closeM">ปิด</button>
            <button v-if="continueEnabled" class="btn btn-primary w-100 mt-2" @click="emit('continue')">ด่านต่อไป</button>
        </div>
    </Modal>
</template>