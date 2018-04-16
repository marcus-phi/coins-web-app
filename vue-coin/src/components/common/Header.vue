<template>
    <div class="Header">
        <img src="./logo.png" alt="logo" class="Header-logo"/>
    </div>
</template>

<script>
export default {
}
</script>

<style>
.Header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #0f273d;
  width: 100%;
  height: 80px;
}

.Header-logo {
  position: absolute;
  top: 30px;
  left: 20px;
  width: 90px;
}

@media (max-width: 700px) {
  .Header-logo {
    display: none;
  }
}
</style>