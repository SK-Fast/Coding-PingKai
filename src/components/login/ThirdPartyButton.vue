<template>
    <button class="btn btn-with-left btn-light-100 w-100 text-start p-0 mb-2"><div class="button-left"><img width="30" height="30" :src="image" /></div> {{ text }}</button>
</template>

<script>
export default {
  props: {
    text: String,
    image: String,
  },
}
</script>