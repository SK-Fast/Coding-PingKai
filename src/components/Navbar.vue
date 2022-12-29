<script setup>
/*
    import LoginModal from "@/components/LoginModal.vue"
    import { ref } from "vue";
    import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

    const loginModal = ref(null)
    const user = ref(null)

    const openLogin = () => {
        console.log("login entry")

        LoginModal.openL()
    }

    const auth = getAuth();

    onAuthStateChanged(auth, (newUser) => {
        console.log(newUser)
        user.value = newUser
    });

    const requestLogout = () => {
        // To be implumented: confirm logout modal
        signOut(auth)
    }
    */

    import * as rive from "@rive-app/canvas";
    import { onMounted, ref } from "vue";

    const logout_icon = ref(null)
    const usermenu_dropdown = ref(null)
    const usermenu_list = ref(null)
    let logoutRive;

    onMounted(() => {
        logoutRive = new rive.Rive({
            src: "rive/logout.riv",
            // Or the path to a local Rive asset
            // src: './example.riv',
            canvas: logout_icon.value,
            autoplay: true
        });

        logoutRive.play("Timeline 1")
    })
    
    let loggingout = false

    const logoutHover = () => {
        if (loggingout) { return }
        logoutRive.stop("Timeline 1")
        logoutRive.play("Hovered")
    }

    const userMenuClicked = () => {
        if (loggingout) { return }
        logoutRive.play("Timeline 1")

        if (usermenu_list.value.classList.contains("show")) {
            usermenu_list.value.classList.remove("show")
            usermenu_dropdown.value.classList.remove("show")
            usermenu_dropdown.value.setAttribute("aria-expanded", "false")
            usermenu_list.value.setAttribute("data-bs-popper", "static")
        } else {
            usermenu_list.value.classList.add("show")
            usermenu_dropdown.value.classList.add("show")
            usermenu_dropdown.value.setAttribute("aria-expanded", "true")
            usermenu_list.value.removeAttribute("data-bs-popper")
        }
    }

    const logoutUnHover = () => {
        if (loggingout) { return }
        logoutRive.stop("Timeline 1")
        logoutRive.play("UnHovered")
    }

    const logoutMDown = () => {
        if (loggingout) { return }
        logoutRive.stop("Timeline 1")
        logoutRive.play("MouseHold")
    }

    const requestLogout = () => {
        loggingout = true
        usermenu_dropdown.value.click()
        logoutRive.stop("Timeline 1")
        logoutRive.play("MouseRelease")
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
                            <button ref="usermenu_dropdown" @click="userMenuClicked" class="btn p-0 btn-transparent d-flex" type="button" id="dropdownMenuButton1"  aria-expanded="false">
                                <div class="avatar-container img-rounded ms-1">
                                    <div class="avatar img-rounded" style="background-image: url(@/assets/placeholder-avatar.jpeg)">
                                    <div class="avatar-status" />
                                </div>
                            </div>
                        </button>
                            <ul ref="usermenu_list" class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" href="#">โปรไฟล์</a></li>
                                <li><a class="dropdown-item" href="#">การตั้งค่า</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-danger d-flex align-items-center" @mouseenter="logoutHover" @mousedown="logoutMDown" @mouseleave="logoutUnHover" @click="requestLogout" href="#"><canvas ref="logout_icon" class="me-2" width="23" height="23"></canvas> ลงชื่อออก</a></li>
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