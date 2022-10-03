<template>
  <div>
    <nav>
      <router-link to="/">Landing</router-link>
       | 
      <router-link to="/World1">World1</router-link>
       |
      <router-link to="/world2">World2</router-link>
      |
      <router-link to="/HomePage">HomePage</router-link>
    </nav><br>
    <router-view></router-view>
  </div>
</template>