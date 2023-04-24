export const blocks = [
    {
        "kind": "label",
        "text": "บล็อก",
        "web-class": "type-header"
    },
    {
        "kind": "block",
        "type": "chickdraw_turn_right",
        "inputs": {
            "DEGREES": {
                "shadow": {
                    "type": "chickdraw_angle_def",
                    "fields": {
                        "DEGREES": 45
                    }
                }
            },
        }
    },
    {
        "kind": "block",
        "type": "chickdraw_turn_left",
        "inputs": {
            "DEGREES": {
                "shadow": {
                    "type": "chickdraw_angle_def",
                    "fields": {
                        "DEGREES": 45
                    }
                }
            },
        }
    },
    {
        "kind": "block",
        "type": "chickdraw_forward",
        "inputs": {
            "FORCE": {
                "shadow": {
                    "type": "chickdraw_walk_unit",
                    "fields": {
                        "FORCE": "50"
                    }
                }
            },
        }
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
            text: "ยินดีต้อนรับสู่โค้ดดิ้งปิ้งไก่!"
            
        },
    ]
]