import Blockly from 'blockly';
import langGenerator from "blockly/python"

export const generate = (w) => {
    return langGenerator.workspaceToCode(w)
}

export const init = () => {
    Blockly.defineBlocksWithJsonArray([
        {
            "type": "go_left",
            "message0": '%1 ไปทางซ้าย',
            "nextStatement": "Action",
            "previousStatement": "Action",
            "colour": 20,
            "args0": [
                {
                  "type": "field_image",
                  "src": "/blockly_editor/arrow-left-circle.png",
                  "width": 15,
                  "height": 15
                },
            ]
        },
        {
            "type": "go_right",
            "message0": '%1 ไปทางขวา',
            "nextStatement": "Action",
            "previousStatement": "Action",
            "colour": 25,
            "args0": [
                {
                  "type": "field_image",
                  "src": "/blockly_editor/arrow-right-circle.png",
                  "width": 15,
                  "height": 15
                },
            ]
        },
        {
            "type": "go_up",
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
            "type": "go_down",
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

    langGenerator["go_left"] = (block) => {
        return "go_left()\n"
    }

    langGenerator["go_right"] = (block) => {
        return "go_right()\n"
    }
    
    langGenerator["go_up"] = (block) => {
        return "go_up()\n"
    }
    
    langGenerator["go_down"] = (block) => {
        return "go_down()\n"
    }
}