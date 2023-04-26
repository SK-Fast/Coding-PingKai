export const blocks = [
    {
        "kind": "label",
        "text": "บล็อก",
        "web-class": "type-header"
    },
    {
        "kind": "block",
        "type": "chickdraw_forward",
    },
    {
        "kind": "label",
        "text": "ประเภทตัวแปร",
        "web-class": "type-header"
    },
    {
        "kind": "block",
        "type": "chickdraw_walk_unit"
    },
]

export const levelKind = () => { return import("@/lesson_kind/chickdraw.js") }
export const levelData = {
    title: "การวาดพื้นฐาน",
    data: [{ "from": [0, 0], "to": [50, 0] }]
}

export const dialogue = [
    [
        {
            type: "txt",
            text: "ว้าว ขอแสดงความยินดีด้วยที่คุณมาถึงด่านนี้!"
        },
    ],
    [
        {
            type: "txt",
            text: "ด่านนี้ จะต้องให้ตัวเดิน วาดเส้นทับเส้นสีจางให้หมด! ห้ามวาดเกินด้วยนะ"
        },
    ],
    [
        {
            type: "txt",
            text: "ลองใช้บล็อกด้านข้างที่เขียนว่า"
        },
        {
            type: "focus_block",
            blockIndex: 0
        },
        {
            type: "txt-continue",
            text: " ไปข้างหน้า มาวางดูสิ"
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
            text: "แล้วลองเอาบล็อก"
        },
        {
            type: "vid",
            src: "/video/draw_step1.mp4"
        },
        {
            type: "focus_block",
            blockIndex: 1
        },
        {
            type: "txt-continue",
            text: " 5 ก้าว มาต่อด้านหลังบล็อก ไปข้างหน้า ดูสิ!"
        },
        {
            type: "delay",
            ms: 4000,
            mobile: true,
        },
        {
            type: "vid-close",
            mobile: true,
        },
        {
            type: "wait_block_paste",
            count: 2,
            autoJump: true
        },
    ],
    [
        {
            type: "txt",
            text: "หลังจากนั้น ลองเปลี่ยนค่าของบล็อกก้าว แล้วรันโค้ดดูสิ!"
        },
        {
            type: "vid",
            src: "/video/draw_step2.mp4"
        },
        {
            type: "delay",
            ms: 8000,
            mobile: true,
        },
        {
            type: "vid-close",
            mobile: true,
        },
    ],
    
]