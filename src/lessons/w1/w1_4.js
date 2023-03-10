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
    blockLimit: 4,
    startAngle: 90,
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
            text: "เราต้องเก็บธงให้ครบทั้งหมด คุณสามารถใช้บล็อก วนซ้ำหลายๆ ได้น่ะ ลองดูสิ!"
        }
    ],
]