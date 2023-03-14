export const blockset = () => { return import("@/blocksets/w1.js") }
import anime from 'animejs';
import { activeBlock, inactiveAllBlocks, createInterpretBase, warnBlock, resetAllBlocks } from '../libs/blockGlobal.js';

/**
 * 
 * @param {Array} lvlPos 
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function blockExist(lvlPos, x, y, lvlData) {
    if (x < 0 || y < 0) {
        return "void"
    }

    if (x > lvlData.width - 1) {
        return "void"
    }

    if (y > lvlData.height - 1) {
        return "void"
    }

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

const spriteReturn = (angle) => {
    if (angle == 0) {
        return "T"
    } else if (angle == 90) {
        return "R"
    } else if (angle == 180) {
        return "B"
    } else if (angle == 270) {
        return "L"
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

    let addX = 0
    let addY = 1

    let angle = 0

    if (data.lvlData['startAngle']) {
        angle = data.lvlData.startAngle
    }

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
        if (!bID) {
            return
        }
        warnBlock(c, bID)
    }

    const updateMove = async () => {
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
    }

    const moveChick = async (x, y) => {
        anime({
            targets: data.chick,
            x: x,
            y: y,
            easing: 'easeOutElastic(1, .6)'
        })

        await updateMove()
    }

    const updateAngleMove = (changeSprite = true) => {

        if (angle > 270) {
            angle = 0
        }

        if (angle < 0) {
            angle = 270
        }

        if (angle == 0) {
            if (changeSprite) {
                data.chick.texture = data.chickFrames.T
            }

            addX = 0
            addY = 1

        } else if (angle == 90) {
            if (changeSprite) {
                data.chick.texture = data.chickFrames.R
            }

            addX = 1
            addY = 0

        } else if (angle == 180) {
            if (changeSprite) {
                data.chick.texture = data.chickFrames.B
            }

            addX = 0
            addY = -1

        } else if (angle == 270) {
            if (changeSprite) {
                data.chick.texture = data.chickFrames.L
            }

            addX = -1
            addY = 0
        }
    }

    const everyStepUpdate = async() => {
        await delay()
    }

    updateAngleMove()

    interpreter.addFunction('turn_left', async (bID) => {
        angle -= 90

        updateAngleMove()

        await everyStepUpdate()
    });

    interpreter.addFunction('turn_right', async (bID) => {
        angle += 90

        updateAngleMove()

        await everyStepUpdate()
    });

    interpreter.addFunction('check_code_stop', () => {
        if (sessionData.codeStop == true) {
            throw "Python Signal Killed"
        }
    })

    interpreter.addFunction('block_highlight', (bID) => {
        activeBlock(w, bID)
    })

    interpreter.addFunction('go_forward', async (bID) => {
        let c = blockExist(data.lvlPos, currentPosX + addX, currentPosY - addY, data.lvlData)

        if (!c) {
            currentPosX = currentPosX + addX
            currentPosY = currentPosY - addY

            await moveChick(data.chick.x + (data.cellSize * addX), data.chick.y - (data.cellSize * addY))
        } else {
            cantMoveWarn(w, bID)
        }

        await everyStepUpdate()
    });

    interpreter.addFunction('go_backward', async (bID) => {
        let c = blockExist(data.lvlPos, currentPosX - addX, currentPosY + addY, data.lvlData)

        if (!c) {
            currentPosX = currentPosX - addX
            currentPosY = currentPosY + addY

            await moveChick(data.chick.x - (data.cellSize * addX), data.chick.y + (data.cellSize * addY))
        } else {
            cantMoveWarn(w, bID)
        }

        await everyStepUpdate()
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

    interpreter.addFunction('can_walk_to', async (direction) => {
        if (direction == "front") {
            let blockExists = blockExist(data.lvlPos, currentPosX + addX, currentPosY - addY, data.lvlData) == undefined
            return blockExists
        } else if (direction == "back") {
            let blockExists = blockExist(data.lvlPos, currentPosX - addX, currentPosY + addY, data.lvlData) == undefined

            return blockExists
        } else if (direction == "left") {

            angle -= 90

            updateAngleMove(false)

            let blockExists = blockExist(data.lvlPos, currentPosX + addX, currentPosY - addY, data.lvlData) == undefined

            angle += 90

            updateAngleMove(false)

            return blockExists
        } else if (direction == "right") {
            angle += 90

            updateAngleMove(false)

            let blockExists = blockExist(data.lvlPos, currentPosX + addX, currentPosY - addY, data.lvlData) == undefined
            
            angle -= 90

            updateAngleMove(false)
            
            return blockExists
        }
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

    data.chick.texture = data.chickFrames[spriteReturn(data.lvlData.startAngle)]

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

    const chickFrames = {
        "T": PIXI.Texture.from('/chickwalk_tiles/chick_B.png'),
        "B": PIXI.Texture.from('/chickwalk_tiles/chick_T.png'),
        "L": PIXI.Texture.from('/chickwalk_tiles/chick_L.png'),
        "R": PIXI.Texture.from('/chickwalk_tiles/chick_R.png'),
    }

    e.appendChild(app.view);

    const container = new PIXI.Container();

    container.sortableChildren = true

    app.stage.addChild(container);

    let w = 0
    let h = 0

    let cw = 0
    let ch = 0

    let cellSize = e.clientWidth / data.width

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
            chick = makeBlock('/chickwalk_tiles/chick_B.png', cw, ch)
            chick.zIndex = 102
            chick.texture = chickFrames[spriteReturn(data.startAngle)]
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

    return {
        chick: chick,
        originPos: [chick.x, chick.y],
        chickMapPos: chickMapPos,
        flags: flags,
        lvlData: data,
        cellSize: cellSize,
        lvlPos: blockPos,
        interpreter: null,
        chickFrames: chickFrames
    }
}
