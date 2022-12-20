import Blockly from 'blockly';

export const blocks = [
    {
        "kind": "category",
        "name": "Control",
        "contents": [
            {
                "kind": "block",
                "type": "controls_if"
            },
        ]
    },
    {
        "kind": "category",
        "name": "Logic",
        "contents": [
            {
                "kind": "block",
                "type": "logic_compare"
            },
            {
                "kind": "block",
                "type": "logic_operation"
            },
            {
                "kind": "block",
                "type": "logic_boolean"
            }
        ]
    }
]

export const init = () => {
    Blockly.defineBlocksWithJsonArray([{
        "type": "test_block",
        "message0": 'test block',
        "nextStatement": "Action",
        "previousStatement": "Action",
        "colour": 160,
        "tooltip": "Test Tooltip.",
        "helpUrl": "devpixels.xyz?d=the_reward"
    }]);
}