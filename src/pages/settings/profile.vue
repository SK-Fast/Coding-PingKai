<template>
    <h2 class="mb-2">ข้อมูลผู้ใช้</h2>
    <div class="card">
        <div class="card-body p-4 d-flex">
            <div class="avatar col-5 img-rounded" style="background-image: url('placeholder-avatar.jpeg');"></div>
            <div class="flex-grow-1 d-flex flex-column ms-md-2">
                <h3>ธรรมจิตร กล่ำจันทร์</h3>
                <p>อีเมล: *************@gmail.com <span class="text-primary"><a>ดูอีเมล</a></span></p>
                <div class="d-flex">
                    <button class="btn btn-primary">ดู Profile</button>
                    <button class="btn btn-primary ms-2">เปลี่ยนรหัสผ่าน</button>
                </div>
            </div>
        </div>
    </div>

    <div class="card mt-2">
        <div class="card-body p-4">
            <p>เกี่ยวกับคุณ...</p>
            <textarea class="form-control" placeholder="เกี่ยวกับคุณ..." rows="10"></textarea>
            <button class="float-end mt-2 btn btn-primary">บันทึก</button>
        </div>
    </div>
</template>

<style scoped>
.avatar {
    width: 120px;
    height: 120px;
}
</style>