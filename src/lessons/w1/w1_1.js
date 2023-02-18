export const blocks = [
    {
        "kind": "block",
        "type": "go_up"
    },
    {
        "kind": "block",
        "type": "go_down"
    },
]

export const levelKind = () => {return import("@/lesson_kind/chickwalk.js")}
export const levelData = {
    width: 5,
    height: 4,
    data: [
        "#", "#", "F", "#", "#", 
        "#", "#", " ", "#", "#", 
        "#", "#", " ", "#", "#", 
        "#", "#", "C", "#", "#"
    ]
}

export const dialogue = [
    [
        {
            type: "txt",
            text: "ยินดีต้อนรับสู่โค้ดดิ้งปิ้งไก่!"
        },
        {
            type: "delay",
            ms: 200
        },
        {
            type: "txt-continue",
            text: "ผมจะมาสอนการใช้งานหน้าเขียนโค้ดนี้ครับ"
        },
    ],
    [
        {
            type: "txt",
            text: "ลองดูบล็อกทางด้านข้างดูสิ จะมี <b>ขึ้นไปข้างบน</b>"
        },
        {
            type: "focus_block",
            blockType: "go_up"
        },
        {
            type: "delay",
            ms: 200
        },
        {
            type: "txt-continue",
            text: "และลงไปข้างล่าง"
        },
        {
            type: "focus_block",
            blockType: "go_down"
        },
    ],
    [
        {
            type: "txt",
            text: "และคุณเห็นไก่ทางนั้นใช่ไหม นั้นคือ Scene ของเรานั้นเอง!"
        },
        {
            type: "focus_element",
            id: "runResult"
        },
        {
            type: "enterPlayMode"
        },
        {
            type: "delay",
            ms: 1000
        },
        {
            type: "exitPlaymode"
        },
    ],
    [
        {
            type: "txt",
            text: "เราต้องลากบล็อกเพื่อสั่งให้ไก่เดินไปหาธง"
        },
    ],
    [
        {
            type: "txt",
            text: "ลองลากบล็อก "
        },
        {
            type: "guide_block_drag",
            blockType: "go_up"
        },
        {
            type: "txt-continue",
            text: "<b>ขึ้นไปข้างบน</b> ลงไปวางบนที่ว่างใน Editor ดูสิ"
        },
    ],
]