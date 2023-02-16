export const blockset = () => {return import("@/blocksets/w1.js")}
import anime from 'animejs';
import { activeBlock, inactiveAllBlocks, createInterpretBase } from '../libs/blockGlobal.js';

/**
 * 
 * @param {Array} lvlPos 
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function blockExist(lvlPos, x, y) {
    return lvlPos.find((d) => d.x == x + 1 && d.y == y + 1)
}

/**
 * 
 * @param {string} script Python Source code
 * @param {Array} data Interpreter Data
 * @param {Function} delay Global Delay
 * @param {WorkspaceSvg} w Blockly Workspace
 */
export const run = async (script, data, delay, w) => {
    const interpreter = createInterpretBase()
    
    let currentPosX = data.chickMapPos[0]
    let currentPosY = data.chickMapPos[1]

    let flags = data.flags
    let flagCollected = 0

    const flagCheck = () => {
        return flags.find((d) => d.x == currentPosX && d.y == currentPosY)
    }

    const updateMove = async() => {
        const flagDetect = flagCheck()

        if (flagDetect) {
            flagCollected++
            anime({
                targets: flagDetect.obj,
                width: 0,
                height: 0,
                easing: 'easeInBack'
            });
        }

        await delay()
    }

    const moveChick = async(x, y) => {
        anime({
            targets: data.chick,
            x: x,
            y: y,
            easing: 'easeOutElastic(1, .6)'
        })
        await updateMove(x, y)
    }

    interpreter.addFunction('go_left', async (bID) => {
        let c = blockExist(data.lvlPos, currentPosX - 1, currentPosY)

        activeBlock(w, bID)

        if (c) {
            currentPosX--
            await moveChick(data.chick.x - data.cellSize, data.chick.y)
        }
    });

    interpreter.addFunction('go_right', async (bID) => {
        let c = blockExist(data.lvlPos, currentPosX + 1, currentPosY)

        activeBlock(w, bID)

        if (c) {
            currentPosX++
            await moveChick(data.chick.x + data.cellSize, data.chick.y)
        }
    });

    interpreter.addFunction('go_up', async (bID) => {
        let c = blockExist(data.lvlPos, currentPosX, currentPosY - 1)

        let block = w.getBlockById(bID)

        activeBlock(w, bID)

        block.svgGroup_.classList.add("worked")

        if (c) {
            currentPosY--
            await moveChick(data.chick.x, data.chick.y - data.cellSize)
        }
    });

    interpreter.addFunction('go_down', async (bID) => {
        let c = blockExist(data.lvlPos, currentPosX, currentPosY + 1)

        activeBlock(w, bID)

        if (c) {
            currentPosY++
            await moveChick(data.chick.x, data.chick.y + data.cellSize)
        }
    });

    await interpreter.evaluate(script)

    inactiveAllBlocks(w)

    return (flagCollected == flags.length)
}

export const reset = (w, data) => {
    data.chick.x = data.originPos[0]
    data.chick.y = data.originPos[1]
    data.chick.rotation = 0
    
    inactiveAllBlocks(w)

    for (const flag of data.flags) {
        flag.obj.width = data.cellSize
        flag.obj.height = data.cellSize
    }
}

export const kindData = {
    ratio: [1, 0.9]
}

export const init = async (e, data) => {
    const PIXI = await import('pixi.js')

    const app = new PIXI.Application({
        background: '#57ae6a',
        resizeTo: e
    });

    e.appendChild(app.view);

    const container = new PIXI.Container();

    app.stage.addChild(container);

    let w = 0
    let h = 0

    let cw = 0
    let ch = 0

    let cellSize = e.clientWidth / data.width

    console.log(cellSize)

    let tileSwap = false

    let chick;

    const makeBlock = (img, px, py) => {
        const ground = PIXI.Sprite.from(img)
        ground.width = cellSize
        ground.height = cellSize

        ground.x = px
        ground.y = py

        container.addChild(ground)

        return ground
    }

    let blockPos = []
    let chickMapPos = []
    let flags = []
    
    for (const d of data.data) {

        let groundImg = '/chickwalk_tiles/rect.png'

        if (tileSwap) {
            groundImg = '/chickwalk_tiles/rect2.png'
        }

        if (d == "#") {
            groundImg = '/chickwalk_tiles/wall.png'

            if (h == data.height - 1) {
                groundImg = '/chickwalk_tiles/wallend.png'
            }
        }

        makeBlock(groundImg, cw, ch)
        tileSwap = !tileSwap

        if (d == "F") {
            let f = makeBlock('/chickwalk_tiles/flag.png', cw, ch)

            flags.push({
                x: w,
                y: h,
                obj: f
            })
        }

        if (d == "C") {
            chick = makeBlock('/chickwalk_tiles/chick_L.png', cw, ch)
            chickMapPos[0] = w
            chickMapPos[1] = h
        }

        w++
        cw = cw + cellSize

        blockPos.push({
            d: d,
            x: w,
            y: h
        })

        if (w > data.width - 1) {

            ch = ch + cellSize
            cw = 0
            w = 0
            h++
        }
    }

    if (w == 0) {
        for (let i = 0; i < data.width; i++) {
            let groundImg = '/chickwalk_tiles/rectdown.png'

            if (tileSwap) {
                groundImg = '/chickwalk_tiles/rectdown2.png'
            }

            makeBlock(groundImg, cw, ch)

            tileSwap = !tileSwap

            cw = cw + cellSize
        }
    }

    console.log("blockPos", blockPos)
    console.log("chickMapPos", chickMapPos)

    return {
        chick: chick,
        originPos: [chick.x, chick.y],
        chickMapPos: chickMapPos,
        flags: flags,
        lvlData: data,
        cellSize: cellSize,
        lvlPos: blockPos,
        interpreter: null
    }
}
