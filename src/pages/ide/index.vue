<template>
    <div class="editor-top flex-column flex-md-row">
        <div class="d-flex align-items-center p-2 ms-3">
            <img src="@/assets/logo/logobeta.png" class="me-2" height="35">

            <vue-feather type="play" class="me-1" stroke="#26BF59" />
            <vue-feather type="octagon" stroke="#F23051" />
        </div>
        <div class="flex-grow-1">
        </div>
        <div class="col-md-2">
            <div class="rounded bg-light-400 p-1 editor-mode float-end me-2">
                <button class="btn btn-primary me-1">Block</button>
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
import { onMounted, ref } from 'vue'

const toolbox = {
    kind: "flyoutToolbox",
    contents: []
}

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

</script>

<style scoped>
.runResult {
    width: 100%;
    height: 274px;
    background-color: black;
    border-radius: 10px;
}

.editor-container {
    background-color: white;
}

.editor-top {
    display: flex;
    height: 60px;
    align-items: center;
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
</style>
