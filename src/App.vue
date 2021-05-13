<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  watch: {

  }
}
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Arial', 'Microsoft YaHei';
}
input {
  font-family: 'Arial', 'Microsoft YaHei';
}

.amap-logo {
  display: none !important;
  visibility: hidden !important;
}

.amap-copyright {
  display: none !important;
  visibility: hidden !important;
}
</style>
