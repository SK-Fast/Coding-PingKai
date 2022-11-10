<script>

</script>
<template>
  <div class="landing-banner-container w-100">
    <div class="bg-primary w-100 h-100 landing-banner">
      <div class="container text-white">
        <img src="@/assets/logo/logo-white.svg" height="100">
        <div class="ms-2">
          <h4>Code Like a pro, I use LInuX bTW</h4>
          <div class="col col-2 mt-4">
            <button class="btn btn-light-200">มาเริ่มกันเลย! <vue-feather type="arrow-right" stroke="#000" size="16px" /></button>
            <a class="ms-3 text-white">Login</a>
          </div>
        </div>
      </div>
    </div>
    <div class="landing-waves"></div>
    
  </div>
</template>
<style scoped>
.landing-banner-container {
  height: 350px;
}

.landing-waves {
  width: 100%;
  height: 65px;
  background-image: url(@/assets/landing/landing-wave.svg);
  background-size: contain;
  background-position: center;
}

.landing-banner {
  display: flex;
  align-items: center;
}
</style>