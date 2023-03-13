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
    title: "ตรวจสอบเส้นทาง",
    altTitle: "W1-5",
    width: 5,
    height: 4,
    blockLimit: 8,
    startAngle: 0,
    data: [
        " ", "#", "#", "#", "#", 
        " ", " ", "C", " ", " ", 
        " ", "#", "#", "#", " ", 
        "F", "#", "#", "#", "F"
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