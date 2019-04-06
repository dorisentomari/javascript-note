<template>
  <div>
    <h1>Home</h1>
    <h1>{{lesson}}</h1>
  </div>
</template>

<script>
  import {vuexMixins} from "../mixins";

  export default {
    name: "Home",
    mixins: [vuexMixins]
  }
</script>

<style scoped>

</style>
