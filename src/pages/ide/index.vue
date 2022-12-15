<template>
    <div class="editor-top">
        <div class="col-md-2 d-flex p-2 ms-3">
            <vue-feather type="play" class="me-1" stroke="#26BF59" />
            <vue-feather type="octagon" stroke="#F23051" />
        </div>
        <div class="flex-grow-1">
        </div>
        <div class="col-md-2">
            <div class="rounded bg-light-400 p-1 editor-mode float-end me-2">
                <button class="btn btn-primary me-1">Block</button>
                <button class="btn btn-transparent">Python</button>
            </div>
        </div>
    </div>
    <div class="d-flex flex-row editor-middle">
        <div class="col-3 p-4 pt-0">
            <div class="runResult">
            </div>
        </div>
        <div class="flex-grow-1 d-flex flex-row editor-container">
            <BlockEditor :options="blocklyConfig">
            </BlockEditor>
        </div>
    </div>
</template>

<script setup>
import BlockEditor from './editors/block.vue'
import { onMounted, ref } from 'vue'

/*
const blocksetStr = "test.js"

const blockset = await import(blocksetStr)
*/

const toolbox = {
    kind: "flyoutToolbox",
    contents: []
}

const blocklyConfig = ref({
    toolbox: toolbox,
    media: "./blockly_editor/",
    grid: {
        colour: "#00000005",
        length: 50,
        snap: true,
        spacing: 20
    },
    zoom: {
        controls: true,
        wheel: true
    },
    trashcan: true
})

onMounted(() => {
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
    height: 50px;
}

.editor-middle {
    height: 100vh;
}

.editor-mode {
    display: inline-block;
}
</style>

<style>
@import url(@/assets/css/blockly.css)
</style>