<template>
    <div class="Loading" :style="{ width, height }"/>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '28px',
    },
    height: {
      type: String,
      default: '28px',
    }
  }
}
</script>

<style>
.Loading {
  display: inline-block;
  border: 2px solid #fff;
  border-right-color: transparent;
  border-radius: 50%;
  animation: rotate 1s infinite linear;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
}
</style>