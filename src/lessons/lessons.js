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
            },
            {
                title: "W1-4",
                levelData: () => {return import("./w1/w1_4.js")}
            },
            {
                title: "W1-5",
                levelData: () => {return import("./w1/w1_5.js")}
            },
            {
                title: "W1-6",
                levelData: () => {return import("./w1/w1_6.js")}
            },
            {
                title: "W1-7",
                levelData: () => {return import("./w1/w1_7.js")}
            },
            {
                title: "W1-8",
                levelData: () => {return import("./w1/w1_8.js")}
            },/*
            {
                title: "W1-9",
                levelData: () => {return import("./w1/w1_9.js")}
            }*/
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

export function getMaxLevel() {
    let ii = 0

    for (const section of sections) {
        for (const level of section.levels) {

            ii++
        }
    }

    return ii
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
