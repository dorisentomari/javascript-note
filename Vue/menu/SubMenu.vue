<template>
  <div>
    <div class="title" @click="change">
      <slot name="title"></slot>
    </div>
    <div v-show="flag" class="sub">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SubMenu",
    data() {
      return {
        flag: false
      }
    },
    methods: {
      change() {
        this.flag = !this.flag;
      }
    }
  }
</script>

<style scoped>
.sub {
  padding-left: 20px;
}
</style>
