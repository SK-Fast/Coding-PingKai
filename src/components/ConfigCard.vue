<template>
    <div class="card mb-2">
        <div class="card-body row">
            <div class="col-md-3">
                <h5>{{ title }}</h5>
                <p class="text-muted m-0">{{ desc }}</p>
            </div>
            <div class="col-md-9 d-flex justify-content-end align-items-center">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['title', 'desc'])

</script>