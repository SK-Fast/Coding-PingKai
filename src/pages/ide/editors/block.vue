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
import Blockly, { Block } from 'blockly';

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

    const workspace = Blockly.inject(blocklyDiv.value, props.options)

    return workspace
}

defineExpose({
    initBlockly
})

onMounted(() => {
    Blockly.Msg.ADD_COMMENT = "เพิ่มคอมเม้นต์"
    Blockly.Msg.COLLAPSE_ALL = "ยุบบล็อกทั้งหมด"
    Blockly.Msg.COLLAPSE_BLOCK = "ยุบบล็อก"
    Blockly.Msg.EXPAND_ALL = "ขยายบล็อกทั้งหมด"
    Blockly.Msg.EXPAND_BLOCK = "ขยายบล็อก"
    Blockly.Msg.UNDO = "ยกเลิก"
    Blockly.Msg.REDO = "ทําซ้ํา"
    Blockly.Msg.CLEAN_UP = "จัดระเบียบบล็อก"
    Blockly.Msg.DELETE_BLOCK = "ลบบล็อก"
    Blockly.Msg.DELETE_X_BLOCKS = "ลบ %1 บล็อก"
    Blockly.Msg.DUPLICATE_BLOCK = "ทำสำเนา"

    Blockly.HSV_SATURATION = 0.8
    Blockly.HSV_VALUE = 1

    Blockly.SOUND_LIMIT = 2000
})
</script>