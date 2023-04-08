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
    }
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

}