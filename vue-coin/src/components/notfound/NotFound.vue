<template>
    <div class="NotFound">
        <h1 class="NotFound-title">Oops! Page not found</h1>
        <router-link to="/" class="NotFound-link">Go to homepage</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.NotFound {
  width: 100%;
  text-align: center;
  margin-top: 60px;
}

.NotFound-title {
  font-weight: 400;
  color: #9cb3c9;
}

.NotFound-link {
  display: inline-block;
  margin-top: 40px;
  color: #fff;
  text-decoration: none;
  border: 1px solid #9cb3c9;
  border-radius: 4px;
  padding: 18px;
  transition: border .2s;
}

.NotFound-link:hover {
  border: 1px solid #fff;
}
</style>