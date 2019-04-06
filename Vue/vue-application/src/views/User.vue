<template>
  <div>
    <div class="col-md-6">
      <ul class="nav">
        <li>
          <router-link :to="{path: '/user/user-detail'}">添加用户</router-link>
        </li>
        <li>
          <router-link :to="{path: '/user/user-list'}">用户列表</router-link>
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "User"
  }
</script>

<style scoped>

</style>
