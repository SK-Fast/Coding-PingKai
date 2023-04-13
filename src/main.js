import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Routes from '@/router.js'
import '@/assets/scss/main.scss'
import VueFeather from 'vue-feather';
import { initApp } from './libs/firebaseSystem.js'
import { checkStreak } from './libs/streakutils.js'
import { createStore } from 'vuex'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createI18n } from 'vue-i18n'
import locales from './locales/all.js'

console.log(`Coding %cPingKai %c ${__APP_VERSION__} Started`, 'color: #FF7733', 'color: #000');

const router = createRouter({
    history: createWebHistory(""),
    routes: Routes
})

const updateAppMain = async() => {
    console.log("Updating")

    if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()

        let prog = 0
        for (let registration of registrations) {
            registration.update()
            console.log("Updating Register ", prog)
            prog++
        }

        const names = await caches.keys()

        prog = 0

        for (let name of names) {
            caches.delete(name)
            console.log("Clearing Cache ", name)
        }
    }

    location.href = location.href
}

const pre_CheckForUpdates = async () => {
    console.log("Checking for updates...")

    if (import.meta.env.MODE == 'development') {
        console.log("Devmode detected, skipping updates...")
        return
    }

    const versionRes = await fetch("/version.json", { cache: "no-store" })
    const versionData = await versionRes.json()

    if (versionData.version != __APP_VERSION__) {
        return true
    } else {
        return false
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
        },
        userData: null
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

    const hasUpdates = await pre_CheckForUpdates()

    if (hasUpdates) {
        document.querySelector("#updatesFound").classList.add('foundUpdate')
        document.querySelector("#updateBtn").addEventListener('click', () => {
            document.querySelector("#updateBtn").textContent = "กำลังอัปเดต"  
            document.querySelector("#updateBtn").setAttribute('disabled', 'disabled')

            updateAppMain()
        })
        return   
    }

    const [fapp, fuser] = await initApp()

    const auth = getAuth();

    const i18n = createI18n({
        locale: urlParams.get('lang') || 'th',
        fallbackLocale: 'th',
        allowComposition: true,
        messages: locales,
    })

    onAuthStateChanged(auth, (newUser) => {
        console.log(newUser)

        store.state.user = newUser
        checkStreak(store)
    });


    console.log(fuser)

    const app = createApp(App)

    app.component(VueFeather.name, VueFeather);
    app.use(router)
    app.use(store)

    app.use(i18n)

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