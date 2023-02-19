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
    title: "การวนซ้ำ",
    altTitle: "W1-3",
    width: 5,
    height: 4,
    blockLimit: 2,
    data: [
        "#", "#", "#", "#", "#", 
        "#", "#", "#", "#", "#", 
        "C", " ", " ", " ", "F", 
        "#", "#", "#", "#", "#"
    ]
}

export const dialogue = [
    [
        {
            type: "txt",
            text: "น้องไก่ต้องเดินไปที่ธง "
        },
        {
            type: "delay",
            ms: 100
        },
        {
            type: "txt-continue",
            text: " แต่คุณสามารถใช้ได้แค่ 2 บล็อกเท่านั้น"
        },
        {
            type: "delay",
            ms: 200
        },
        {
            type: "txt-continue",
            text: " คุณลองใช้บล็อก"
        },
        {
            type: "guide_block_drag",
            blockIndex: 4
        },
        {
            type: "txt-continue",
            text: " รันคำสั่งในบล็อกซ่ำจนกว่าไก่จะเจอธง"
        },
        {
            type: "txt-continue",
            text: " ดูสิ!"
        }
    ],
]