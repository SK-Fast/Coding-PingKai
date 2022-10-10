<script setup>
import { ref } from "vue";
import ModalBack from "./ModalBack.vue"
</script>  

<script>
const isopen = ref(false)
const firstTime = ref(true)

export default {
  methods: {
    openModal: () => {
      isopen.value = true
      firstTime.value = false
    },
    closeModal: () => {
      isopen.value = false
    }
  }
}
</script>

<template>
  <ModalBack :class='[{ "modal-opened": isopen }, { "modal-closed": !isopen}, { "d-none": firstTime }]'>
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-light-300">
        <div class="modal-header">
          <button type="button" @click="closeModal" class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </ModalBack>
</template>
