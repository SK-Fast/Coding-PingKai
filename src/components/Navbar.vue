<script setup>
    import LoginModal from "@/components/LoginModal.vue"
    import { inject, ref } from "vue";
    import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
    import { promptLogout } from 'libs/firebaseSystem.js'

    const loginModal = ref(null)
    const user = ref(null)

    const store = inject('store')

    const openLogin = () => {
        console.log("login entry")

        LoginModal.openL()
    }

    const auth = getAuth();

    onAuthStateChanged(auth, (newUser) => {
        console.log(newUser)
        user.value = newUser

        store.state.user = newUser
    });

    const requestLogout = () => {
        // To be implumented: confirm logout modal
        signOut(auth)
    }
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light-300 py-md-0 shadow-sm">
        <div class="container-fluid">

            <LoginModal ref="loginModal" />

            <a class="navbar-brand me-1"><img src="@/assets/logo/Logo_Text.png" height="40"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link active">หน้าหลัก</router-link>
                    </li>
                </ul>
                <form>
                    <div class="d-flex align-items-center" v-if="user !== null">
                        <vue-feather type="save" stroke="#26BF59" />

                        <div class="dropdown">
                            <button data-bs-toggle="dropdown" class="btn p-0 btn-transparent d-flex" type="button" id="dropdownMenuButton1"  aria-expanded="false">
                                <div class="avatar-container img-rounded ms-1">
                                    <div class="avatar img-rounded avatar-navbar" style="background-image: url(@/assets/placeholder-avatar.jpeg)">
                                    <div class="avatar-status" />
                                </div>
                            </div>
                        </button>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" href="#">โปรไฟล์</a></li>
                                <li><router-link class="dropdown-item" to="/settings/general">การตั้งค่า</router-link></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-danger d-flex align-items-center" @click="promptLogout()" href="#">ลงชื่อออก</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="d-flex align-items-center" v-else>
                        <a href="#" @click="openLogin" class="btn btn-primary mb-md-0 mb-2">ลงชื่อเข้าใช้</a>
                    </div>
                </form>
            </div>
        </div>
    </nav>
</template>