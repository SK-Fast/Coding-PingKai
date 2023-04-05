<script setup>
import Modal from "./modal/Modal.vue"
import { ref, inject } from "vue";
import { getMaxLevel } from "../lessons/lessons";
import CongratsPage from "./congrats-pages/congrats.vue";
import StreakPage from "./congrats-pages/streak.vue";

const modalBase = ref("modalBase")
const userData = ref({})
const morePages = ref([])
const continueEnabled = ref(true)
const pageID = ref('')
const pageData = ref({})

const pageIndex = ref(0)
const pageDisappears = ref(false)
const pageComes = ref(false)
const modalPages = ref()
const refLvlID = ref(0)

const openM = (levelID, moreEvents) => {
    pageIndex.value = 0
    morePages.value = [{ id: "congrats" }, ...moreEvents]

    pageID.value = "congrats"

    modalBase.value.openModal()
    levelID = parseInt(levelID)
    refLvlID.value = levelID
}

const closeM = () => {
    modalBase.value.closeModal()
}

const continuePage = () => {
    pageIndex.value++

    if (morePages.value.length == pageIndex.value) {
        return emit('continue')
    }

    pageDisappears.value = true
    pageComes.value = false

    setTimeout(() => {
        pageDisappears.value = false
        pageComes.value = true

        const pageRef = morePages.value[pageIndex.value]
        
        pageID.value = pageRef.id
        pageData.value = pageRef['data']
    }, 500);


    if (morePages.value.length == pageIndex.value + 1) {
        if (refLvlID.value + 1 >= getMaxLevel()) {
            continueEnabled.value = false
        }
    }

}

defineExpose({ openM, closeM })

const emit = defineEmits(['continue'])
</script>

<template>
    <Modal ref="modalBase">
        <div class="modal-pages-container">
            <div class="modal-pages" ref="modalPages" :class="{ 'anim-gone': pageDisappears, 'anim-come': pageComes }">
                <CongratsPage v-if="pageID == 'congrats'"/>

                <StreakPage v-if="pageID == 'streak_update'" :pageData="pageData"/>

                <button class="btn btn-secondary w-100" @click="closeM">ปิด</button>
                <button class="btn btn-primary w-100 mt-2" v-if="continueEnabled" @click="continuePage">ต่อไป</button>
            </div>
        </div>
    </Modal>
</template>

<style scoped>
.modal-pages-container {
    overflow: hidden;
}

.modal-pages.anim-gone {
    animation: slideGone 0.5s cubic-bezier(0.36, 0, 0.66, -0.56);
}

.modal-pages.anim-come {
    animation: slideCome 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideGone {
    0% {
        transform: translateX(0);
        opacity: 1;
    }

    100% {
        transform: translateX(-50%);
        opacity: 0;
    }
}

@keyframes slideCome {
    0% {
        transform: translateX(50%);
        opacity: 0;
    }

    100% {
        transform: translateX(0%);
        opacity: 1;
    }
}
</style>