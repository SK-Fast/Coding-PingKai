import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Routes from '@/router.js'
import '@/assets/scss/main.scss'
import VueFeather from 'vue-feather';
import { initApp } from './libs/firebaseSystem.js'

const router = createRouter({
    history: createWebHistory(""),
    routes: Routes
})

initApp()

const app = createApp(App)

app.component(VueFeather.name, VueFeather);
app.use(router)

app.mount('#app')