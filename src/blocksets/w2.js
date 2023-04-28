import { pythonGenerator as langGenerator } from "blockly/python"
import * as monaco from "monaco-editor"

export const pythonSnippets = [
    {
        label: 'go_forward',
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: 'เดินไปข้างหน้าตาม Unit',
        insertText: [
            'go_forward(unit)'
        ].join('\n')
    },
    {
        label: 'rotate_left',
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: 'หมุนไปทางซ้ายตาม Degrees',
        insertText: [
            'rotate_left(degrees)'
        ].join('\n')
    },
    {
        label: 'rotate_right',
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: 'หมุนไปทางขวาตาม Degrees',
        insertText: [
            'rotate_right(unit)'
        ].join('\n')
    },
]

export const blocklyJSON = [
    {
        "type": "chickdraw_turn_left",
        "message0": 'หมุนไปทาง %1 %2',
        "nextStatement": "Action",
        "previousStatement": "Action",
        "colour": 22,
        "kindoblock": "normalblock",
        "args0": [
            {
                "type": "field_image",
                "src": "/blockly_editor/rotate-cw.png",
                "width": 15,
                "height": 15
            },
            {
                "type": "input_value",
                "name": "DEGREES",
                "check": "degrees"
            },
        ]
    },
    {
        "type": "chickdraw_turn_right",
        "message0": 'หมุนไปทาง %1 %2',
        "nextStatement": "Action",
        "previousStatement": "Action",
        "colour": 22,
        "kindoblock": "normalblock",
        "args0": [
            {
                "type": "field_image",
                "src": "/blockly_editor/rotate-ccw.png",
                "width": 15,
                "height": 15
            },
            {
                "type": "input_value",
                "name": "DEGREES",
                "check": "degrees"
            },
        ]
    },
    {
        "type": "chickdraw_angle_def",
        "message0": '%1 องศา',
        "colour": 10,
        "kindoblock": "normalblock",
        "output": "degrees",
        "args0": [
            {
                "type": "field_angle",
                "name": "DEGREES",
                "angle": 45
            },
        ]
    },
    {
        "type": "chickdraw_forward",
        "message0": '%1 ไปข้างหน้า %2',
        "nextStatement": "Action",
        "previousStatement": "Action",
        "colour": 15,
        "kindoblock": "normalblock",
        "args0": [
            {
                "type": "field_image",
                "src": "/blockly_editor/arrow-up-circle.png",
                "width": 15,
                "height": 15
            },
            {
                "type": "input_value",
                "name": "FORCE",
                "check": "steps"
            },
        ]
    },
    {
        "type": "chickdraw_walk_unit",
        "message0": '%1 ก้าว',
        "colour": 10,
        "kindoblock": "datatype",
        "output": "steps",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "FORCE",
                "options": [
                    ["5", "5"],
                    ["25", "25"],
                    ["50", "50"],
                    ["100", "100"],
                ]
            },
        ]
    },
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
    langGenerator["chickdraw_turn_left"] = (block) => {
        return `rotate_left(${langGenerator.valueToCode(block, 'DEGREES', langGenerator.ORDER_NONE) || 0})\n`
    }

    langGenerator["chickdraw_turn_right"] = (block) => {
        return `rotate_right(${langGenerator.valueToCode(block, 'DEGREES', langGenerator.ORDER_NONE) || 0})\n`
    }

    langGenerator["chickdraw_forward"] = (block) => {
        return `go_forward(${langGenerator.valueToCode(block, 'FORCE', langGenerator.ORDER_NONE) || 0})\n`
    }

    langGenerator["chickdraw_angle_def"] = (block) => {
        return [`${block.getFieldValue('DEGREES')}`, langGenerator.ORDER_NONE]
    }

    langGenerator["chickdraw_walk_unit"] = (block) => {
        return [`${block.getFieldValue('FORCE')}`, langGenerator.ORDER_NONE]
    }
}