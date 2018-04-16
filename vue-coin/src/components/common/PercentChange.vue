<template>
    <div>
        <span v-if="percent > 0" class="percent-raised">{{percent}}% &uarr;</span>
        <span v-else-if="percent < 0" class="percent-fallen">{{percent}}% &darr;</span>
        <span v-else>{{percent}}</span>
    </div>
</template>

<script>
export default {
    props: {
        percent: {
            type: Number,
            required: true,
        },
    }
}
</script>