export const blockset = () => {return import("@/blocksets/w1.js")}
import anime from 'animejs';
import { activeBlock, inactiveAllBlocks, createInterpretBase, warnBlock, resetAllBlocks } from '../libs/blockGlobal.js';

/**
 * 
 * @param {Array} lvlPos 
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function blockExist(lvlPos, x, y) {
    let f = lvlPos.find((d) => d.x == x && d.y == y)

    if (f) {
        if (f.d == "#") {
            return f
        } else {
            return
        }
    } else {
        return "void"
    }
}

/**
 * 
 * @param {string} script Python Source code
 * @param {Array} data Interpreter Data
 * @param {Function} delay Global Delay
 * @param {WorkspaceSvg} w Blockly Workspace
 */
export const run = async (script, data, delay, w, sessionData) => {
    const interpreter = createInterpretBase()
    
    let currentPosX = data.chickMapPos[0]
    let currentPosY = data.chickMapPos[1]

    let flags = data.flags
    let flagChecks = [...data.flags]
    let flagCollected = 0

    const flagCheck = () => {
        return flags.find((d) => d.x == currentPosX && d.y == currentPosY)
    }

    const staticFlagCheck = () => {
        return flagChecks.find((d) => d.x == currentPosX && d.y == currentPosY)
    }

    const staticFlagCheckIndex = () => {
        return flagChecks.findIndex((d) => d.x == currentPosX && d.y == currentPosY)
    }

    const cantMoveWarn = (c, bID) => {
        warnBlock(c, bID)
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

        await updateMove()
    }

    interpreter.addFunction('go_left', async (bID) => {
        let c = blockExist(data.lvlPos, currentPosX - 1, currentPosY)

        if (!c) {
            currentPosX--
            await moveChick(data.chick.x - data.cellSize, data.chick.y)
        } else {
            cantMoveWarn(w, bID)
        }

        
    });

    interpreter.addFunction('go_right', async (bID) => {
        let c = blockExist(data.lvlPos, currentPosX + 1, currentPosY)
        
        console.log(c)
        console.log(!c)

        if (!c) {
            currentPosX++
            await moveChick(data.chick.x + data.cellSize, data.chick.y)
        } else {
            cantMoveWarn(w, bID)
        }
    });

    interpreter.addFunction('check_code_stop', () => {
        if (sessionData.codeStop == true) {
            throw "Python Signal Killed"
        }
    })

    interpreter.addFunction('block_highlight', (bID) => {
        activeBlock(w, bID)
    })
    
    interpreter.addFunction('go_up', async (bID) => {
        let c = blockExist(data.lvlPos, currentPosX, currentPosY - 1)

        let block = w.getBlockById(bID)

        console.log(c)

        if (!c) {
            currentPosY--
            await moveChick(data.chick.x, data.chick.y - data.cellSize)
        } else {
            cantMoveWarn(w, bID)
        }

        
    });

    interpreter.addFunction('go_down', async (bID) => {
        let c = blockExist(data.lvlPos, currentPosX, currentPosY + 1)

        if (!c) {
            currentPosY++
            await moveChick(data.chick.x, data.chick.y + data.cellSize)
        } else {
            cantMoveWarn(w, bID)
        }

        
    });

    interpreter.addFunction('is_over_flag', async () => {
        const sFDetect = staticFlagCheck()
        const sFIDetect = staticFlagCheckIndex()
        const isFlag = sFDetect != undefined

        if (isFlag) {
            flagChecks.splice(sFIDetect, 1);
        }

        return isFlag
    });

    await interpreter.evaluate(script)

    inactiveAllBlocks(w)

    return (flagCollected == flags.length)
}

export const reset = (w, data) => {
    anime.remove(data.chick)

    data.chick.x = data.originPos[0]
    data.chick.y = data.originPos[1]
    data.chick.rotation = 0
        
    resetAllBlocks(w)

    for (const flag of data.flags) {
        anime.remove(flag)

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

    container.sortableChildren = true

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

        ground.zIndex = -1

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
            f.zIndex = 98

            flags.push({
                x: w,
                y: h,
                obj: f
            })
        }

        if (d == "C") {
            chick = makeBlock('/chickwalk_tiles/chick_L.png', cw, ch)
            chick.zIndex = 102
            chickMapPos[0] = w
            chickMapPos[1] = h
        }

        blockPos.push({
            d: d,
            x: w,
            y: h
        })

        w++
        cw = cw + cellSize

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
