import Blockly from 'blockly';

export const blocks = [
    {
        "kind": "block",
        "type": "turn_left"
    },
    {
        "kind": "block",
        "type": "turn_right"
    },
    {
        "kind": "block",
        "type": "go_forward"
    },
    {
        "kind": "block",
        "type": "go_back"
    }
]

export const init = () => {
    Blockly.defineBlocksWithJsonArray([
        {
            "type": "turn_left",
            "message0": '%1 หมุนซ้าย',
            "nextStatement": "Action",
            "previousStatement": "Action",
            "colour": 140,
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
            "message0": '%1 หมุนขวา',
            "nextStatement": "Action",
            "previousStatement": "Action",
            "colour": 150,
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
            "message0": '%1 ไปข้างหน้า',
            "nextStatement": "Action",
            "previousStatement": "Action",
            "colour": 160,
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
            "message0": '%1 ไปข้างหลัง',
            "nextStatement": "Action",
            "previousStatement": "Action",
            "colour": 170,
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
}