<template>
  <div>
    <h1 class="red">bar</h1>
    <button @click="change">bar click</button>
  </div>
</template>

<script>
  export default {
    name: "bar",
    methods: {
      change() {
        console.log('bar click');
      }
    }
  }
</script>

<style scoped>
  .red {
    background: red;
  }
</style>
