export const blocks = [
    {
        "kind": "label",
        "text": "บล็อก",
        "web-class": "type-header"
    },
    {
        "kind": "block",
        "type": "chickdraw_turn_right",

    },
    {
        "kind": "block",
        "type": "chickdraw_turn_left",
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
        "type": "chickdraw_angle_def"
    },
    {
        "kind": "block",
        "type": "chickdraw_walk_unit"
    },
]

export const levelKind = () => { return import("@/lesson_kind/chickdraw.js") }
export const levelData = {
    title: "การวาดพื้นฐาน",
    data:  [{"from":[0,0],"to":[0,-50]}]
}

export const dialogue = [
    [
        {
            type: "txt",
            text: "ครั้่งนี้ เราต้องเดินไป 50 ก้าวเหมือนเดิม แต่ว่าเส้นทางไปด้านบน!"
        },
    ],
    [
        {
            type: "txt",
            text: "เราต้องหมุนตัวเดินไป 90 องศาก่อน"
        },
        {
            type: "delay",
            ms: 500,
        },
        {
            type: "txt-continue",
            text: " ลองใช้บล็อก "
        },
        {
            type: "txt-continue",
            text: " หมุนไปทางซ้าย(⥀) "
        },
        {
            type: "focus_block",
            blockIndex: 0
        },
        {
            type: "txt-continue",
            text: " ดูสิ!"
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
            text: "ดีมาก! หลังจากนั้น ลองเอาบล็อก องศา"
        },
        {
            type: "focus_block",
            blockIndex: 3
        },
        {
            type: "txt-continue",
            text: " มาวางด้านหลังบล็อก หมุนไปทางซ้าย(⥀) ดูสิ"
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
            text: "เก่งมาก! หลังจากนั้น ลองกดที่ 45ᵒ แล้วเปลี่ยนค่าขององศาให้เป็น 90ᵒ ดูสิ!"
        },
        {
            type: "delay",
            ms: 500,
        },
        {
            type: "txt-continue",
            text: " หลังจากนั้น เอาบล็อกไปข้างหน้า และ 5 ก้าวมาต่อกัน เปลี่ยนเป็น 50 ก้าวแล้วรันได้เลย!"
        },
    ],
]