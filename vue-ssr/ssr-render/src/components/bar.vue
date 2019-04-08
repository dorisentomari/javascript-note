<template>
  <div>
    <h1 class="red">bar</h1>
    <h2>{{$store.state.lesson}}</h2>
    <button @click="change">bar click</button>
  </div>
</template>

<script>
  export default {
    name: "bar",
    // 异步数据获取，在服务端运行，客户端不会运行这个方法
    // 这里边的代码都是异步的，可以全部采用 Promise
    asyncData ({store}) {
      return store.dispatch('SET_LESSON', 'NEW VUE SSR');
    },
    methods: {
      change() {
        console.log('bar click');
      }
    },
    mounted () {
      return this.$store.dispatch('SET_LESSON', 'NEW VUE SSR');
    }
  }
</script>

<style scoped>
  .red {
    background: red;
  }
</style>
