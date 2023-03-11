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
    title: "การวนซ้ำหลายรอบ",
    altTitle: "W1-4",
    width: 5,
    height: 4,
    blockLimit: 10,
    startAngle: 90,
    data: [
        "#", "#", "#", "#", "F", 
        "#", "#", "#", "#", " ", 
        "#", "#", "#", "#", " ", 
        "C", " ", " ", " ", "F"
    ]
}

export const dialogue = [
    [
        {
            type: "txt",
            text: "เราต้องเก็บธงให้ครบทั้งหมด ลองใช้บล็อก"
        },
        {
            type: "focus_block",
            blockIndex: 4
        },
        {
            type: "txt-continue",
            text: " ทำซ่ำจนกว่าจะเจอธง "
        },
        {
            type: "delay",
            ms: 100
        },
        {
            type: "txt-continue",
            text: " หลายๆ ครั้งดูสิ!"
        },
    ],
]