<template>
    <div class="footer">
        <hr />
        <div class="row justify-content-center p-3">
            <div class="col-md-3">
                <div class="d-flex justify-content-md-start justify-content-center mb-md-0 mb-2">
                    <img src="@/assets/logo/logoblack.png" alt="Coding PingKai" height="80">
                </div>
                <div class="d-flex flex-column flex-md-row text-md-start text-center">
                    <div class="d-flex flex-column">
                        <a href="#" @click="goToTop()"><vue-feather type="chevrons-up" size="16"
                                stroke="#FF7733"></vue-feather> เลื่อนขี้น</a>
                        <a href="https://rayongwit.ac.th" target="_none"><vue-feather type="link" size="16"
                                stroke="#FF7733"></vue-feather> rayongwit.ac.th</a>
                        <a href="https://devpixels.xyz" target="_none"><vue-feather type="link" size="16"
                                stroke="#FF7733"></vue-feather> devpixels.xyz</a>
                    </div>
                    <div class="d-flex flex-column ms-md-5">
                        <router-link
                            target="_none" to="/legal/term"><vue-feather type="file-text" size="16" stroke="#FF7733"></vue-feather>
                            ข้อตกลงในการใช้ซอฟต์แวร์</router-link>

                        <a class="text-danger" href="https://github.com/SK-Fast/Coding-PingKai/issues/new?assignees=&labels=&template=%E0%B8%A3%E0%B8%B2%E0%B8%A2%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2.md&title="
                            target="_none"><vue-feather type="alert-triangle" size="16" stroke="#F23051"></vue-feather>
                            รายงานปัญหาแอป</a>
                        
                        <a class="text-black" href="https://github.com/SK-Fast/Coding-PingKai"
                            target="_none"><vue-feather type="github" size="16" stroke="#212529"></vue-feather>
                            Github</a>
                    </div>
                </div>
            </div>
            <div class="col-md-3 d-flex justify-content-md-end justify-content-center mt-md-0 mt-3">
                <img src="@/assets/qrs/ShareQR.svg" alt="Coding PingKai" height="180">
            </div>
        </div>
    </div>
</template>

<script setup>

const goToTop = () => {
    window.scrollTo(0, 0)
}
</script>