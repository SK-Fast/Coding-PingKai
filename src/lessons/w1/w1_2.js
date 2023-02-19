export const blocks = [
    {
        "kind": "block",
        "type": "go_up"
    },
    {
        "kind": "block",
        "type": "go_down"
    },
    {
        "kind": "block",
        "type": "go_left"
    },
    {
        "kind": "block",
        "type": "go_right"
    },
]

export const levelKind = () => {return import("@/lesson_kind/chickwalk.js")}
export const levelData = {
    title: "ทิศทางการเดินพิ้นฐาน",
    altTitle: "W1-2",
    width: 5,
    height: 4,
    blockLimit: 4,
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
            text: " ไปทางซ้าย"
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
            text: " ไปทางขวา ดูสิ"
        },
    ],
]