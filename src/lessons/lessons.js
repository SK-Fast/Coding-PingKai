export const sections = [
    {
        title: "ไก่น้อย ผจญภัย",
        desc: "ช่วยไก่น้อยในการผจญภัยของเขา",

        levels: [
            {
                title: "สอนเดิน",
                levelData: () => {return import("./w1/w1_1.js")}
            },
            {
                title: "หมุนซ้าย... หมุนขวา...",
                levelData: () => {return import("./w1/w1_2.js")}
            }
        ]
    }
]

export function findLevel(i) {
    let ii = 0

    for (const section of sections) {
        for (const level of section.levels) {
            if (ii == i) {
                return level
            }

            ii++
        }
    }
}
