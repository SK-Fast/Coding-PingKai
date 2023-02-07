<script setup>
  import Navbar from "@/components/Navbar.vue"
  import Footer from "@/components/Footer.vue"
  import MobileNavbar from "@/components/MobileNavbar.vue"
  import { ref, onMounted, watch, inject } from "vue";
  import links from "./router.js"
  import { useRoute } from "vue-router";
  import LoginModal from "@/components/LoginModal.vue"
  import AcceptCookies from "@/components/AcceptCookies.vue"

  const router = inject("router")
  const route = useRoute()
  const store = inject("store")
  const loginModal = ref(null)

  const cookieAccepted = ref(false)

  let oldPage = ""

  onMounted(() => {
    oldPage = route.fullPath

    cookieAccepted.value = window.localStorage.getItem("cookie_accepted") || false
  })
  
  router.beforeEach((to, from) => {
    if (to.meta.needAuth && store.state.user == null) {
        LoginModal.openL(to)
        return false
      }

      oldPage = route.fullPath
  })
</script>

<template>
  <div class="d-flex flex-column top-pv" :class="route.meta['navbarStyle'] || ''">
    <Navbar />

    <LoginModal ref="loginModal" />

    <div class="main-pageview flex-grow-1">
      <div v-if="store.state.devMode" class="d-flex align-items-center p-2 bg-light-300 mb-2">
        <nav class="d-flex flex-grow-1 dev-links">
          <p v-for="(item, index) in links" class="m-0 me-1">
            <router-link :to="item.path">{{ item.path }}</router-link>
          </p>
        </nav>
        <code class="text-end me-2">Developer Menu</code>
      </div>

      <router-view class="pageView"></router-view>

      <Footer class="footer-nav" />

      <AcceptCookies class="acceptcookies-card" v-if="cookieAccepted == false"></AcceptCookies>
    </div>

    <MobileNavbar />
  </div>
</template>