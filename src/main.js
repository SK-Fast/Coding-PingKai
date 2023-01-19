import { createApp, watch } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Routes from '@/router.js'
import '@/assets/scss/main.scss'
import VueFeather from 'vue-feather';
import { initApp } from './libs/firebaseSystem.js'
import { createStore } from 'vuex'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const router = createRouter({
    history: createWebHistory(""),
    routes: Routes
})

const store = createStore({
    state: {
        user: null
    },
    computed: {
        count () {
            return this.$store.state.user
        }
    }
})

initApp()

const app = createApp(App)

app.component(VueFeather.name, VueFeather);
app.use(router)
app.use(store)

app.use(VueSweetalert2);
window.Swal = app.config.globalProperties.$swal;

app.provide('router', router)

app.mount('#app')
