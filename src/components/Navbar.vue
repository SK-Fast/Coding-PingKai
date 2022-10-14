<script setup>
    import LoginModal from "@/components/LoginModal.vue"
    import { ref } from "vue";

    const loginModal = ref(null)

    const openLogin = () => {
        console.log("login entry")

        LoginModal.openL()
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
                    <li class="nav-item">
                        <a href="#" @click="openLogin" class="nav-link">ลงชื่อเข้าใช้</a>
                    </li>
                </ul>
                <form class="d-flex align-items-center">
                    <vue-feather type="save" stroke="#26BF59" />

                    <div class="avatar-container img-rounded ms-1">
                        <div class="avatar img-rounded" style="background-image: url(placeholder-avatar.jpeg)">
                            <div class="avatar-status" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </nav>
</template>