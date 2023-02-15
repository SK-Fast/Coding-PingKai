export const blockset = () => {return import("@/blocksets/w1.js")}
import { jsPython } from 'jspython-interpreter';
import anime from 'animejs';

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

export const run = async (script, data, delay) => {
    const interpreter = jsPython();

    let currentPosX = data.chickMapPos[0]
    let currentPosY = data.chickMapPos[1]

    let flags = data.flags

    const flagCheck = () => {
        return flags.find((d) => d.x == currentPosX && d.y == currentPosY)
    }

    const updateMove = async() => {
        const flagDetect = flagCheck()

        if (flagDetect) {
            flagDetect.obj.visible = false
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

    interpreter.addFunction('go_left', async () => {
        let c = blockExist(data.lvlPos, currentPosX - 1, currentPosY)

        if (c) {
            currentPosX--
            await moveChick(data.chick.x - data.cellSize, data.chick.y)
        }
    });

    interpreter.addFunction('go_right', async () => {
        let c = blockExist(data.lvlPos, currentPosX + 1, currentPosY)

        if (c) {
            currentPosX++
            await moveChick(data.chick.x + data.cellSize, data.chick.y)
        }
    });

    interpreter.addFunction('go_up', async () => {
        let c = blockExist(data.lvlPos, currentPosX, currentPosY - 1)

        if (c) {
            currentPosY--
            await moveChick(data.chick.x, data.chick.y - data.cellSize)
        }
    });

    interpreter.addFunction('go_down', async () => {
        let c = blockExist(data.lvlPos, currentPosX, currentPosY + 1)

        if (c) {
            currentPosY++
            await moveChick(data.chick.x, data.chick.y + data.cellSize)
        }
    });

    await interpreter.evaluate(script)
}

export const reset = (data) => {
    data.chick.x = data.originPos[0]
    data.chick.y = data.originPos[1]
    data.chick.rotation = 0

    for (const flag of data.flags) {
        flag.obj.visible = true
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
