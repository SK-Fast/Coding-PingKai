export const blocks = [
    {
        "kind": "block",
        "type": "go_forward"
    },
    {
        "kind": "block",
        "type": "go_back"
    }
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
    {
        type: "txt",
        text: "ยินดีต้อนรับสู่โค้ดดิ้งปิ้งไก่!"
    },
    {
        type: "txt-continue",
        text: " ผมจะมาสอนการใช้งานหน้าเขียนโค้ดนี้ครับ"
    },
    {
        type: "txt",
        text: "ลองกดตรงคำว่า Blocks ดูสิ จะมี เดินไป ข้างหน้า ข้างหลัง ด้านซ้าย ด้านขวา"
    },
]