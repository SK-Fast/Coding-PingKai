<script>
 const I = () => {
 console.log(`Yes`)
 }
 const N = () => {
 console.log(`No`)
 }
</script>
<template>
        <div class="class">
                <img src="@/assets/exit.png" alt="exit" />
        </div>
        <div class="reflextion">
        <img @click="I" src="@/assets/yes.png" alt="yes" />
        <img @click="N" src="@/assets/no.png" alt="no" />
        </div>
</template>
<style scoped>
.class {
       display: flex;
       justify-content: center;
}
.reflextion {
       display: flex;
       justify-content: space-evenly;
}
</style>