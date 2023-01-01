<script setup>
  import Navbar from "@/components/Navbar.vue"
  import { ref } from "vue";
  import links from "./router.js"

  const devMode = ref(import.meta.env.MODE == 'development')
</script>

<template>
  <div>
    <Navbar />
    <div v-if="devMode" class="d-flex align-items-center p-2 bg-light-300 mb-2">
      <nav class="d-flex flex-grow-1">
        <p v-for="(item, index) in links" class="m-0 me-1">
          <router-link :to="item.path">{{ item.path }}</router-link>
        </p>
      </nav>
      <code class="text-end me-2">Developer Menu</code>
    </div>

    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>