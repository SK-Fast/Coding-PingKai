<script setup>
import { ref } from "vue";
import LoginModal from "@/components/LoginModal.vue"

const loginModal = ref(null)

const openLogin = () => {
  console.log("login entry landing")

  LoginModal.openL()
}

</script>

<template>

  <div class="landing-banner-container w-100">
    <div class="bg-primary w-100 h-100 landing-banner">
      <div class="container text-white">
        <div class="d-flex flex-md-row flex-column">
          <div class="col-md-8">
            <img src="@/assets/logo/logo-white.svg" height="100">
            <div class="ms-2">
              <h4>เรียนอัลกอริทึม สำหรับทุกคน!</h4>
              <div class="col col-md-2 mt-4">
                <button @click="openLogin" class="btn btn-light-200">มาเริ่มกันเลย!<vue-feather type="arrow-right"
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
    <div class="landing-waves"></div>
  </div>
</template>

<style scoped>
.landing-banner-container {
  min-height: 350px;
  margin-bottom: 110px;
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