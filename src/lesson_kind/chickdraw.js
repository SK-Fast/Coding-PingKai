export const blockset = () => { return import("@/blocksets/w2.js") }
import anime from 'animejs';
import { activeBlock, inactiveAllBlocks, createInterpretBase, warnBlock, resetAllBlocks } from '../libs/blockGlobal.js';
/**
 * 
 * @param {string} script Python Source code
 * @param {Array} data Interpreter Data
 * @param {Function} delay Global Delay
 * @param {WorkspaceSvg} w Blockly Workspace
 */
export const run = async (script, data, delay, w, sessionData) => {
    const interpreter = createInterpretBase()
    
    interpreter.addFunction('check_code_stop', () => {
        if (sessionData.codeStop == true) {
            throw "Python Signal Killed"
        }
    })

    interpreter.addFunction('block_highlight', (bID) => {
        activeBlock(w, bID)
    })

    await interpreter.evaluate(script)

    inactiveAllBlocks(w)

    return (flagCollected == flags.length)
}

export const reset = (w, data) => {
    resetAllBlocks(w)
}

export const kindData = {
    ratio: [1, 1]
}

export const init = async (e, data) => {
    const PIXI = await import('pixi.js')

    const app = new PIXI.Application({
        background: '#57ae6a',
        resizeTo: e
    });

    e.appendChild(app.view);

    const container = new PIXI.Container();

    container.sortableChildren = true

    app.stage.addChild(container);

    return {
        appView: app.view,
        pixiApp: app,
    }
}
