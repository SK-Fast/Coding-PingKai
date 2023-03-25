<template>
    <div class="loading-side p-3 rounded" v-bind:class="{show: loading}">
        <div class="chick-spinner chick-spinner-light"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";

const store = inject("store")
const loading = ref(false)

onMounted(() => {
    console.log("Spinning Mounted")

    store.state.fireLoading = () => {
        loading.value = true
    }

    store.state.fireLoadStop = () => {
        loading.value = false
    }
})

</script>

<style scoped>
.loading-side {
    position: fixed;
    right: 15px;
    bottom: 15px;
    background-color: #00000090;
    z-index: 999;
    height: 80px;
    backdrop-filter: blur(1px);
    transition: transform 0.25s;
    transition-timing-function: cubic-bezier(0.36, 0, 0.66, -0.56);
    pointer-events: none;
    transform: scale(0);
}

.loading-side.show {
    transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
    transform: scale(1);
}

@media only screen and (max-width: 768px) {
    .loading-side {
        bottom: 70px;
    }
}
</style>