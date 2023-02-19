<template>
    <h2 class="mb-2">สำหรับผู้พัฒนา</h2>

    <ConfigCard title="โหมดผู้พัฒนา" desc="เปิดโหมดผู้พัฒนา">
        <input class="form-check-input" type="checkbox" v-model="store.state.devMode" :checked="store.state.devMode">
    </ConfigCard>

    <h4 class="mb-2">env</h4>

    <div class="card">
        <div class="card-body">
            <div class="d-flex flex-column">
                <code v-for="(item, index) in devData.env">
                      {{ index }}: {{ item }}
                    </code>
            </div>
        </div>
    </div>

    <button class="btn btn-primary" @click="appUpdate">อัปเดตแอปเลยตอนนี้</button>
</template>

<script setup>
import { ref, inject } from 'vue';
import ConfigCard from '@/components/ConfigCard.vue'

const store = inject("store")

const devData = ref({
    env: import.meta.env
})

const appUpdate = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
                registration.update()
            }
        })
    }
    window.location.reload(true);
}
</script>