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
import {pythonGenerator as langGenerator} from "blockly/python"

const blocklyToolbox = ref(null)
const blocklyDiv = ref(null)
const props = defineProps({
    options: {
        type: Object
    },
})

let workspace;

const saveCode = () => {
    const serializer = new Blockly.serialization.blocks.BlockSerializer();
    const state = serializer.save(workspace);

    return state
}

function getBlocksByType(type) {
    let allBlocks = workspace.getAllBlocks()
  let blocks = [];
  for (let b of allBlocks) {
    if (b.type == type) {
      blocks.push(b);
    }
  }
  return blocks;
}

const loadCode = (state) => {
    const serializer = new Blockly.serialization.blocks.BlockSerializer();
    serializer.load(state, workspace);

    const onStart = getBlocksByType("on_start")

    for (const b of onStart) {
        b.setDeletable(false)
        b.setMovable(false)
    }
}

const initBlockly = (bJSON) => {
    bJSON = [{
        "type": "on_start",
        "message0": "%1 เมื่อเริ่ม",
        "args0": [
            {
                "type": "field_image",
                "src": "/blockly_editor/play-circle.png",
                "width": 15,
                "height": 15
            },
        ],
        "message1": "%1",
        "args1": [
            { "type": "input_statement", "name": "DO" }
        ],
        "tooltip": "รันเมื่อปุ่มเริ่มถูกกด",
        "deletable": false,
        "movable": false,
        "colour": 30,
    }, ...bJSON]

    langGenerator["on_start"] = (block) => {
        let doLine = langGenerator.statementToCode(block, 'DO') || '\tpass'

        return `"""\nasync def main():\n${doLine}\nmain()\n"""`
    }

    Blockly.defineBlocksWithJsonArray(bJSON);

    const { options } = toRefs(props)

    console.log(options)

    console.log("block moutin")

    console.log(options)

    console.log(props.options)

    workspace = Blockly.inject(blocklyDiv.value, props.options)

    const onStartBlock = workspace.newBlock("on_start");
    onStartBlock.setDeletable(false)
    onStartBlock.setMovable(false)
    onStartBlock.initSvg();
    onStartBlock.render();

    return [workspace, onStartBlock]
}

defineExpose({
    initBlockly,
    saveCode,
    loadCode
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