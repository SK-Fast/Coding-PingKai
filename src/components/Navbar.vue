<script setup>
import { inject, ref, onMounted } from "vue";
import { promptLogout } from 'libs/firebaseSystem.js'
import { useRoute } from "vue-router";

const route = useRoute()

const store = inject('store')
const doBlur = ref(false)

const onScroll = (event) => {
    let scrollY = window.scrollY;

    doBlur.value = scrollY > 50
}

onMounted(() => {
    document.addEventListener("scroll", onScroll)
})

const openLogin = () => {
    console.log("login entry")

    store.state.fireLoginModal()
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light-300 py-md-0 shadow-sm" :class="`${route.meta['navbarStyle'] || ''} ${doBlur ? 'do-blur' : ''}`">
        <div class="container-fluid">

            <router-link class="navbar-brand me-1" to="/">
                <img v-if="route.meta['navbarStyle'] == 'landing'" src="@/assets/logo/logo_text_white.png" height="40">
                <img v-else src="@/assets/logo/Logo_Text.png" height="40">

            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" v-if="!store.state.user">
                        <router-link to="/" class="nav-link">
                            <vue-feather class="m-nav-icon" type="home"
                            :stroke="route.meta['navbarStyle'] == 'landing' ? '#FFF' : '#B3B3B3'"
                            size="20"></vue-feather>
                            <span>หน้าหลัก</span>

                        </router-link>
                    </li>

                    <li class="nav-item" v-if="store.state.user">
                        <router-link to="/dashboard" class="nav-link">
                            <vue-feather class="m-nav-icon" type="home"
                            :stroke="route.meta['navbarStyle'] == 'landing' ? '#FFF' : '#B3B3B3'"
                            size="20"></vue-feather>
                            <span>หน้าหลัก</span>

                        </router-link>
                    </li>

                    <li class="nav-item nav-pop" v-if="store.state.user">
                        <router-link to="/learn" class="nav-link"><vue-feather class="m-nav-icon" type="book"
                            :stroke="route.meta['navbarStyle'] == 'landing' ? '#FFF' : '#B3B3B3'"
                            size="20"></vue-feather>
                            <span>บทเรียน</span>

                        </router-link>
                    </li>

                    <!--
                    <li class="nav-item nav-pop">
                        <router-link to="/leaderboard" class="nav-link"><vue-feather class="m-nav-icon" type="award"
                            :stroke="route.meta['navbarStyle'] == 'landing' ? '#FFF' : '#B3B3B3'"
                            size="20"></vue-feather>
                            <span>กระดานคะแนน</span>

                        </router-link>
                    </li>
                    -->

                    <li class="nav-item nav-pop">
                        <router-link to="/credits" class="nav-link"><vue-feather class="m-nav-icon" type="users"
                            :stroke="route.meta['navbarStyle'] == 'landing' ? '#FFF' : '#B3B3B3'"
                            size="20"></vue-feather>
                        <span>ผู้จัดทำ</span>

                        </router-link>
                    </li>
                </ul>
                <form class="d-flex align-items-center">
                    
                    <div class="pb-1 d-flex align-items-center me-3" v-if="store.state.user !== null && route.meta['navbarStyle'] == 'landing'">
                        <img src="@/assets/exp_light.png" height="25">
                        <p class="text-monospace m-0 ms-1 text-white">{{ store.state['userData'] ? store.state.userData.exp : '0' }}</p>
                    </div>
                    
                    <div class="pb-1 d-flex align-items-center me-3" v-else v-if="store.state.user !== null">
                        <img src="@/assets/exp.png" height="25">
                        <p class="text-monospace m-0 ms-1 text-warning">{{ store.state['userData'] ? store.state.userData.exp : '0' }}</p>
                    </div>

                    <div class="pb-1 d-flex align-items-center me-3" v-if="store.state.user !== null && route.meta['navbarStyle'] == 'landing'">
                        <img src="@/assets/streak_light.png" height="25">
                        <p class="text-monospace m-0 ms-1 text-white">{{ store.state['userData'] ? store.state.userData.streak : '0' }}</p>
                    </div>

                    <div class="pb-1 d-flex align-items-center me-3" v-else v-if="store.state.user !== null">
                        <img src="@/assets/streak.png" height="25">
                        <p class="text-monospace m-0 ms-1 text-primary">{{ store.state['userData'] ? store.state.userData.streak : '0' }}</p>
                    </div>
                    
                    <router-link class="icon-link nav-item" to="/settings/general"
                        v-if="store.state.user !== null"><vue-feather class="m-nav-icon" type="settings"
                            :stroke="route.meta['navbarStyle'] == 'landing' ? '#FFF' : '#B3B3B3'"
                            size="25"></vue-feather></router-link>

                    <div class="d-flex align-items-center" v-if="store.state.user !== null">
                        <!--<vue-feather type="save" stroke="#26BF59" />-->

                        <div class="dropdown">
                            <button data-bs-toggle="dropdown" class="btn p-0 btn-transparent d-flex" type="button"
                                id="dropdownMenuButton1" aria-expanded="false">
                                <div class="avatar-container img-rounded ms-1">
                                    <div class="avatar img-rounded avatar-navbar"
                                        :style="'background-image: url(' + (store.state.user.photoURL || '/placeholder-avatar.jpg') + ')'">
                                        <div class="avatar-status" />
                                    </div>
                                </div>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                <!--<li><a class="dropdown-item" href="#">โปรไฟล์</a></li>-->
                                <li><router-link class="dropdown-item" to="/settings/general">การตั้งค่า</router-link></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item text-danger d-flex align-items-center" @click="promptLogout()"
                                        href="#">ลงชื่อออก</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="d-flex align-items-center" v-else>
                        <a href="#" @click="openLogin" class="btn mb-md-0 mb-2"
                            :class="`${route.meta['navbarStyle'] == 'landing' ? 'btn-light-100' : 'btn-primary'}`">{{ $t("signin") }}</a>
                    </div>
                </form>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.avatar {
    height: 35px;
}

.navbar.landing.do-blur {
    background-color: rgba(var(--bs-primary-rgb), 0.8) !important;
    backdrop-filter: blur(1px);
}

.navbar.landing {
    background-color: var(--bs-primary) !important;
    box-shadow: none !important;
}

.navbar.landing .nav-link {
    color: white;
}

.navbar.hide {
    display: none;
}

.nav-pop {
    overflow: hidden;
}

.nav-item .nav-link {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<style>

.nav-item .nav-link span {
    font-size: 0px;
    transition-property: font-size, opacity;
    transition-duration: 0.25s;
    opacity: 0;
}

.nav-item:hover .nav-link span {
    font-size: 14px;
    margin-left: 0.5rem;
    opacity: 1;
}

.nav-item .router-link-active span {
    font-size: 14px;
    margin-left: 0.5rem;
    opacity: 1;
}

.nav-item .router-link-active svg {
    stroke: #FF7733;
}

.navbar.landing .nav-item .router-link-active svg {
    stroke: white;
}

</style>