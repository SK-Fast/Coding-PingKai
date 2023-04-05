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
    {
        "kind": "block",
        "type": "if_can_walk"
    },
]

export const levelKind = () => {return import("@/lesson_kind/chickwalk.js")}
export const levelData = {
    ratio: [1, 1.1],
    title: "ตรวจสอบเส้นทาง",
    altTitle: "W1-9",
    width: 5,
    height: 5,
    blockLimit: 12,
    startAngle: 90,
    data: [
        "#", "#", "#", "#", "#",
        " ", " ", "C", " ", " ",
        " ", "#", "#", "#", " ",
        "F", "#", "#", "#", "F",
        " ", " ", "F", " ", " "
    ]
}

export const dialogue = [
    [
        {
            type: "txt",
            text: "ลองเอาบล็อกที่เรียนมารวมเข้าด้วยกันสิ คุณทำได้!"
        },
    ],
]