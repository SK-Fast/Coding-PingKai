<template>
    <hr />
    <div class="row justify-content-center p-3">
        <div class="col-md-3">
            <img src="@/assets/logo/logoblack.png" alt="Coding PingKai" height="80">
            <div class="d-flex flex-column">
                <a href="#" @click="goToTop()"><vue-feather type="chevrons-up" size="16" stroke="#FF7733"></vue-feather> เลื่อนขี้น</a>
                <a href="https://rayongwit.ac.th" target="_none"><vue-feather type="link" size="16" stroke="#FF7733"></vue-feather> rayongwit.ac.th</a>
                <a href="https://devpixels.xyz" target="_none"><vue-feather type="link" size="16" stroke="#FF7733"></vue-feather> devpixels.xyz</a>
            </div>
        </div>
        <div class="col-md-3 d-flex justify-content-end">
            <img src="@/assets/qrs/ShareQR.svg" alt="Coding PingKai" height="180">
        </div>
    </div>
</template>

<script setup>

const goToTop = () => {
    window.scrollTo(0, 0)
}
</script>