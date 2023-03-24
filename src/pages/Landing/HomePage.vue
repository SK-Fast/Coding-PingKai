<script setup>
import { ref, inject, onMounted } from "vue";

const store = inject("store")
const router = inject("router")

onMounted(() => {
  if (store.state.user) {
    router.push("/dashboard")
  }
})

const openLogin = () => {
  console.log("login entry landing")

  store.state.fireLoginModal()
}

</script>

<template>
  <div class="landing-banner-container w-100">
    <div class="bg-primary w-100 h-100 landing-banner pt-5">
      <div class="container text-white">
        <div class="d-flex flex-md-row flex-column justify-content-center">
          <div class="col-md-8">
            <img src="@/assets/logo/logo-white.svg" height="100">

            <div class="ms-2">
              <h4>เรียนอัลกอริทึม สำหรับทุกคน!</h4>
              <div class="d-flex justify-content-center justify-content-md-start col-md-3 mt-4">
                <button @click="openLogin" class="btn btn-light-200">มาเริ่มกันเลย!<vue-feather class="ms-2" type="arrow-right"
                    stroke="#000" size="16px" /></button>
              </div>
            </div>
          </div>

          <div class="col-md-2">
            <img src="@/assets/landing/cat.png" height="250">
          </div>
        </div>
      </div>
    </div>
    <div class="landing-waves mb-5"></div>

    <div class="container">
      <div class="row text-md-start text-center">
        <div class="col-md-10">
          <h3>เรียน Algorithm แบบง่าย</h3>
          <p>มีบทเรียน สอน Algorithm หลายรูปแบบ</p>
        </div>
        <div class="col-md-2">
          <img src="@/assets/landing/landing_1.png">
        </div>
      </div>
      <div class="row text-md-end text-center mt-5">
        <div class="col-md-2">
          <img src="@/assets/landing/landing_2.png">
        </div>
        <div class="col-md-10">
          <h3>เป็นขั้นตอน</h3>
          <p>สอนแบบเป็นขั้นตอน Step-By-Step</p>
        </div>
      </div>
    </div>

    <div class="mt-5 p-3 d-flex justify-content-center">
      <div class="col-md-5 bg-primary p-5 text-white text-center get-started-card">
        <h3>มาเริ่มกันเลย!</h3>
        <p>มารวมกันเรียนอัลกอริทึมใน โค้ดดิ้ง ปิ้งไก่!</p>
        <button @click="openLogin" class="btn btn-light-200">มาเริ่มกันเลย!<vue-feather type="arrow-right" stroke="#000" size="16px" class="ms-2" /></button>
        </div>
    </div>

  </div>
</template>

<style scoped>
.landing-banner-container {
  min-height: 350px;
  margin-bottom: 110px;
}

.get-started-card {
  border-radius: 20px;
}

.landing-waves {
  width: 100%;
  height: 65px;
  position: relative;
  bottom: 2px;
  background-image: url(@/assets/landing/landing-wave.svg);
  background-size: contain;
  background-repeat: repeat-x;

  animation: waveMovin 50s linear 0s infinite;
}

@keyframes waveMovin {
  0% {
    background-position: 100% 0%;
  }

  50% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 100% 0%;
  }
}

.landing-banner {
  display: flex;
  align-items: center;
}
</style>