import {pythonGenerator as langGenerator} from "blockly/python"
import * as monaco from "monaco-editor"

export const pythonSnippets = [
    {
        label: 'go_forward',
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: 'ให้ไก่เดินไปทางด้านหน้าของไก่',
        insertText: [
          'go_forward()'
        ].join('\n')
    },
    {
        label: 'go_backward',
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: 'ให้ไก่เดินไปทางด้านหลังของไก่',
        insertText: [
          'go_backward()'
        ].join('\n')
    },
    {
        label: 'turn_left',
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: 'ให้ไก่หันไปทางซ้าย',
        insertText: [
          'turn_left()'
        ].join('\n')
    },
    {
        label: 'turn_right',
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: 'ให้ไก่หันไปทางขวา',
        insertText: [
          'turn_right()'
        ].join('\n')
    },
    {
        label: 'is_over_flag',
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: 'ตรวจสอบดูว่าไก่ยืนอยู่บนธงหรือไม่',
        insertText: [
          'is_over_flag()'
        ].join('\n')
    },
    {
        label: 'can_walk_to',
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: 'ตรวจสอบกำแพง, มี forward backward left right',
        insertText: [
          'can_walk_to("left")'
        ].join('\n')
    },
]

export const blocklyJSON = [
    {
        "type": "turn_left",
        "message0": '%1 หันไปทางซ้าย',
        "nextStatement": "Action",
        "previousStatement": "Action",
        "colour": 20,
        "kindoblock": "normalblock",
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
        "message0": '%1 หันไปทางขวา',
        "kindoblock": "normalblock",
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
        "message0": '%1 ไปข้างหน้า',
        "nextStatement": "Action",
        "kindoblock": "normalblock",
        "previousStatement": "Action",
        "tooltip": "ให้ไก่เดินไปทางด้านหน้าของไก่",
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
        "type": "go_backward",
        "kindoblock": "normalblock",
        "message0": '%1 ไปข้างหลัง',
        "nextStatement": "Action",
        "previousStatement": "Action",
        "tooltip": "ให้ไก่เดินไปทางด้านหลังของไก่",
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
        "kindoblock": "loop",
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
            { "type": "input_statement", "name": "DO" }
        ],
        "nextStatement": "Action",
        "previousStatement": "Action",
        "tooltip": "รันคำสั่งในบล็อกซ่ำจนกว่าไก่จะเจอธง",
        "colour": 5,
    },
    {
        "type": "if_can_walk",
        "kindoblock": "if",
        "message0": "ถ้าเดินไป %1 ต่อได้",
        "args0": [
            
            {
                "type": "field_dropdown",
                "name": "DIRECTIONS_FIELD",
                "options": [
                    ["ทางซ้าย", "left"],
                    ["ทางขวา", "right"],
                    ["ข้างหน้า", "front"],
                    ["ข้างหลัง", "back"],
                ],
            },
        ],
        "message1": "ทำ %1",
        "args1": [
            { "type": "input_statement", "name": "DO" }
        ],
        "nextStatement": "Action",
        "previousStatement": "Action",
        "tooltip": "ถ้าทางที่กำหนดไม่มีกำแพงอยู่ ให้ทำตามคำสั่ง",
        "colour": 5,
    },
    {
        "type": "is_over_flag",
        "kindoblock": "variable",
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
        "tooltip": "เช็กว่าไก่ยืนอยู่บนที่ที่มีธงหรือไม่",
        "colour": 4,
    }
]

let editorGen = false

export const generate = (w, forEditor = false) => {
    editorGen = forEditor
    if (forEditor) {
        langGenerator.STATEMENT_PREFIX = '';
    } else {
        langGenerator.STATEMENT_PREFIX = 'check_code_stop()\nblock_highlight(%1)\n';
    }

    let code = langGenerator.workspaceToCode(w)

    if (forEditor) {
        code = code.replace(/"""/g, '')
    }

    return code
}

export const init = () => {
    langGenerator["turn_left"] = (block) => {
        return `turn_left(${editorGen ? '' : '"' + block.id + '"'})\n`
    }

    langGenerator["turn_right"] = (block) => {
        return `turn_right(${editorGen ? '' : '"' + block.id + '"'})\n`
    }

    langGenerator["go_forward"] = (block) => {
        return `go_forward(${editorGen ? '' : '"' + block.id + '"'})\n`
    }

    langGenerator["go_backward"] = (block) => {
        return `go_backward(${editorGen ? '' : '"' + block.id + '"'})\n`
    }

    langGenerator["until_flag"] = (block) => {
        let doLine = langGenerator.statementToCode(block, 'DO') || '\tpass'

        if (editorGen) {
            return `while is_over_flag() == false:\n${doLine}\n`
        } else {
            return `loopCount = 0\nwhile is_over_flag() == false:\n${doLine}\n\tloopCount = loopCount + 1\n\tif loopCount > 100:\n\t\tbreak\n`
        }
    }

    langGenerator["if_can_walk"] = (block) => {
        let doLine = langGenerator.statementToCode(block, 'DO') || '\tpass'

        return `if can_walk_to('${block.getFieldValue('DIRECTIONS_FIELD')}'):\n${doLine}`
    }

    langGenerator["is_over_flag"] = (block) => {
        //console.log("END: ", langGenerator.valueToCode(block, 'DO') || 'pass')

        return [`is_over_flag()`, langGenerator.ORDER_FUNCTION_CALL];
    }
}