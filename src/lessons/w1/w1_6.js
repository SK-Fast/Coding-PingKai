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
    blockLimit: 4,
    startAngle: 270,
    data: [
        " ", " ", " ", " ", " ", 
        " ", "#", "#", "#", " ", 
        " ", "#", "#", "#", " ", 
        " ", " ", "C", "#", "F"
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
            text: " และเราสามารถใช้ได้แค่เพียง 5 บล็อกเท่านั้น."
        },
    ],
    [
        {
            type: "txt",
            text: "แต่เราสามารถใช้บล็อก"
        },
        {
            type: "focus_block",
            blockIndex: 5
        },
        {
            type: "txt-continue",
            text: " ถ้าเดินไป "
        },
        {
            type: "delay",
            ms: 100
        },
        {
            type: "txt-continue",
            text: " ได้น่ะ"
        },
        {
            type: "delay",
            ms: 100
        },
        {
            type: "txt-continue",
            text: " ลองดูสิ!"
        },
    ],
]