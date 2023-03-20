export const blocks = [
    {
        "kind": "block",
        "type": "go_forward"
    },
    {
        "kind": "block",
        "type": "go_backward"
    },
    {
        "kind": "block",
        "type": "turn_left"
    },
    {
        "kind": "block",
        "type": "turn_right"
    },
    {
        "kind": "block",
        "type": "until_flag"
    },
]

export const levelKind = () => {return import("@/lesson_kind/chickwalk.js")}
export const levelData = {
    ratio: [1, 0.9],
    title: "การวนซ้ำหลายรอบ",
    altTitle: "W1-4",
    width: 5,
    height: 4,
    blockLimit: 5,
    startAngle: 90,
    data: [
        "#", "#", "#", " ", "F", 
        "#", "#", " ", " ", "#", 
        "#", " ", " ", "#", "#", 
        "C", " ", "#", "#", "#"
    ]
}

export const dialogue = [
    [
        {
            type: "txt",
            text: "ทีนี้ ลองเอาบล็อกทั้ง 2 บล็อกมาใช้รวมกันดูสิ!"
        }
    ],
]