export const blocks = [
    {
        "kind": "block",
        "type": "controls_if"
    },
    {
        "kind": "block",
        "type": "controls_whileUntil"
    },
    {
        "kind": "block",
        "type": "test_block"
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