import Blockly from 'blockly';
import langGenerator from "blockly/javascript"

export const generate = (w) => {
    return langGenerator.workspaceToCode(w)
}

export const init = () => {
    Blockly.defineBlocksWithJsonArray([
        {
            "type": "turn_left",
            "message0": '%1 ไปทางซ้าย',
            "nextStatement": "Action",
            "previousStatement": "Action",
            "colour": 20,
            "args0": [
                {
                  "type": "field_image",
                  "src": "/blockly_editor/rotate-ccw.png",
                  "width": 15,
                  "height": 15
                },
            ]
        },
        {
            "type": "turn_right",
            "message0": '%1 ไปทางขวา',
            "nextStatement": "Action",
            "previousStatement": "Action",
            "colour": 25,
            "args0": [
                {
                  "type": "field_image",
                  "src": "/blockly_editor/rotate-cw.png",
                  "width": 15,
                  "height": 15
                },
            ]
        },
        {
            "type": "go_forward",
            "message0": '%1 ขึ้นไปข้างบน',
            "nextStatement": "Action",
            "previousStatement": "Action",
            "tooltip": "ให้ไก่เดินขึ้นไปข้างบน",
            "colour": 30,
            "args0": [
                {
                  "type": "field_image",
                  "src": "/blockly_editor/arrow-up-circle.png",
                  "width": 15,
                  "height": 15
                },
            ]
        },
        {
            "type": "go_back",
            "message0": '%1 ลงไปข้างล่าง',
            "nextStatement": "Action",
            "previousStatement": "Action",
            "tooltip": "ให้ไก่เดินลงไปข้างล่าง",
            "colour": 35,
            "args0": [
                {
                  "type": "field_image",
                  "src": "/blockly_editor/arrow-down-circle.png",
                  "width": 15,
                  "height": 15
                },
            ]
        },
    ]);

    langGenerator["turn_left"] = (block) => {
        return "goLeft()\n"
    }

    langGenerator["turn_right"] = (block) => {
        return "goRight()\n"
    }
    
    langGenerator["go_forward"] = (block) => {
        return "goForward()\n"
    }
    
    langGenerator["go_back"] = (block) => {
        return "goBack()\n"
    }
}