<template>
  <div>
    <h1>App</h1>
    <Bar></Bar>
    <Foo></Foo>
  </div>
</template>

<script>
  import Bar from './components/bar.vue';
  import Foo from './components/foo.vue';
  export default {
    name: "App",
    components: {
      Bar,
      Foo
    }
  }
</script>

<style scoped>

</style>
