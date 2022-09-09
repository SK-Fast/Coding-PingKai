import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Routes from '@/router.js'

const router = createRouter({
    history: createWebHistory(""),
    routes: Routes
})

const app = createApp(App)

app.use(router)

app.mount('#app')