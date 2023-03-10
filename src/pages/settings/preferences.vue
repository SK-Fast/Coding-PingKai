<template>
    <h2 class="mb-2">ระดับเสียง</h2>

    <ConfigCard title="ระดับเสียงหลัก" desc="ปรับระดับเสียงทั้งหมด">
        <div class="col-md-5">
            <input type="range" class="form-range" min="0" max="1" step="0.05" @input="previewMaster" @change="onMasterChanges" v-model="masterSound">
        </div>
    </ConfigCard>
</template>

<script setup>
import ConfigCard from '@/components/ConfigCard.vue'
import { ref, onMounted, inject } from 'vue';

const store = inject("store")

const masterSound = ref(store.state.prefs.volume.master)

const previewMaster = async() => {
    const { playAudio } = await import('libs/audioSystem.js')

    store.state.prefs.volume.master = masterSound.value

    playAudio('whop.mp3', {
        rate: masterSound.value,
    })
}

const onMasterChanges = async() => {
    previewMaster()

    window.localStorage.setItem('volume_master', masterSound.value)
}
</script>