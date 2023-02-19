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
    blockLimit: 4,
    data: [
        "#", "#", "#", "#", "#", 
        "#", "#", "#", "#", "#", 
        "F", " ", "C", " ", "F", 
        "#", "#", "#", "#", "#"
    ]
}

export const dialogue = [
    [
        {
            type: "txt",
            text: "เราต้องเก็บธงให้ครบทั้งหมด คุณสามารถใช้วนซ้ำหลายๆ บล็อกได้น่ะ ลองดูสิ!"
        }
    ],
]