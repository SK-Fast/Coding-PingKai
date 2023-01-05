<template>
    <h2 class="mb-2">ข้อมูลผู้ใช้</h2>
    <div class="card">
        <div class="card-body p-4 d-flex">
            <div class="avatar-container img-rounded ms-1">
                <div class="avatar img-rounded" :style="'background-image: url(\'' + (userImg) + '\')'">
                    <div class="avatar-status" />
                </div>
            </div>

            <div class="flex-grow-1 d-flex flex-column ms-md-2">
                <h3>{{ store.state.user.displayName }}</h3>
                <p>อีเมล: *************@gmail.com <span class="text-primary"><a>ดูอีเมล</a></span></p>
                <div class="d-flex">
                    <button class="btn btn-primary">ดู Profile</button>
                    <button class="btn btn-primary ms-2">เปลี่ยนรหัสผ่าน</button>
                </div>
            </div>

        </div>
    </div>

    <div class="card mt-2">
        <div class="card-body p-4">
            <p>เกี่ยวกับคุณ...</p>
            <textarea class="form-control" placeholder="เกี่ยวกับคุณ..." rows="10"></textarea>
            <button class="float-end mt-2 btn btn-primary">บันทึก</button>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';

const store = inject('store')

const userImg = ref()

onMounted(async () => {
    const { getAuth, onAuthStateChanged, signOut } = await import("firebase/auth");

    const auth = getAuth()

    if (store.state.user) {
        console.log(store.state.user)
        userImg.value = store.state.user.photoURL || "placeholder-avatar.jpeg"
    }

})
</script>

<style scoped>
.avatar {
    width: 115px;
    height: 115px;
}
</style>