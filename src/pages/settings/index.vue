<template>
<div class="container">
    <h2 class="col-5 margin">การตั้งค่า</h2>   
    <button class="som" @click="() =>this.$router.push('/profile')">
        ข้อมูลผู้ใช้
    </button>
    <button class="con" @click="() =>this.$router.push('/password')">
       รหัสผ่าน
    </button>
    <button class="con" @click="">การตั้งค่าแอป</button>
    <button class="com" @click="">ลงชื่อออก</button>
</div> 
</template>
<style scoped>
.som {
display: flex;
flex-direction: row;
align-items: center;
padding: 10px 100px;
gap: 10px;


border: none;
background: #FF7733;

box-shadow: inset 0px -1px 0px rgba(21, 21, 21, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.25);
border-radius: 10px;
flex: none;
order: 0;
flex-grow: 0;
}
.con {
    display: flex;
flex-direction: row;
align-items: center;
padding: 10px 100px;
gap: 10px;

border: none;
background: rgba(0, 0, 0, 0.1);

box-shadow: inset 0px -1px 0px rgba(21, 21, 21, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.25);
border-radius: 10px;

/* Inside auto layout */

flex: none;
order: 1;
flex-grow: 0;
}
.com {
    display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 100px;
gap: 10px;


color: #F23051;

border: 2px solid #F23051;

box-shadow: inset 0px -1px 0px rgba(21, 21, 21, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.25);
border-radius: 10px;


flex: none;
order: 3;
flex-grow: 0;
}
.margin {
    margin-right: 500px;
}
</style>