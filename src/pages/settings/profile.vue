<template>
    <h2 class="mb-2">ข้อมูลผู้ใช้</h2>
    <div class="card">
        <div class="card-body p-4 d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center">
            <div class="avatar-container img-rounded me-md-2">
                <div class="avatar img-rounded" :style="'background-image: url(\'' + (userImg) + '\')'">
                    <div class="avatar-status" />
                </div>
            </div>

            <div class="flex-grow-1 d-flex flex-column ms-md-2 text-md-start text-center">
                <h3>{{ store.state.user.displayName }}</h3>
                <p>อีเมล: <span ref="unrevealedText">*************@********</span> <span ref="revealedText" class="d-none">{{ store.state.user ? store.state.user.email : "email not found" }}</span> <span class="text-primary"><a ref="emailRevealText" @click="emailReveal">ดูอีเมล</a></span></p>
                <div class="d-flex justify-content-md-start justify-content-center">
                    <button @click="changeUsername" class="btn btn-primary">เปลี่ยนชื่อ</button>
                    <!--
                    <button class="btn btn-primary">ดู Profile</button>
                    <button class="btn btn-primary ms-2">เปลี่ยนรหัสผ่าน</button>
                    -->
                </div>
            </div>

        </div>
    </div>

    <!--
    <div class="card mt-2">
        <div class="card-body p-4">
            <p>เกี่ยวกับคุณ...</p>
            <textarea class="form-control" placeholder="เกี่ยวกับคุณ..." rows="10"></textarea>
            <button class="float-end mt-2 btn btn-primary">บันทึก</button>
        </div>
    </div>
    -->
</template>

<script setup>
import { getAuth, updateProfile } from '@firebase/auth';
import { inject, onMounted, ref } from 'vue';

const store = inject('store')

const userImg = ref()
const unrevealedText = ref()
const revealedText = ref()
const emailRevealText = ref()

const auth = getAuth()
let emailRevealed = false

onMounted(async () => {
    if (store.state.user) {
        console.log(store.state.user)
        userImg.value = store.state.user.photoURL || "/placeholder-avatar.jpg"
    }
})

const changeUsername = async() => {
    const req = await window.Swal.fire({
      title: "เปลี่ยนชื่อ",
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: "ชื่อใหม่..."
    })

    if (req.isConfirmed) {
        if (req.value !== "") {
            await updateProfile(auth.currentUser, {
                displayName: req.value
            })

            store.state.user.displayName = req.value 
            window.toastMixin.fire(
                {
                    title: "เปลี่ยนชื่อเสร็จสิ้น!"
                }
            )
        }
    }

    console.log(req)
}

const emailReveal = async() => {
    if (store.state.user) {
        if (!emailRevealed) {
            emailRevealed = true
            emailRevealText.value.textContent = "ซ่อน"

            revealedText.value.classList.remove("d-none")
            unrevealedText.value.classList.add("d-none")
        } else {
            emailRevealed = false

            emailRevealText.value.textContent = "ดูอีเมล"

            unrevealedText.value.classList.remove("d-none")
            revealedText.value.classList.add("d-none")
        }
    }
}
</script>

<style scoped>
.avatar {
    width: 115px;
    height: 115px;
}

.avatar-status {
    width: 30px;
    height: 30px;
    border-radius: 20px;
    outline-width: 5px;
    outline-color: white;
}
</style>