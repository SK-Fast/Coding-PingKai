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
]

export const levelKind = () => {return import("@/lesson_kind/chickwalk.js")}
export const levelData = {
    title: "ทิศทางการเดินพิ้นฐาน",
    altTitle: "W1-2",
    width: 5,
    height: 4,
    blockLimit: 5,
    startAngle: 0,
    data: [
        "#", "#", "#", "#", "#", 
        "#", " ", " ", "F", "#", 
        "#", " ", "#", "#", "#", 
        "#", "C", "#", "#", "#"
    ]
}

export const dialogue = [
    [
        {
            type: "txt",
            text: "โอ้! ไม่นะ!"
        },
        {
            type: "delay",
            ms: 100
        },
        {
            type: "txt-continue",
            text: " มีหินขวางทางเดินของเราอยู่"
        },
        {
            type: "delay",
            ms: 100
        },
        {
            type: "txt-continue",
            text: " เราต้องเดินหลบเพื่อไปหาธง"
        },
    ],
    [
        {
            type: "txt",
            text: "ลองใช้บล็อก"
        },
        {
            type: "focus_block",
            blockIndex: 2
        },
        {
            type: "txt-continue",
            text: " หันไปทางซ้าย"
        },
        {
            type: "delay",
            ms: 100
        },
        {
            type: "txt-continue",
            text: " และ"
        },
        {
            type: "focus_block",
            blockIndex: 3
        },
        {
            type: "txt-continue",
            text: " หันไปทางขวา ดูสิ"
        },
    ],
]