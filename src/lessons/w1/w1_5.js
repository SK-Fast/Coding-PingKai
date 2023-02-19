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
    blockLimit: 8,
    data: [
        "F", " ", " ", " ", "F", 
        " ", "#", "#", "#", " ", 
        " ", "#", "#", "#", " ", 
        "F", " ", "C", " ", "F"
    ]
}

export const dialogue = [
    [
        {
            type: "txt",
            text: "คล้ายๆ กับด่านก่อนเลย แต่ไปทั้ง 4 ทิศเลย ลองดูสิ!"
        }
    ],
]