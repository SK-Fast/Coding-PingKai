<template>
    <h2 class="mb-2">สำหรับผู้พัฒนา</h2>
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

</template>

<script setup>
import { ref } from 'vue';

const devData = ref({
    env: import.meta.env
})
</script>