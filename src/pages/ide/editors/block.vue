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

const { options } = toRefs(props)

onMounted(() => {
    console.log("block moutin")

    console.log(options)

    console.log(props.options)

    Blockly.inject(blocklyDiv.value, props.options)

})
</script>