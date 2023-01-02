<template>
<h2 class="mb-2">เปลี่ยนรหัสผ่าน</h2>
    <div class="card">
        <div class="card-body p-4 d-flex flex-column flex-md-row">
            <div class="col-md-5 me-0 me-md-3 mb-2 mb-md-0 flex-grow-1">
                <form class="w-100">
                    <input class="form-control mb-2" placeholder="รหัสผ่านเก่า" />
                    <input class="form-control mb-2" placeholder="รหัสผ่านใหม่" />
                    <input class="form-control mb-1" placeholder="ยืนยันรหัสผ่านใหม่" />
                    <button class="btn btn-primary col-md-4" type="submit">เปลี่ยนรหัสผ่าน</button>
                </form>
            </div>

            <div class="card col-md-5">
                <div class="card-body">
                    <h5>คำแนะนำสำหรับรหัสผ่านใหม่ของท่าน</h5>
                    <ul>
                        <li>อย่าใช้ข้อมูลส่วนตัว เช่นวันเกิด</li>
                        <li>ควรมีเครื่องหมายหรือตัวเลขรวมด้วย</li>
                        <li>อย่าใช้รหัสผ่านซ้ำกับรหัสอื่น</li>
                    </ul>
                </div>
            </div>

        </div>
    </div>

</template>  
<style scoped>
.con {
    color: red;
}
.gg {
    background-color: aqua;
}
</style>