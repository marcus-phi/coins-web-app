<template>
    <span>
        <span v-if="percent > 0" class="percent-raised">{{percent}}% &uarr;</span>
        <span v-else-if="percent < 0" class="percent-fallen">{{percent}}% &darr;</span>
        <span v-else>{{percent}}</span>
    </span>
</template>

<script>
export default {
    props: {
        percent: {
            required: true,
        },
    }
}
</script>