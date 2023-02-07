<template>
    <div class="w-100 h-100">
        <div ref="blocklyDiv" class="blocklyDiv">
        </div>
    </div>
</template>

<style>
@import url(@/assets/css/blockly.css);

.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}

.injectionDiv {
    height: 100%;
}

.blocklyFlyout {
    border: 1px var(--bs-light-400);
}
</style>

<script setup>
import { onMounted, ref, toRefs } from 'vue'
import Blockly from 'blockly';

const blocklyToolbox = ref(null)
const blocklyDiv = ref(null)
const props = defineProps({
    options: {
        type: Object
    },
})

const initBlockly = () => {
    const { options } = toRefs(props)

    console.log(options)

    console.log("block moutin")

    console.log(options)

    console.log(props.options)

    Blockly.HSV_SATURATION = 0.8
    Blockly.HSV_VALUE = 1

    Blockly.inject(blocklyDiv.value, props.options)
}

defineExpose({
    initBlockly
})

onMounted(() => {
  
})
</script>