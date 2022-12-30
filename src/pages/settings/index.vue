<template>
    <div class="container d-flex">
        <div class="d-flex flex-column col-md-3 me-2">
            <h2 class="ms-0 mb-2">การตั้งค่า</h2>   
            <router-link class="btn btn-primary settings-btn" to="/settings">
                ข้อมูลผู้ใช้
            </router-link>
            <router-link class="btn btn-mid-transparent settings-btn" to="/settings/password">
               รหัสผ่าน
            </router-link>
            <button class="btn btn-mid-transparent settings-btn">
                การตั้งค่า
            </button>

            <button class="btn btn-outline-danger settings-btn">ลงชื่อออก</button>
        </div>
        <div class="flex-grow-1">
            <router-view></router-view>
        </div>
    </div> 
</template>
<style scoped>
.settings-btn {
    margin-bottom: 5px;
    text-align: left;
}
</style>