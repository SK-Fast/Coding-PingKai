<template>
    <div class="container">
        <div class="row col-2 col-md-3">
            <h2 class="ms-0 mb-2">การตั้งค่า</h2>   
            <button class="btn btn-primary settings-btn" @click="() =>this.$router.push('/profile')">
                ข้อมูลผู้ใช้
            </button>
            <button class="btn btn-mid-transparent settings-btn" @click="() =>this.$router.push('/password')">
               รหัสผ่าน
            </button>
            <button class="btn btn-mid-transparent settings-btn" @click="() =>this.$router.push('/Pog')">
                การตั้งค่า
            </button>

            <button class="btn btn-outline-danger settings-btn" @click="">ลงชื่อออก</button>
        </div>
    </div> 
</template>
<style scoped>
.settings-btn {
    margin-bottom: 5px;
    text-align: left;
}
</style>