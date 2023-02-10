export const blockset = () => {return import("@/blocksets/w1.js")}

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
            makeBlock('/chickwalk_tiles/flag.png', cw, ch)
        }

        if (d == "C") {
            chick = makeBlock('/chickwalk_tiles/chick_L.png', cw, ch)
        }

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
        chick: chick
    }
}
