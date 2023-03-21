<script setup>
  import Navbar from "@/components/Navbar.vue"
  import Footer from "@/components/Footer.vue"
  import MobileNavbar from "@/components/MobileNavbar.vue"
  import { ref, onMounted, inject } from "vue";
  import links from "./router.js"
  import { useRoute } from "vue-router";
  import LoginModal from "@/components/LoginModal.vue"
  import SpinningIndicator from "@/components/SpinningIndicator.vue"

  const router = inject("router")
  const route = useRoute()
  const store = inject("store")
  const loginModal = ref(null)

  let oldPage = ""

  onMounted(() => {
    store.state.fireLoginModal = async (kindOf = "login") => {
      return await loginModal.value.openL(kindOf)
    }
    
    oldPage = route.fullPath
  })
  
  router.beforeEach((to, from) => {
    if (to.meta['noScroll']) {
      document.documentElement.style.overflowY = 'hidden'
    } else {
      document.documentElement.style.overflowY = 'auto'
    }

    if (to.meta.needAuth && store.state.user == null) {
      loginModal.value.openL()
        return false
      }

      oldPage = route.fullPath
  })
</script>

<template>
  <Navbar />
  <SpinningIndicator/>

  <div class="d-flex flex-column top-pv" :class="route.meta['navbarStyle'] || ''">

    <LoginModal ref="loginModal" />

    <div class="main-pageview flex-grow-1" :class="route.meta['navbarStyle'] || ''">
      <div v-if="store.state.devMode" class="d-flex align-items-center p-2 bg-light-300 mb-2">
        <nav class="d-flex flex-grow-1 dev-links">
          <p v-for="(item, index) in links" class="m-0 me-1">
            <router-link :to="item.path">{{ item.path }}</router-link>
          </p>
        </nav>
        <code class="text-end me-2">Developer Menu         <input class="form-check-input" type="checkbox" v-model="store.state.devMode" :checked="store.state.devMode"></code>
      </div>

      <router-view class="pageView" :key="route.meta['oftenRefresh'] ? $route.fullPath : ''"></router-view>

      <Footer class="footer-nav" />
    </div>

    <MobileNavbar :class="route.meta['navbarStyle'] || ''" />
  </div>
</template>