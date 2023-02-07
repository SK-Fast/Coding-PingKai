<template>
    <div class="editor-top flex-column flex-md-row">
        <div class="d-flex align-items-center p-2 ms-3">
            <a @click="requestEnd" href="#"><vue-feather type="x" class="me-2" stroke="#606060" /></a>

            <img src="@/assets/logo/logobeta.png" class="me-2" height="35">

            <div class="flex-grow-1 d-md-none d-block"></div>
        </div>
        <div class="flex-grow-1 d-flex justify-content-center d-md-block d-none">
            <div class="text-center">
                <h5 class="m-0">สอนเดิน</h5>
                <p class="text-muted m-0">ไก่น้อย ผจญภัย</p>
            </div>
        </div>
        <div class="col-md-2 d-md-block d-none">
            <div class="rounded bg-light-400 p-1 editor-mode float-end me-2">
                <button class="btn btn-primary">Block</button>
                <!--
                <button class="btn btn-transparent">Python</button>
                -->
            </div>
        </div>
    </div>
    <div class="d-flex flex-md-row flex-column editor-middle">
        <div class="col-md-3 p-4 pt-0">
            <div class="runResult">
            </div>
            <div class="d-flex justify-content-center mt-2">
                <div class="btn-group tool-btns">
                    <div class="btn btn-light-400">
                        <vue-feather type="skip-back" stroke="#606060" />
                    </div>
                    <div class="btn btn-success">
                        <vue-feather type="play" class="me-1" stroke="#FFF" />
                    </div>
                    <div class="btn btn-danger">
                        <vue-feather type="octagon" stroke="#FFF" />
                    </div>
                    <div class="btn btn-light-400">
                        <vue-feather type="skip-forward" stroke="#606060" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-grow-1 d-flex flex-column editor-container">
            <div class="flex-grow-1">
                <BlockEditor ref="bEditor" :options="blocklyConfig">
                </BlockEditor>
            </div>
            <div
                class="tutorial-view justify-content-center align-items-center p-3 bg-light-300 border-light-400 border-top">
                <div class="d-flex flex-column flex-md-row">
                    <div class="col-md-1 text-center">
                        <img src="/chick.png" class="chick-frame mb-2">
                        <h5>ไก่น้อย</h5>
                    </div>
                    <div class="ms-3 flex-grow-1">
                        <div class="card bg-light-200 p-2 h-100 w-100">
                            <div class="card-body d-flex flex-column">
                                <div class="flex-grow-1">
                                    <p>hi</p>
                                </div>

                                <div>
                                    <div>
                                        <div class="float-end">
                                            <button class="btn btn-secondary me-2">ขั้นตอนที่แล้ว</button>
                                            <button class="btn btn-primary">ไปต่อ</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BlockEditor from './editors/block.vue'
import { onMounted, ref, inject } from 'vue'

const toolbox = {
    kind: "flyoutToolbox",
    contents: []
}

const router = inject("router")

const bEditor = ref(null)

const blocklyConfig = ref({
    toolbox: toolbox,
    media: "/blockly_editor/",
    grid: {
        colour: "#00000005",
        length: 50,
        spacing: 20
    },
    zoom: {
        controls: true,
        wheel: true
    },
    trashcan: true
})

onMounted(async () => {
    const blockset = await import("@/blocksets/w1_1.js")

    blockset.init()
    toolbox.contents = blockset.blocks

    console.log("moutin")
})

const requestEnd = async () => {
    const res = await Swal.fire({
        title: 'ยืนยันการออกจากบทเรียน',
        text: "คุณต้องการที่จะออกจากบทเรียนหรือไม่?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ออก',
        cancelButtonText: 'ยกเลิก',
    })

    if (res.isConfirmed) {
        router.push('/learn')
    }
}

</script>

<style scoped>
.runResult {
    width: 100%;
    height: 274px;
    background-color: black;
    border-radius: 10px;
}

.tool-btns {
    overflow: hidden;
    border-radius: 10px;
}

.editor-container {
    background-color: white;
}

.editor-top {
    display: flex;
    height: 60px;
    align-items: center;

    animation: editorTopPop 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@media only screen and (max-width: 600px) {
    .editor-top {
        height: auto;
    }
}

@keyframes editorTopPop {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
}

.editor-middle {
    height: calc(100vh - 50px);
}

.editor-mode {
    display: inline-block;
}

.tutorial-view {
    height: 200px;
}

.chick-frame {
    border-radius: 50px;
    width: 100px;
    height: 100px;
    background: #DFDFDF;
}

.editor-top.loading {
    background: linear-gradient(90deg, #F3F3F3 0%, #FFD5BF 34.05%, #F3F3F3 61.46%, #F3F3F3 100%);
    animation: loadingGradient 2s linear;
    animation-iteration-count: infinite;
    background-size: 400% 100%;

    background-repeat: repeat-y;
}


@keyframes loadingGradient {
	0% {
		background-position: -100% 0%;
	}
    100% {
		background-position: 100% 0%;
	}
}

</style>
