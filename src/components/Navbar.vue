<script setup>
    import { inject, ref } from "vue";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    import { promptLogout } from 'libs/firebaseSystem.js'
    import { useRoute } from "vue-router";

    const user = ref(null)
    const router = inject("router")
    const route = useRoute()

    const store = inject('store')

    const openLogin = () => {
        console.log("login entry")

        store.state.fireLoginModal()
    }

    const auth = getAuth();

    onAuthStateChanged(auth, (newUser) => {
        console.log(newUser)
        user.value = newUser
        console.log(router)

        store.state.user = newUser
    });
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light-300 py-md-0 shadow-sm" :class="route.meta['navbarStyle'] || ''">
        <div class="container-fluid">

            <a class="navbar-brand me-1">
                <img v-if="route.meta['navbarStyle'] == 'landing'" src="@/assets/logo/logo_text_white.png" height="40">
                <img v-else src="@/assets/logo/logobeta.png" height="40">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">หน้าหลัก</router-link>
                    </li>

                    <li class="nav-item nav-pop" v-if="store.state.user">
                        <router-link to="/learn" class="nav-link">บทเรียน</router-link>
                    </li>
                </ul>
                <form class="d-flex align-items-center">
                    <router-link class="nav-item" to="/settings/general" v-if="user !== null"><vue-feather class="m-nav-icon" type="settings" :stroke="route.meta['navbarStyle'] == 'landing' ? '#FFF' : '#B3B3B3'" size="25"></vue-feather></router-link>
                    
                    <div class="d-flex align-items-center" v-if="user !== null">
                        <!--<vue-feather type="save" stroke="#26BF59" />-->

                        <div class="dropdown">
                            <button data-bs-toggle="dropdown" class="btn p-0 btn-transparent d-flex" type="button" id="dropdownMenuButton1"  aria-expanded="false">
                                <div class="avatar-container img-rounded ms-1">
                                    <div class="avatar img-rounded avatar-navbar" :style="'background-image: url(' + (store.state.user.photoURL || 'placeholder-avatar.jpg') + ')'">
                                    <div class="avatar-status" />
                                </div>
                            </div>
                        </button>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                <!--<li><a class="dropdown-item" href="#">โปรไฟล์</a></li>-->
                                <li><router-link class="dropdown-item" to="/settings/general">การตั้งค่า</router-link></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-danger d-flex align-items-center" @click="promptLogout()" href="#">ลงชื่อออก</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="d-flex align-items-center" v-else>
                        <a href="#" @click="openLogin" class="btn mb-md-0 mb-2" :class="`${route.meta['navbarStyle'] == 'landing' ? 'btn-light-100' : 'btn-primary'}`">ลงชื่อเข้าใช้</a>
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

.nav-pop .nav-link {
    animation: popDown 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

 @keyframes popDown {
    from {
        transform: translateY(-100%);
    }
 }
</style>