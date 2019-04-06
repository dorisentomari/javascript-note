<template>
  <div>
    <h1>User Detail</h1>
    <h1><input type="text" v-model="msg"></h1>
  </div>
</template>

<script>
  // 组件切换时，会触发 beforeRouteLeave 方法
  // 组件渲染完成后，会调用当前 beforeRouteEnter 方法，这个方法实际上是最后调用的
  // 当属性发生变化时，并没有重新加载组件，但是会触发 beforeRouteUpdate 方法
  export default {
    name: "UserDetail",
    data() {
      return {
        msg: ''
      }
    },
    // 路由钩子
    beforeRouteLeave (to, from, next) {
      console.log(to)
      console.log(from)
      if (this.msg) {
        let confirm = window.confirm('需要切换吗？');
        if (confirm) {
          next();
        }
      } else {
        next();
      }
    }
  }
</script>

<style scoped>

</style>
