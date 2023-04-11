<script setup>
import { ref, inject, onMounted, onUnmounted } from "vue";
import isMobile from "is-mobile";

const store = inject("store")
const router = inject("router")
const homepageContainer = ref()
const rotY = ref(20)

const onScroll = (event) => {
  let scrollY = window.scrollY;

  rotY.value = ((scrollY / 40) * -1) + 20
}

onMounted(async () => {
  if (store.state.user) {
    router.push("/dashboard")
  }

  document.addEventListener("scroll", onScroll)

  let options = {
    root: document.body,
    rootMargin: "0px",
    threshold: 0.1,
  }


  let callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('intersecting')
      } else {
        entry.target.classList.remove('intersecting')
      }
    });
  };

  let observer = new IntersectionObserver(callback, {
    rootMargin: '20px'
  });

  document.querySelectorAll("#hC > *").forEach((target) => {
    observer.observe(target);

    if (isMobile()) {
      target.classList.add('intersecting')
    }
  });
})

onUnmounted(() => {
  document.removeEventListener("scroll", onScroll)
})

window.addEventListener("beforeinstallprompt", (beforeInstallPromptEvent) => {
  bFP.preventDefault(); // Prevents immediate prompt display
});

const openLogin = () => {
  console.log("login entry landing")

  store.state.fireLoginModal()
}

</script>

<template>
  <div class="landing-banner-container w-100">
    <div class="bg-primary w-100 h-100 landing-banner pt-5 mb-5">
      <div class="container text-white">
        <div class="d-flex flex-md-row flex-column justify-content-center">
          <div class="col-md-8">
            <img src="@/assets/logo/logo-white.svg" height="100">

            <div class="ms-2">
              <h4>{{ $t("landing.slogan") }}</h4>
              <div class="d-flex justify-content-center justify-content-md-start col-md-3 mt-4">
                <button @click="openLogin" class="btn btn-light-200">{{ $t("landing.letsago") }}<vue-feather class="ms-2"
                    type="arrow-right" stroke="#000" size="16px" /></button>
              </div>
            </div>
          </div>

          <div class="col-md-2">
            <img src="@/assets/landing/chick.png" height="250" style="position: relative;top: 65px;">
          </div>
        </div>
      </div>
    </div>

    <div ref="homepageContainer" id="hC">

      <div class="d-flex flex-column align-items-center mb-5" style="perspective: 40em">
        <div class="container text-center">
          <h3>แพลตฟอร์มอัลกอริทึม สำหรับทุกคน!</h3>
          <p>โค้ดดิ้ง ปิ้งไก่ เป็นแพลตฟอร์มการเรียนอัลกอริทึมสำหรับทุกคนที่สนใจ</p>
        </div>

        <!--<img class="col-10" src="@/assets/landing/landing_1.png">-->
        <img class="col-7 img-screen" src="@/assets/landing/landing_e.png" :style="`transform: rotateX(${rotY}deg)`">
      </div>

      <div class="d-flex flex-column align-items-center mt-5">
        <div class="container text-center mb-3">
          <h3>เรียนรู้อย่างมีขั้นตอน</h3>
          <p>โค้ดดิ้ง ปิ้งไก่มีบทเรียนที่ออกแบบมาให้ใช้ความรู้จากด่านที่แล้ว เพื่อช่วยให้คุณเรียนได้อย่างมีประสิทธิภาพ</p>
        </div>

        <img class="img-fluid" src="@/assets/landing/landing_2.png">
      </div>

      <div class="d-flex flex-column align-items-center mt-5 section-3">
        <div class="container text-center mb-3">
          <h3>ทุกที่ ทุกเวลา</h3>
          <p>โค้ดดิ้ง ปิ้งไก่สามารถใช้ได้บนคอมพิวเตอร์ โทรศัพท์ ทุกที่ ทุกเวลา</p>
        </div>

        <div class="d-flex flex-md-row flex-column">
          <div class="me-md-5 mb-3 d-flex justify-content-center p-2 device-1">
            <img src="@/assets/landing/desktop.png" height="300" class="img-fluid">
          </div>

          <div class="me-md-5 mb-3 d-flex justify-content-center p-2 device-2">
            <img src="@/assets/landing/android.png" height="300" class="img-fluid">
          </div>

          <div class="mb-3 d-flex justify-content-center p-2 device-3">
            <img src="@/assets/landing/ios.png" height="300" class="img-fluid">
          </div>
        </div>
      </div>

      <div class="mt-5 p-3 d-flex justify-content-center">
        <div class="col-md-5 bg-primary p-5 text-white text-center get-started-card">
          <h3>{{ $t("landing.letsago") }}</h3>
          <p>{{ $t("landing.cardtxt") }}</p>
          <button @click="openLogin" class="btn btn-light-200">{{ $t("landing.letsago") }}<vue-feather type="arrow-right"
              stroke="#000" size="16px" class="ms-2" /></button>
        </div>
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

.img-screen {
  border-radius: 10px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);

  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);;
}

.section-3.intersecting .device-1 {
  animation: devicePopup 1s cubic-bezier(0.16, 1, 0.3, 1);;
  animation-delay: 0s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.section-3.intersecting .device-2 {
  animation: devicePopup 1s cubic-bezier(0.16, 1, 0.3, 1);;
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.section-3.intersecting .device-3 {
  animation: devicePopup 1s cubic-bezier(0.16, 1, 0.3, 1);;
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
}

@keyframes devicePopup {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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