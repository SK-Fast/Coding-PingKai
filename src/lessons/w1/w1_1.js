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
    title: "การใช้งานพื้นฐาน",
    altTitle: "W1-1",
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
            text: " ผมจะมาสอนการใช้งานหน้าเขียนโค้ดนี้ครับ"
        },
    ],
    [
        {
            type: "txt",
            text: "ลองดูบล็อกทางด้านข้างดูสิ จะมี ขึ้นไปข้างบน"
        },
        {
            type: "focus_block",
            blockIndex: 0
        },
        {
            type: "delay",
            ms: 200
        },
        {
            type: "txt-continue",
            text: " และลงไปข้างล่าง"
        },
        {
            type: "focus_block",
            blockIndex: 1
        },
    ],
    [
        {
            type: "txt",
            text: "และคุณเห็นไก่ทางนั้นใช่ไหม นั้นคือ Scene ของเรานั้นเอง!"
        },
        {
            type: "focus_element",
            id: "runResult",
        },
        {
            type: "delay",
            ms: 200,
        },
        {
            type: "enterPlayMode",
            mobile: true,
        },
        {
            type: "delay",
            ms: 3000,
            mobile: true,
        },
        {
            type: "exitPlaymode",
            mobile: true,
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
            blockIndex: 0
        },
        {
            type: "txt-continue",
            text: "ขึ้นไปข้างบน ลงไปวางบนที่ว่างใน Editor ดูสิ"
        },
        {
            type: "wait_block_paste",
            count: 1,
            autoJump: true
        },
    ],
    [
        {
            type: "txt",
            text: "ดีมาก! ทีนี้ ลองนำบล็อกอีก 2 บล็อก มาต่อกันดู"
        },
        {
            type: "wait_block_paste",
            count: 3,
            autoJump: true
        },
    ],
    [
        {
            type: "txt",
            text: "ทีนี้ ลองรันโค้ดดูสิ!"
        },
        {
            type: "focus_element",
            id: "runCodeBtn"
        },
        {
            type: "focus_element",
            id: "playModeBtn"
        },
    ],
]