<template>
    <div
        class="tutorial-view justify-content-center align-items-center p-md-3 p-0 bg-light-300 border-light-400 border-top">
        <div class="d-flex flex-column flex-md-row">
            <div class="col-md-1 text-center d-md-block d-none">
                <img src="/chick.png" class="chick-frame mb-2">
            </div>
            <div class="ms-md-3 ms-0 flex-grow-1">
                <div class="card bg-light-200 p-md-0 p-2 h-100 w-100">
                    <div class="card-body d-flex flex-column text-box-body">
                        <div class="text-scrollable">
                            <p ref="textBox">{{ textSource }}</p>
                        </div>

                        <div>
                            <div>
                                <div class="float-end">
                                    <button class="btn btn-secondary me-2">ขั้นตอนที่แล้ว</button>
                                    <button class="btn btn-primary">ไปต่อ</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Typewriter from 'typewriter-effect/dist/core';

const textBox = ref(null)
let typewriter;

onMounted(() => {
    typewriter = new Typewriter(textBox.value, {
        cursor: '',
        delay: 20,
        deleteSpeed: 0
    });

    typewriter
  .typeString('สวัสดีคับพี่')
  .start();
})
</script>

<style scoped>
.tutorial-view {
    height: 200px;
}

.text-box-body {
    width: 100%;
    height: 100%;
}

.text-scrollable {
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;
}

.text-scrollable p {
    width: 100%;
    display: block;
    word-wrap: break-word;
    margin: 0;
}
</style>