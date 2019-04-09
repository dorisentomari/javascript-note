<template>
  <div id="app">
    <router-link to="/bar">bar</router-link>
    <router-link to="/foo">foo</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    metaInfo: {
      title: '默认的 title'
    }
  }
</script>

<style scoped>

</style>
