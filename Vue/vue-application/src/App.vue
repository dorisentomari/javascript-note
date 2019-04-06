<template>
  <div id="app">
    <div class="nav navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <div class="navbar-brand">
            管理
          </div>
        </div>
        <ul class="navbar-nav">
          <li>
            <router-link :to="{path: '/home'}">home</router-link>
          </li>
          <li>
            <router-link :to="{path: '/user'}">user</router-link>
          </li>
          <li>
            <router-link :to="{path: '/profile'}">profile</router-link>
          </li>
          <li>
            <router-link :to="{path: '/login'}">login</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <router-view></router-view>
      <router-view name="name"></router-view>
      <router-view name="version"></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  .nav {
    display: flex;
    justify-content: flex-start;
    list-style: none;
  }

  .nav li {
    width: 50px;
  }
</style>
