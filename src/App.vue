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
      |
      <routerLink to="/profile">profile</routerLink>
      |
      <routerLink to="/password">password</routerLink>
      |
      <routerLink to="/exit">exit</routerLink>
      |
      <RouterLink to="Pog">Pog</RouterLink>
      |
      <RouterLink to="/workspace">workspace</RouterLink>
    </nav><br>

    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>