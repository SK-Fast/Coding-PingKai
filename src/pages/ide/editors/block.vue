<template>
    <div class="w-100 h-100">
        <div ref="blocklyDiv" class="blocklyDiv">
        </div>
    </div>
</template>

<style>
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
    }
})

onMounted(() => {
   setTimeout(() => {
    const { options } = toRefs(props)

    console.log(options)

    console.log("block moutin")

    console.log(options)

    console.log(props.options)

    Blockly.defineBlocksWithJsonArray([{
    "type": "test_block",
    "message0": 'test block',
    "nextStatement": "Action",
    "previousStatement": "Action",
    "colour": 160,
    "tooltip": "Test Tooltip.",
    "helpUrl": "devpixels.xyz?d=the_reward"
    }]);

    Blockly.inject(blocklyDiv.value, props.options)
   }, 50);
})
</script>