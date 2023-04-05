<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-center align-items-center flex-md-row flex-column w-100">
            <div class="col-md-6">
                <div class="d-md-block d-flex justify-content-center">
                    <img src="@/assets/logo/Logo_Text.png" class="col-md-3 img-fluid" height="60" /><br />
                </div>

                <div class="d-md-block d-flex justify-content-center">
                    <img src="@/assets/404.svg" class="mt-3 col-md-5 img-fluid float-md-center" height="120" />
                </div>
                
                <p class="mt-5">ไม่พบหน้าเว็ปหรือข้อมูลนี้ <strong>คุณอาจจะพิมพ์ URL ไม่ถูกต้อง</strong></p>

                <div class="mt-5 d-flex flex-column">
                    <a><vue-feather type="arrow-left" size="16px" /> กลับไปหน้าที่แล้ว</a>
                    <router-link to="/"><vue-feather type="home" size="16px" /> หน้าหลัก</router-link>
                </div>
            </div>
            <div class="col-md-5">
                <img src="@/assets/chickens/chick_find.png" class="mt-3 float-end img-fluid" height="120" />
            </div>
        </div>
    </div>
</template>