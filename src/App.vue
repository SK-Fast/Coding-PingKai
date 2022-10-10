<script setup>
  import Navbar from "@/components/Navbar.vue"
</script>

<template>
  <div>
    <Navbar />
    <nav>
      <router-link to="/">Landing</router-link>
       | 
      <router-link to="/lesson">Lesson</router-link>
       |
      <router-link to="/World1">World1</router-link>
      |
      <router-link to="/settings">settings</router-link>
      |
      <router-link to="/exit">exit</router-link>
    </nav><br>
    <router-view></router-view>
  </div>
</template>