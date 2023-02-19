import Blockly from 'blockly';
import langGenerator from "blockly/python"

export const blocklyJSON = [
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
    {
        "type": "until_flag",
        "message0": "%1 ทำซ่ำจนกว่าจะเจอธง",
        "args0": [
            {
                "type": "field_image",
                "src": "/blockly_editor/until-flag.png",
                "width": 15,
                "height": 15
            },
        ],
        "message1": "ทำ %1",
        "args1": [
          {"type": "input_statement", "name": "DO"}
        ],
        "nextStatement": "Action",
        "previousStatement": "Action",
        "tooltip": "รันคำสั่งในบล็อกซ่ำจนกว่าไก่จะเจอธง",
        "colour": 5,
    },
    {
        "type": "is_over_flag",
        "message0": "%1 อยู่ที่ธงหรือไม่",
        "args0": [
            {
                "type": "field_image",
                "src": "/blockly_editor/until-flag.png",
                "width": 15,
                "height": 15
            },
        ],
        "output": "Boolean",
        "tooltip": "เช็กว่าไก่ยืนอยู่บนที่ที่มีธงหรือไม่ผ",
        "colour": 3,
    }
]

export const generate = (w) => {
    return langGenerator.workspaceToCode(w)
}

export const init = () => {
    Blockly.defineBlocksWithJsonArray(blocklyJSON);

    langGenerator["go_left"] = (block) => {
        return `go_left('${block.id}')\n`
    }

    langGenerator["go_right"] = (block) => {
        return `go_right('${block.id}')\n`
    }
    
    langGenerator["go_up"] = (block) => {
        return `go_up('${block.id}')\n`
    }
    
    langGenerator["go_down"] = (block) => {
        return `go_down('${block.id}')\n`
    }
    
    langGenerator["until_flag"] = (block) => {
        let doLine = langGenerator.statementToCode(block, 'DO') || '\tpass'

        return `loopCount = 0\nwhile is_over_flag() == false:\n${doLine}\n\tloopCount = loopCount + 1\n\tif loopCount > 100:\n\t\tbreak\n`
    }

    langGenerator["is_over_flag"] = (block) => {
        //console.log("END: ", langGenerator.valueToCode(block, 'DO') || 'pass')
        
        return [`is_over_flag()`, langGenerator.ORDER_FUNCTION_CALL];
    }
}