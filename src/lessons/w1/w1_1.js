export const blocks = [
    {
        "kind": "block",
        "type": "go_forward"
    },
    {
        "kind": "block",
        "type": "go_backward"
    },
]

export const levelKind = () => {return import("@/lesson_kind/chickwalk.js")}
export const levelData = {
    ratio: [1, 0.9],
    title: "การใช้งานพื้นฐาน",
    altTitle: "W1-1",
    width: 5,
    blockLimit: 3,
    height: 4,
    achievement: "the_beginnings",
    startAngle: 0,
    data: [
        "#", "#", "#", "#", "#", 
        "#", "#", "F", "#", "#", 
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
            type: "vid",
            src: "/video/step1.mp4"
        },
        {
            type: "txt",
            text: "ในบริเวณเขียนโค้ดของเรา จะมีบล็อก "
        },
        {
            type: "delay",
            ms: 200
        },
        {
            type: "txt-continue",
            text: " เมื่อเริ่ม"
        },
    ],
    [
        {
            type: "txt-continue",
            text: " บล็อกต่างๆ ต้องเอามาวางไว้ในบล็อกนี้เท่านั้น"
        },
        {
            type: "delay",
            ms: 200
        },
        {
            type: "txt-continue",
            text: " ถึงจะทำงานได้"
        },
    ],
    [
        {
            type: "vid",
            src: "/video/step2.mp4"
        },
        {
            type: "txt",
            text: "ลองดูแถบด้านซ้ายดูสิ "
        },
        {
            type: "delay",
            ms: 200
        },
        {
            type: "txt-continue",
            text: " นั้นคือบล็อกต่างๆ นั่นเอง!"
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
            text: "ตอนนี้ เราต้องให้น้องไก่เดินไปที่ธงให้ได้"
        },
        {
            type: "delay",
            ms: 200
        },
        {
            type: "txt-continue",
            text: " โดยที่น้องไก่ต้องเดินไป 2 ก้าว"
        },
    ],
    [
        {
            type: "vid",
            src: "/video/step3.mp4"
        },
        {
            type: "vid-close",
            mobile: true,
        },
        {
            type: "txt",
            text: "ลองเอาบล็อก ไปข้างหน้า มาวางในบริเวณเขียนโค้ดดูสิ!"
        },
        {
            type: "wait_block_paste",
            count: 1,
            autoJump: true
        },
    ],
    [
        {
            type: "vid",
            src: "/video/step4.mp4"
        },
        {
            type: "vid-close",
            mobile: true,
        },
        {
            type: "txt",
            text: "เก่งมาก! ลองเอาอีกบล็อกมาวางดูสิ"
        },
        {
            type: "wait_block_paste",
            count: 2,
            autoJump: true
        },
    ],
    [
        {
            type: "vid",
            src: "/video/step5.mp4"
        },
        {
            type: "txt",
            text: "เก่งมาก! บล็อกแต่ละบล็อกที่คุณวางไปจะทำงานจากบนลงล่างน่ะ!"
        },
    ],
    [
        {
            type: "vid-close"
        },
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
        {
            type: "delay",
            ms: 1000,
        },
        {
            type: "txt",
            text: "เราสามารถดูผลลัพธ์ของโค้ดเราได้จากที่นี้"
        },

    ],
    [
        {
            type: "txt",
            text: "เอาล่ะ ทีนี้ ลองรันโค้ดดูสิ!"
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


export const pythonDialogue = [
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
            text: " ผมจะมาสอนการใช้งานหน้าเขียนโค้ดนี้ครับ (ฉบับภาษาไพทอน!)"
        },
    ],
    [
        {
            type: "vid",
            src: "/video/step1.mp4"
        },
        {
            type: "txt",
            text: "ในบริเวณเขียนโค้ดของเรา จะมีบล็อก "
        },
        {
            type: "delay",
            ms: 200
        },
        {
            type: "txt-continue",
            text: " เมื่อเริ่ม"
        },
    ],
    [
        {
            type: "txt-continue",
            text: " บล็อกต่างๆ ต้องเอามาวางไว้ในบล็อกนี้เท่านั้น"
        },
        {
            type: "delay",
            ms: 200
        },
        {
            type: "txt-continue",
            text: " ถึงจะทำงานได้"
        },
    ],
    [
        {
            type: "vid",
            src: "/video/step2.mp4"
        },
        {
            type: "txt",
            text: "ลองดูแถบด้านซ้ายดูสิ "
        },
        {
            type: "delay",
            ms: 200
        },
        {
            type: "txt-continue",
            text: " นั้นคือบล็อกต่างๆ นั่นเอง!"
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
            text: "ตอนนี้ เราต้องให้น้องไก่เดินไปที่ธงให้ได้"
        },
        {
            type: "delay",
            ms: 200
        },
        {
            type: "txt-continue",
            text: " โดยที่น้องไก่ต้องเดินไป 2 ก้าว"
        },
    ],
    [
        {
            type: "vid",
            src: "/video/step3.mp4"
        },
        {
            type: "vid-close",
            mobile: true,
        },
        {
            type: "txt",
            text: "ลองเอาบล็อก ไปข้างหน้า มาวางในบริเวณเขียนโค้ดดูสิ!"
        },
        {
            type: "wait_block_paste",
            count: 1,
            autoJump: true
        },
    ],
    [
        {
            type: "vid",
            src: "/video/step4.mp4"
        },
        {
            type: "vid-close",
            mobile: true,
        },
        {
            type: "txt",
            text: "เก่งมาก! ลองเอาอีกบล็อกมาวางดูสิ"
        },
        {
            type: "wait_block_paste",
            count: 2,
            autoJump: true
        },
    ],
    [
        {
            type: "vid",
            src: "/video/step5.mp4"
        },
        {
            type: "txt",
            text: "เก่งมาก! บล็อกแต่ละบล็อกที่คุณวางไปจะทำงานจากบนลงล่างน่ะ!"
        },
    ],
    [
        {
            type: "vid-close"
        },
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
        {
            type: "delay",
            ms: 1000,
        },
        {
            type: "txt",
            text: "เราสามารถดูผลลัพธ์ของโค้ดเราได้จากที่นี้"
        },

    ],
    [
        {
            type: "txt",
            text: "เอาล่ะ ทีนี้ ลองรันโค้ดดูสิ!"
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