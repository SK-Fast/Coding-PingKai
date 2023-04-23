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

    const everyStepUpdate = async() => {
        await delay()
    }

    let x = 0
    let y = 0
    let rotation = 0

    const rotateChick = async (rot) => {
        data.angleText.text = "DEGREE: " + rot
        rotation = rot

        anime({
            targets: data.chick,
            angle: rot,
            duration: 500,
            easing: 'easeOutBounce'
        })

        await everyStepUpdate()
    }

    const moveChick = async (x, y) => {
        anime({
            targets: data.chick,
            x: (data.appView.width / 2) + x,
            y: (data.appView.width / 2) + y,
            duration: 500,
            easing: 'easeOutSine'
        })

        await everyStepUpdate()
    }
    
    interpreter.addFunction('check_code_stop', () => {
        if (sessionData.codeStop == true) {
            throw "Python Signal Killed"
        }
    })

    interpreter.addFunction('block_highlight', (bID) => {
        activeBlock(w, bID)
    })

    interpreter.addFunction('rotate_left', async (degrees) => {
        await rotateChick(data.chick.rotation + degrees)
    })

    interpreter.addFunction('rotate_right', async (degrees) => {
        await rotateChick(data.chick.rotation - degrees)
    })

    interpreter.addFunction('go_forward', async (force) => {
        x += parseInt(force) * Math.cos(data.chick.rotation);
        y += parseInt(force) * Math.sin(data.chick.rotation);
        
        moveChick(x, y)
    })

    await interpreter.evaluate(script)

    inactiveAllBlocks(w)

    return (flagCollected == flags.length)
}

export const reset = (w, data) => {
    resetAllBlocks(w)

    data.chick.x = (data.appView.width / 2)
    data.chick.y = (data.appView.height / 2)
    data.chick.rotation = 0
}

export const kindData = {
    ratio: [1, 1]
}

export const init = async (e, data) => {
    const PIXI = await import('pixi.js')

    const app = new PIXI.Application({
        background: '#E6E6E6',
        resizeTo: e
    });

    e.appendChild(app.view);

    const container = new PIXI.Container();

    container.sortableChildren = true

    app.stage.addChild(container);

    const chickDraw = PIXI.Sprite.from("/chickdraw_arrow.png")
    chickDraw.width = 30
    chickDraw.height = 30

    chickDraw.x = (app.view.width / 2)
    chickDraw.y = (app.view.height / 2)
    
    chickDraw.anchor.set(0.5)
    chickDraw.pivot.set(0.5)

    container.addChild(chickDraw)

    const angleText = new PIXI.Text('', {
        fontFamily: 'Bai Jamjuree',
        fontSize: 16,
        fill: 0x000000,
        align: 'left',
    });   

    angleText.x = 10
    angleText.y = 10

    container.addChild(angleText)

    return {
        appView: app.view,
        pixiApp: app,
        chick: chickDraw,
        angleText: angleText
    }
}
