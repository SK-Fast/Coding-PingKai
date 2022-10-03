<script setup>
  import Navbar from "@/components/Navbar.vue"
  import LoginModal from "@/components/LoginModal.vue"
</script>

<template>
  <div>
    <Navbar />
    <LoginModal />
    <nav>
      <router-link to="/">Landing</router-link>
       | 
      <router-link to="/World1">World1</router-link>
      |
      <router-link to="/settings">settings</router-link>
    </nav><br>
    <router-view></router-view>
  </div>
</template>