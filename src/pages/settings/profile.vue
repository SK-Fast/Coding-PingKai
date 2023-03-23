<template>
    <h2 class="mb-2">ข้อมูลผู้ใช้</h2>
    <div class="card">
        <div
            class="card-body p-4 d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-center">
            <div title="อัปโหลดรูปภาพของคุณ" class="avatar-container img-rounded me-md-2">
                <a class="avatar img-rounded" @click="promptPFPUpload" :style="'background-image: url(\'' + (userImg) + '\')'">
                    <a
                        class="avatar-status bg-light-400 d-flex justify-content-center align-items-center">
                        <vue-feather type="image" size="20" stroke="black"></vue-feather>
                    </a>
                </a>
            </div>

            <div class="flex-grow-1 d-flex flex-column ms-md-2 text-md-start text-center">
                <h3>{{ userDisplayName }}</h3>
                <p>อีเมล: <span ref="unrevealedText">*************@********</span> <span ref="revealedText"
                        class="d-none">{{ store.state.user ? store.state.user.email : "email not found" }}</span> <span
                        class="text-primary"><a ref="emailRevealText" @click="emailReveal">ดูอีเมล</a></span></p>
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

    <div class="card mt-2">
        <div class="card-body p-4">
            <p>การเชื่อมต่อ</p>
            <div class="card" v-for="providerData in store.state.user.providerData">
                <div class="card-body d-flex">
                    <div>
                        <img src="/google.png" height="50" v-if="providerData.providerId == 'google.com'">
                        <img src="/facebook.png" height="50" v-if="providerData.providerId == 'facebook.com'">
                    </div>
                    <div class="ms-2 flex-grow">
                        <h5 class="m-0">{{ providerData.displayName }}</h5>
                        <p class="text-muted m-0">{{ providerData.providerId }}</p>
                    </div>
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

    <h2 class="mt-4">การตั้งค่าเพิ่มเติม</h2>

    <ConfigCard title="ลบบัญชี" desc="ทำการลบบัญชีโดยถาวร" class="mt-2">
        <button class="btn btn-danger" @click="deleteAccount">ลบบัญชี</button>
    </ConfigCard>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import ConfigCard from '@/components/ConfigCard.vue'

const store = inject('store')

const userImg = ref()
const unrevealedText = ref()
const revealedText = ref()
const emailRevealText = ref()
const userDisplayName = ref("")

let auth;
let emailRevealed = false

const promptPFPUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'

    input.onchange = e => {
        // getting a hold of the file reference
        var file = e.target.files[0];

        // setting up the reader
        var reader = new FileReader();
        reader.readAsDataURL(file); // this is reading as data url

        // here we tell the reader what to do when it's done reading...
        reader.onload = async (readerEvent) => {
            const content = readerEvent.target.result; // this is the content!

            if (content.length > 2000000) {
                await Swal.fire({
                    title: 'ไฟล์ใหญ่เกินไป',
                    text: "ขนาดของรูปภาพต้องน้อยกว่า 2MB",
                    icon: 'error',
                    confirmButtonText: 'ปิด',
                })
                return
            }

            const { updateProfile } = await import('@firebase/auth');

            updateProfile(auth.currentUser, {
                photoURL: content
            })
            store.state.user.photoURL = content
            userImg.value = content

            input.remove()
        }

    }

    input.click();
}

onMounted(async () => {
    const { getAuth } = await import('@firebase/auth');

    userDisplayName.value = store.state.user.displayName

    auth = getAuth()

    if (store.state.user) {
        console.log(store.state.user)
        userImg.value = store.state.user.photoURL || "/placeholder-avatar.jpg"
    }
})

const changeUsername = async () => {
    const { updateProfile } = await import('@firebase/auth');

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
            userDisplayName.value = req.value
            window.toastMixin.fire(
                {
                    title: "เปลี่ยนชื่อเสร็จสิ้น!"
                }
            )
        }
    }

    console.log(req)
}

const emailReveal = async () => {
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


const deleteAccount = async () => {
    const { deleteUser, reauthenticateWithCredential } = await import('@firebase/auth');

    const res = await Swal.fire({
        title: 'ยืนยันการลบบัญชี',
        html: `
        <p>คุณกำลังทำการลบบัญชีนี้ เมื่อทำการลบบัญชีนี้แล้ว ข้อมูลเหล่านี้จะถูกลบโดยถาวร:</p>
        <ul>
            <li>ข้อมูลผู้ใช้</li>
            <li>ความคืบหน้าทั้งหมด</li>
        </ul>
        <p>ข้อมูลเหล่านี้จะไม่สามารถกู้คืนได้ คุณยืนยันที่จะลบรหัสนี้หรือไม่</p>
        <p>(ต้องยืนยันรหัสผ่านก่อนลบเพื่อยืนยันตัวตน)</p>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
    })

    if (res.isConfirmed) {
        setTimeout(async () => {
            const { deleteUserData } = await import('libs/firebaseSystem.js')

            let credential = await store.state.fireLoginModal("reauth")

            await reauthenticateWithCredential(store.state.user, credential)

            await deleteUserData(store.state.user)

            await deleteUser(store.state.user)

            document.body.classList.add("circle-close")

            setTimeout(async () => {
                window.location.href = '/?deleted=true'
            }, 1200)
        }, 200)
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