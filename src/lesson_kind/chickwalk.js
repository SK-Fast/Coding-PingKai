export const blockset = () => {return import("@/blocksets/w1.js")}

export const init = async (e, data) => {
    const PIXI = await import('pixi.js')

    const app = new PIXI.Application({
        background: '#73E58C',
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

    const sheet = await PIXI.Assets.load('assets/rect.json');
    
    for (const d of data.data) {
        //const ground = new PIXI.Sprite.from('')

        //container.addChild(ground)

        w++
        cw = cw + cellSize

        if (w >= data.width) {
            ch = ch + cellSize
            w = 0
            h++
        }
    }
}
