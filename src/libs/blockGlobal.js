let oldbID = ""
import { Interpreter, jsPython } from 'jspython-interpreter';

/**
 * @summary Give an currently working block a class
 * @param {import("blockly").WorkspaceSvg} w Blockly Workspace
 * @param {string} bID Block ID
 */
export const activeBlock = (w, bID) => {
    let block = w.getBlockById(bID)

    block.svgGroup_.classList.add("worked")

    let oldBlock = w.getBlockById(oldbID)
    
    if (oldBlock) {
        oldBlock.svgGroup_.classList.remove("worked")
    }

    oldbID = bID
}

/**
 * @summary Reset all block to inactive
 * @param {import("blockly").WorkspaceSvg} w Blockly Workspace
 */
export const inactiveAllBlocks = (w, bID) => {
    let block = w.getAllBlocks()

    for (const b of block) {
        b.svgGroup_.classList.remove("worked")
    }
}

/**
 * @returns {Interpreter}
 */
export const createInterpretBase = () => {
    const interpreter = jsPython();

    interpreter.assignGlobalContext({
        "True": true,
        "False": false,
        "pass": true,
    })    
      
    return interpreter

}