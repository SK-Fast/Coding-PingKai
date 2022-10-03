<template>
    <h1>World 1</h1>
    <div class="container">
        <div class="stage"><h1>1</h1></div>
        <img src="@/assets/LockBlue.png" alt="sorry"/>
        <img src="@/assets/LockBlue.png" alt="sorry"/>
        <img src="@/assets/LockBlue.png" alt="sorry"/>
        <img src="@/assets/LockBlue.png" alt="sorry"/>
        <img src="@/assets/LockBlue.png" alt="sorry"/>
        <img src="@/assets/LockBlue.png" alt="sorry"/>
        <img src="@/assets/LockBlue.png" alt="sorry"/>
        <img src="@/assets/LockBlue.png" alt="sorry"/>
        <img src="@/assets/LockBlue.png" alt="sorry"/>
    </div>
</template>
<style scoped>
.container {
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
grid-template-rows: 1fr 1fr; 
column-gap: 10px;
row-gap: 50px;
}
.stage {
display: flex;
justify-content: center;
width: 140px;
align-items: center;
background-image: url("@/assets/Blue.png");
background-repeat: no-repeat;
}
</style>