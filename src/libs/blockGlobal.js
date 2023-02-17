let oldbID = ""
import { Interpreter, jsPython } from 'jspython-interpreter';

/**
 * @summary Give an currently working block a class
 * @param {import("blockly").WorkspaceSvg} w Blockly Workspace
 * @param {string} bID Block ID
 * @param {string} classname Classname to add
 */
export const activeBlock = (w, bID, classname = "worked") => {
    let oldBlock = w.getBlockById(oldbID)
    
    if (oldBlock) {
        oldBlock.svgGroup_.classList.remove("worked")
    }

    oldbID = bID
    
    let block = w.getBlockById(bID)

    if (block) {
        block.svgGroup_.classList.add(classname)
    }
}

/**
 * @summary Put a warning on a block
 * @param {import("blockly").WorkspaceSvg} w Blockly Workspace
 * @param {string} bID Block ID
 */
export const warnBlock = (w, bID) => {
    let block = w.getBlockById(bID)

    if (block) {
        block.setWarningText("ไม่สามารถเดินได้เนื่องจากติดผนัง")
        activeBlock(w, bID, "error")
    }
}

/**
 * @summary Reset all block to inactive
 * @param {import("blockly").WorkspaceSvg} w Blockly Workspace
 */
export const inactiveAllBlocks = (w) => {
    let block = w.getAllBlocks()

    for (const b of block) {
        b.svgGroup_.classList.remove("worked")
        b.svgGroup_.classList.remove("error")
    }
}

/**
 * @summary Reset all block running states
 * @param {import("blockly").WorkspaceSvg} w Blockly Workspace
 */
export const resetAllBlocks = (w) => {
    inactiveAllBlocks(w)

    let block = w.getAllBlocks()

    for (const b of block) {
        b.setWarningText(null)
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

    interpreter.addFunction('delay_ms', async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
      
    return interpreter

}