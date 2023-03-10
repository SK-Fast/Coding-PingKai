<template>
    <h2 class="mb-2">สำหรับผู้พัฒนา</h2>

    <ConfigCard title="โหมดผู้พัฒนา" desc="เปิดโหมดผู้พัฒนา">
        <input class="form-check-input" type="checkbox" v-model="store.state.devMode" :checked="store.state.devMode">
    </ConfigCard>

    <h4 class="mb-2">env</h4>

    <div class="card">
        <div class="card-body">
            <JsonTreeView :data="JSON.stringify(devData.env)" :maxDepth="1" />
        </div>
    </div>

    <h4 class="mb-2 mt-2">user</h4>

    <div class="card w-100">
        <div class="card-body">
            <JsonTreeView :data="JSON.stringify(store.state.user)" :maxDepth="1" />
        </div>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import ConfigCard from '@/components/ConfigCard.vue'
import { JsonTreeView } from "json-tree-view-vue3";

const store = inject("store")

const devData = ref({
    env: import.meta.env
})
</script>