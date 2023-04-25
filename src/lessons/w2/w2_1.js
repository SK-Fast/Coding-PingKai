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
    data: [{ "from": [0, 0], "to": [50, 0] }]
}

export const dialogue = [
    [
        {
            type: "txt",
            text: "ว้าว ขอแสดงความยินดีด้วยที่คุณมาถึงด่านนี้!"
            
        },
        {
            type: "txt",
            text: "ลองใช้ Block ด้านข้างที่เขียนว่า ไปข้างหน้า แล้วลาก Block ที่เขียนว่า จำนวนก้าวดูสิ"
            
        },
    ]
    
]