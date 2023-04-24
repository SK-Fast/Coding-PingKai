export const blockset = () => { return import("@/blocksets/w2.js") }
import anime from 'animejs';
import { activeBlock, inactiveAllBlocks, createInterpretBase, warnBlock, resetAllBlocks } from '../libs/blockGlobal.js';
import _ from 'lodash';

async function isDrawSame(origin, drawn) {
    return _.isEqual(origin, drawn)
}

/**
 * 
 * @param {string} script Python Source code
 * @param {Array} data Interpreter Data
 * @param {Function} delay Global Delay
 * @param {WorkspaceSvg} w Blockly Workspace
 */
export const run = async (script, data, delay, w, sessionData) => {
    const PIXI = await import('pixi.js')

    const interpreter = createInterpretBase()

    const everyStepUpdate = async () => {
        await delay()
    }

    let x = 0
    let y = 0
    let xDraw = 0
    let yDraw = 0
    let XYInterpret = { x: 0, y: 0 }
    let rotation = 0
    let drawData = []

    const rotateChick = async (rot) => {
        data.angleText.text = "องศา: " + rot
        rotation = rot

        anime({
            targets: data.chick,
            angle: rot,
            duration: 250,
            easing: 'easeOutBounce'
        })

        await everyStepUpdate()
    }

    const moveChick = async (x, y, onUpdate) => {
        anime({
            targets: data.chick,
            x: (data.appView.width / 2) + x,
            y: (data.appView.width / 2) + y,
            duration: 250,
            easing: 'easeOutSine'
        })

        anime({
            targets: XYInterpret,
            x: x,
            y: y,
            duration: 250,
            easing: 'easeOutSine',
            update: onUpdate
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
        await rotateChick(rotation + degrees)
    })

    interpreter.addFunction('rotate_right', async (degrees) => {
        await rotateChick(rotation - degrees)
    })

    interpreter.addFunction('go_forward', async (force) => {
        let oldX = x
        let oldY = y

        x += parseInt(force) * Math.cos(rotation * (Math.PI / 180));
        y += parseInt(force) * Math.sin(rotation * (Math.PI / 180));

        drawData.push({
            from: [Math.round(oldX), Math.round(oldY)],
            to: [Math.round(x), Math.round(y)],
        })

        let lineT = new PIXI.Graphics();
        lineT.pivot.set(0.5)

        data.container.addChild(lineT);

        lineT.position.set(0, 0);

        data.linesTotal.push(lineT)

        await moveChick(x, y, () => {
            lineT.lineStyle(5, 0xFF7733)
                .moveTo((data.appView.width / 2) + oldX, (data.appView.height / 2) + oldY)
                .lineTo((data.appView.width / 2) + XYInterpret.x, (data.appView.height / 2) + XYInterpret.y);
        })
    })

    await interpreter.evaluate(script)

    const drawSameResult = await isDrawSame(drawData, data.data.data)

    console.log("ORIGIN DRAW DATA: ", JSON.stringify(data.data.data))
    console.log("OUT DRAW DATA: ", JSON.stringify(drawData))
    console.log("DRAW SAME RESULT: ", drawSameResult)

    inactiveAllBlocks(w)

    return drawSameResult
}

export const reset = (w, data) => {
    resetAllBlocks(w)

    data.chick.x = (data.appView.width / 2)
    data.chick.y = (data.appView.height / 2)
    data.chick.rotation = 0

    data.angleText.text = "องศา: 0"

    for (const l of data.linesTotal) {
        l.clear()
    }
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

    chickDraw.zIndex = 10

    container.addChild(chickDraw)

    const angleText = new PIXI.Text('องศา: 0', {
        fontFamily: 'Bai Jamjuree',
        fontSize: 16,
        fill: 0x000000,
        align: 'left',
    });

    angleText.x = 10
    angleText.y = 10

    container.addChild(angleText)

    for (const posXY of data.data) {
        let lineT = new PIXI.Graphics();
        lineT.pivot.set(0.5)

        container.addChild(lineT);

        lineT.position.set(0, 0);

        lineT.lineStyle(5, 0xC0C0C0)
            .moveTo((app.view.width / 2) + posXY.from[0], (app.view.height / 2) + posXY.from[1])
            .lineTo((app.view.width / 2) + posXY.to[0], (app.view.height / 2) + posXY.to[1]);
    }

    return {
        appView: app.view,
        container: container,
        pixiApp: app,
        chick: chickDraw,
        angleText: angleText,
        data: data,
        linesTotal: []
    }
}
