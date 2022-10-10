<script setup>
  import Navbar from "@/components/Navbar.vue"
</script>

<template>
  <div>
    <Navbar />
    <nav>
      <router-link to="/">Landing</router-link>
       | 
      <router-link to="/World1">World1</router-link>
      |
      <router-link to="/World2">World2</router-link>
      |
      <router-link to="/settings">settings</router-link>
      |
      <router-link to="/HomePage">HomePage</router-link>
    </nav><br>
    <router-view></router-view>
  </div>
</template>