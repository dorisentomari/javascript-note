<template>
  <div>
    <h1>{{msg}}</h1>
    <menu>
      <template v-for="(menu, index) in menuList">
        <menu-item v-if="!menu.children" :key="index">{{menu.title}}</menu-item>
        <!-- 把重复的部分抽离出去 -->
        <re-sub-menu v-else :key="index" :data="menu"></re-sub-menu>
      </template>
    </menu>
  </div>
</template>

<script>
  import Menu from './Menu'
  import MenuItem from './MenuItem'
  import SubMenu from './SubMenu'
  import ReSubMenu from './ReSubMenu'

  export default {
    name: "App",
    data() {
      return {
        msg: '无限分级，递归组件，树结构(菜单)',
        menuList: [
          {
            title: '菜单 1',
            children: [
              {
                title: '菜单 1-1',
                children: [
                  {title: '菜单 1-1-1'},
                  {title: '菜单 1-1-2'},
                ]
              },
              {
                title: '菜单 1-2',
                children: [
                  {title: '菜单 1-2-1'},
                  {title: '菜单 1-2-2'},
                ]
              },
              {
                title: '菜单 1-3',
                children: [
                  {title: '菜单 1-3-1'},
                  {title: '菜单 1-3-2'},
                ]
              }
            ]
          },
          {
            title: '菜单 2',
            children: [
              {
                title: '菜单 2-1',
                children: [
                  {title: '菜单 2-1-1'},
                  {title: '菜单 2-1-2'},
                ]
              },
              {
                title: '菜单 2-2',
                children: [
                  {title: '菜单 2-2-1'},
                  {title: '菜单 2-2-2'},
                ]
              },
              {
                title: '菜单 2-3',
                children: [
                  {title: '菜单 2-3-1'},
                  {title: '菜单 2-3-2'},
                ]
              }
            ]
          },
          {
            title: '菜单 3',
            children: [
              {
                title: '菜单 3-1',
                children: [
                  {title: '菜单 3-1-1'},
                  {title: '菜单 3-1-2'},
                ]
              },
              {
                title: '菜单 3-2',
                children: [
                  {title: '菜单 3-2-1'},
                  {title: '菜单 3-2-2'},
                ]
              },
              {
                title: '菜单 3-3',
                children: [
                  {title: '菜单 3-3-1'},
                  {title: '菜单 3-3-2'},
                ]
              }
            ]
          },
        ]
      }
    },
    components: {
      Menu,
      MenuItem,
      SubMenu,
      ReSubMenu
    }
  }
</script>

<style scoped>

</style>
<!--
<sub-menu>
        <template #title>
          菜单 4
        </template>
        <menu-item>菜单 4-1</menu-item>
        <menu-item>菜单 4-2</menu-item>
      </sub-menu>
<sub-menu>
          <template #title>
            菜单 4-3
          </template>
          <menu-item>菜单 4-3-1</menu-item>
          <menu-item>菜单 4-3-2</menu-item>
          <menu-item>菜单 4-3-3</menu-item>
          <sub-menu>
            <template #title>
              菜单 4-4-4
            </template>
            <menu-item>菜单 4-4-4-1</menu-item>
            <menu-item>菜单 4-4-4-2</menu-item>
            <menu-item>菜单 4-4-4-3</menu-item>
          </sub-menu>
        </sub-menu>
-->
