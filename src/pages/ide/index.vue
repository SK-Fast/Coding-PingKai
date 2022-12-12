<template>
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

const toolbox = ref({
    "kind": "flyoutToolbox",
    "contents": [
        {
            "kind": "block",
            "type": "controls_if"
        },
        {
            "kind": "block",
            "type": "controls_whileUntil"
        }
    ]
})

const blocklyConfig = ref({
    toolbox: toolbox,
    media: "./blockly_editor/"
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

.editor-middle {
    height: 100vh;
}
</style>

<style>
@import url(@/assets/css/blockly.css)
</style>