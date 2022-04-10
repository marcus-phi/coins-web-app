<template>
    <div class="Header">
      <router-link to="/">
        <img src="./logo.png" alt="logo" class="Header-logo"/>
      </router-link>

      <Search/>
    </div>
</template>

<script>
import Search from './Search.vue';

export default {
  components: {
    Search
  }
}
</script>

<style>
.Header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #0F3D0F;
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