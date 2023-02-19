export const sections = [
    {
        title: "ไก่น้อย ผจญภัย",
        desc: "ช่วยไก่น้อยในการผจญภัยของเขา",

        levels: [
            {
                title: "W1-1",
                levelData: () => {return import("./w1/w1_1.js")}
            },
            {
                title: "W1-2",
                levelData: () => {return import("./w1/w1_2.js")}
            },
            {
                title: "W1-3",
                levelData: () => {return import("./w1/w1_3.js")}
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

export function getSectionFromID(i) {
    let ii = 0
    let startI = 0

    for (const section of sections) {
        startI = ii

        for (const level of section.levels) {
            if (ii == i) {
                return {
                    ...section,
                    levelCount: section.levels.length,
                    startIndex: startI
                }
            }

            ii++
        }
    }
}
