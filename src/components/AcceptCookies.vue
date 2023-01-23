<template>
    <div class="ac-card p-2 col-md-4" v-if="cookieAccepted == false">
        <div class="d-flex flex-md-row flex-column">
            <div class="col-md-3">
                <img src="@/assets/cookie.png" class="img-fluid" width="200" height="200">
            </div>
            <div class="col-md-9 p-3">
                <h4>ยอมรับคุกกี้และนโยบายความเป็นส่วนตัว</h4>
                <blockquote class="text-muted">เว็บไซต์นี้มีการใช้งานคุกกี้เพื่อให้ท่านสามารถใช้บริการได้อย่างต่อเนื่องและอำนวยความสะดวกในการใช้งานเว็บไซต์ รวมถึงช่วยให้เราปรับปรุงการนำเสนอเนื้อหาตรงตามความต้องการของท่าน</blockquote>
                <div class="d-flex justify-content-end col-sm-6 col-md-8">
                    <button class="btn btn-secondary me-1">เรียนรู้เพิ่มเติม</button>
                    <button class="btn btn-primary" @click="acceptCookies()">ยินยอม</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const cookieAccepted = ref(false)
    
    const acceptCookies = async() => {
        window.localStorage.setItem("cookie_accepted", true)
        cookieAccepted.value = true
    }
</script>

<style scoped>
.ac-card {
    background: #FFFFFF;    
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 30px 30px 5px 30px;
}
</style>