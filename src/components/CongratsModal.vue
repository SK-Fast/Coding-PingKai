<script setup>
    import Modal from "./modal/Modal.vue"
    import { ref, inject } from "vue";

    const modalBase = ref("modalBase")

    const openM = () => {
        modalBase.value.openModal()
    }

    const closeM = () => {
        modalBase.value.closeModal()
    }

    defineExpose({openM, closeM})

    const emit = defineEmits(['continue'])
</script>

<template>
    <Modal ref="modalBase">
        <div class="col-md-5">
            <h3>เก่งดีนิ</h3>
            <p>แต่นายลืมโอน Truemoney wallet 0694206942</p>
            <button class="btn btn-primary" @click="emit('continue')">ไปต่อ</button>
        </div>
    </Modal>
</template>