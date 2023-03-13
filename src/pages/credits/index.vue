<template>
    <div class="bg-primary w-100 text-center text-white p-5 mb-4">
        <h1>ผู้จัดทำ</h1>
        <p>ทีมผู้พัฒนาโค้ดดิ้ง ปิ้งไก่ & อาจารย์ที่ปรึกษา & โอเพ่นซอร์ส</p>
    </div>

    <div class="container d-flex">
        <div class="col-md-1 d-md-block d-none">
            <img src="@/assets/credits/cat-side.png" class="img-fluid" style="position:relative;top: 400px">
        </div>

        <div class="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
            <h3 class="mb-1">ทีมผู้พัฒนาโค้ดดิ้ง ปิ้งไก่</h3>

            <div class="row justify-content-center p-5">
                <div class="col-md-4 text-center mb-5 mb-md-0">
                    <img src="@/assets/credits/mewmew.png" class="img-fluid rounded-circle col-md-6">
                    <h4 class="mt-3">พชร เจริญศรี <span class="text-muted h6">(มิวมิว)</span></h4>
                    <div class="column">
                        <h4 class="badge bg-danger">งานเอกสาร</h4>
                    </div>


                    <div class="column justify-content-center ">
                        <a href="https://www.instagram.com/m2w.k8ng/" target="_blank"><vue-feather type="instagram" size="20px"></vue-feather></a>
                    </div>
                </div>

                <div class="col-md-4 text-center mb-5 mb-md-0">
                    <img src="@/assets/credits/pong.png" class="img-fluid rounded-circle col-md-6">
                    <h4 class="mt-3">ธรรมจิตร กล่ำจันทร์ <span class="text-muted h6">(ปกป้อง)</span></h4>
                    <div class="column">
                        <h4 class="badge bg-primary">หัวหน้าทีม</h4>
                        <h4 class="badge bg-warning ms-1">โปรแกรมแอป</h4>
                    </div>

                    <p class="mb-1">"น่ากิน"</p>

                    <div class="column justify-content-center">
                        <a href="https://devpixels.xyz/" class="me-2" target="_blank"><vue-feather type="globe" size="20px"></vue-feather></a>
                        <a href="https://www.youtube.com/@devpx" class="me-2" target="_blank"><vue-feather type="youtube" size="20px"></vue-feather></a>
                        <a href="https://www.instagram.com/devpoxl/" target="_blank"><vue-feather type="instagram" size="20px"></vue-feather></a>
                    </div>
                </div>

                <div class="col-md-4 text-center">
                    <img src="@/assets/credits/frize.png" class="img-fluid rounded-circle col-md-6">
                    <h4 class="mt-3">นิพพิชฌน์ สำราญรณศักดิ์</h4>
                    <h6 class="text-muted h6">(เฟรียส)</h6>
                    <div class="column">
                        <h4 class="badge bg-success">กราฟฟิก</h4>
                    </div>

                    <p class="mb-1">"ว่าไง ใครแคร์"</p>

                    <div class="column justify-content-center">
                        <a href="https://www.youtube.com/channel/UC7uTOVn3-I1HHNOaSj-tbwg" class="me-2" target="_blank"><vue-feather type="youtube" size="20px"></vue-feather></a>
                        <a href="https://www.instagram.com/dukky_xd/" target="_blank"><vue-feather type="instagram" size="20px"></vue-feather></a>
                    </div>
                </div>

            </div>

            <hr class="col-3" />

            <h3 class="m-1">อาจารย์ที่ปรึกษา</h3>

            <div class="p-5 d-flex justify-content-center">
                <div class="col-md-5 text-center">
                    <img src="@/assets/credits/krupat.png" class="img-fluid rounded-circle col-md-6">
                    <h4 class="mt-3">นางสาวธัญญลักษณ์ เหมัง</h4>
                
                    <h6 class="text-muted h6">(ครูแพท)</h6>
                </div>
            </div>

            <hr class="col-3" />

            <h3 class="m-1 mb-1">โอเพ่นซอร์ส</h3>

            <div class="row justify-content-center p-md-3 p-5">
                <div class="card shadow col-md-1 m-2">
                    <div class="card-body d-flex justify-contents-center align-items-center">
                        <img src="@/assets/credits/vuejs.svg" class="img-fluid">
                    </div>
                </div>

                <div class="card shadow col-md-2 m-2">
                    <div class="card-body">
                        <a href="https://developers.google.com/blockly" target="_blank">
                            <img src="@/assets/credits/builton_blockly.svg" class="img-fluid">
                        </a>
                    </div>
                </div>

                <div class="card shadow col-md-2 m-2">
                    <div class="card-body">
                        <a href="https://firebase.google.com/" target="_blank">
                            <img src="@/assets/credits/builtwith_firebase.svg" class="img-fluid">
                        </a>
                    </div>
                </div>

                <div class="card shadow col-md-1 m-2">
                    <div class="card-body d-flex justify-contents-center align-items-center">
                        <a href="https://getbootstrap.com/" target="_blank">
                            <img src="@/assets/credits/Bootstrap_logo.svg" class="img-fluid">
                        </a>
                    </div>
                </div>
            </div>

            <div class="column align-items-center col-md-6 p-md-3 p-5">
                <div class="card w-100 mb-2" v-for="d in dependenciesData">
                    <div class="card-body d-flex flex-row">
                        <a class="m-0" :href="`https://www.npmjs.com/package/${d.title}`" target="_blank">{{ d.title }}</a>
                        <div class="flex-grow-1"></div>
                        <code>{{ d.ver }}</code>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-md-1 d-md-block d-none">
            <img src="@/assets/credits/penguin_side.png" class="img-fluid" style="position:relative;top: 50px">
            <img src="@/assets/credits/trash_side.png" class="img-fluid" style="position:relative;top: 800px">
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const dependenciesData = ref([])

onMounted(async () => {
    const req = await fetch('https://raw.githubusercontent.com/SK-Fast/Coding-PingKai/main/package.json')
    const res = await req.json()

    for (const [key, val] of Object.entries(res.dependencies)) {
        dependenciesData.value.push({
            title: key,
            ver: val
        })
    }
})

</script>