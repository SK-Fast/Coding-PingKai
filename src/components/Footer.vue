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
                        <router-link target="_none" to="/legal/term"><vue-feather type="file-text" size="16"
                                stroke="#FF7733"></vue-feather>
                            ข้อตกลงในการใช้ซอฟต์แวร์</router-link>

                        <a class="text-danger" @click="requestIssue" :href="issueURL" target="_none"><vue-feather
                                type="alert-triangle" size="16" stroke="#F23051"></vue-feather>
                            รายงานปัญหาแอป</a>

                        <a class="text-black" href="https://github.com/SK-Fast/Coding-PingKai" target="_none"><vue-feather
                                type="github" size="16" stroke="#212529"></vue-feather>
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
import { ref, onMounted } from "vue"

const goToTop = () => {
    window.scrollTo(0, 0)
}

const issueURL = ref("")

onMounted(async () => {
    const { detect } = await import("detect-browser")

    const browser = detect()

    let bodyData = `**มีปัญหาอะไรบ้าง**
คำอธิบายที่ชัดเจนและรัดกุมว่าจุดบกพร่องคืออะไร

**ทำอย่างไรถึงจะเกิดปัญหานี้**
1. ...
2. ...

**สิ่งที่คาดว่าจะเกิดขึ้น**
คำอธิบายที่ชัดเจนและรัดกุมเกี่ยวกับสิ่งที่คุณคาดว่าจะเกิดขึ้น

**ภาพหน้าจอ**
หากทำได้ ให้เพิ่มภาพหน้าจอเพื่อช่วยอธิบายปัญหาของคุณ

**ข้อมูลเพิ่มเติม**
เพิ่มข้อมูลอื่น ๆ เกี่ยวกับปัญหาที่นี่

**ข้อมูลระบบ**
\`\`\`
Application Version: ${__APP_VERSION__}
PWA Installed: ${window.matchMedia('(display-mode: standalone)').matches}
Operating System: ${browser.os}
Browser: ${browser.name} ${browser.version}
Agent Type: ${browser.type}
\`\`\`
`

    let githubURL = new URL("/SK-Fast/Coding-PingKai/issues/new?assignees=&labels=&title=รายงานปัญหาการใช้งาน", "https://github.com");

    githubURL.searchParams.append('body', bodyData);

    issueURL.value = githubURL.toString()
})
</script>