<script>

</script>
<template>
    <div class="container">
        <div class="d-flex flex-column align-items-center p-2">
            <div class="d-flex flex-column align-items-center">
                <div class="avatar col-5 img-rounded" style="background-image: url('placeholder-avatar.jpeg');"></div>
                <div class="d-flex flex-column align-items-center ms-2 ms-md-0">
                    <h2 class="mt-3">ธรรมจิตร กล่ำจันทร์</h2>
                    <p class="m-0 mt-1 text-monospace">
                        <span class="text-primary me-2">STREAK 0</span>
                        <span class="text-warning">EXP 0</span>
                    </p>
                </div>
            </div>
        </div>

        <div class="d-flex flex-column align-items-center mt-2">
            <div class="card col-md-6">
                <div class="card-body">
                    <div class="d-flex">
                        <div class="flex-grow-1 bg">
                            <p class="text-muted">ต่อจากครั้งที่แล้ว</p>
                            <h3>พื้นฐาน</h3>
                            <p class="m-0">พื้นฐานในการใช้ Coding PingKai</p>
                        </div>

                        <div class="col-md-3 d-flex align-items-end justify-content-end">
                            <button class="btn btn-primary">ไปต่อ</button>
                        </div>
                    </div>
                    <div class="progress mt-2">
                      <div class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>

            <div class="card col-md-6 mt-2">
                <div class="card-body">
                    <div class="d-flex">
                        <p class="text-muted">ด่านต่างๆ</p>
                        <div class="flex-grow-1"></div>
                        <router-link to="/Moreinfo1" class="float-end text-primary">ดูทั้งหมด</router-link>
                    </div>

                    <div class="d-flex">
                        <div class="card col-4 btn-transparent">
                            <div class="level-card-img" style="background-image: url('tutorial.png')"></div>
                            
                            <div class="p-2 mt-1">
                                <h5>พื้นฐาน</h5>
                                <p class="text-muted m-0">พื้นฐานในการใช้ Coding PingKai</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="card col-md-6 mt-2">
                <div class="card-body">
                    <div class="d-flex">
                        <p class="text-muted">รางวัลต่างๆ</p>
                        <div class="flex-grow-1"></div>
                        <a class="float-end text-primary">ดูทั้งหมด</a>
                    </div>

                    <div class="d-flex">
                        <div class="card col-3 btn-transparent">
                            <img src="@/assets/badges/the_beginnings.png" class="img-fluid badge-img">
                            
                            <div class="p-2 mt-1 text-center">
                                <h5>จุดเริ่มต้น</h5>
                                <p class="text-muted m-0">สำหรับคนที่ผ่านด้านแรก</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.avatar {
    width: 150px;
    height: 150px;
}

.level-card-img {
    height: 150px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 10px;
}

.badge-img {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
.bg {
    background: linear-gradient(90deg, rgba(255,255,255,1) 37%, rgba(0,0,0,1) 100%);
}
</style>