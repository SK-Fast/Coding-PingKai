import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Routes from '@/router.js'
import '@/assets/scss/main.scss'
import VueFeather from 'vue-feather';
import { initApp } from './libs/firebaseSystem.js'
import { createStore } from 'vuex'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";

console.log(`Coding %cPingKai %c ${__APP_VERSION__} Started`, 'color: #FF7733', 'color: #000');

const router = createRouter({
    history: createWebHistory(""),
    routes: Routes
})

const pre_CheckForUpdates = async () => {
    console.log("Checking for updates...")

    const versionRes = await fetch("/version.json", { cache: "no-store" })
    const versionData = await versionRes.json()

    if (versionData.version != __APP_VERSION__) {
        console.log("Updating tp version ", versionData.version)

        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations()

            for (let registration of registrations) {
                registration.update()
            }

            const names = await caches.keys()

            for (let name of names) {
                caches.delete(name)
                console.log("Clearing Cache ", name)
            }
        }

        window.location.reload(true)
    } else {
        console.log("No updates found, continuing...")
    }
}

const store = createStore({
    state: {
        user: null,
        devMode: import.meta.env.MODE == 'development',
        fireLoginModal: null,
        prefs: {
            volume: {
                master: window.localStorage.getItem('volume_master') || 1,
            }
        }
    },
    computed: {
        count() {
            return this.$store.state.user
        }
    },
})

window.vueStore = store
window.codeGens = {}

const initVueApp = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.get('skip-loading')) {
        document.getElementById("preload-i").style.display = "none"
    }

    const [fapp, fuser] = await initApp()

    const auth = getAuth();

    onAuthStateChanged(auth, (newUser) => {
        console.log(newUser)

        store.state.user = newUser
    });


    console.log(fuser)

    const app = createApp(App)

    app.component(VueFeather.name, VueFeather);
    app.use(router)
    app.use(store)

    app.use(VueSweetalert2);
    window.Swal = app.config.globalProperties.$swal;
    window.toastMixin = window.Swal.mixin({
        toast: true,
        icon: 'success',
        title: 'General Title',
        animation: false,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    app.provide('router', router)

    app.mount('#app')

    setTimeout(() => {
        document.getElementById("preload-i").classList.add('preload-loaded')

        setTimeout(() => {
            document.getElementById("preload-i").remove()
        }, 500);
    }, 100);

    if (urlParams.get('deleted')) {
        document.body.classList.add("circle-open")
    }
}

initVueApp()