<template>
  <sub-menu>
    <template #title>
      {{data.title}}
    </template>
    <template v-for="(child, index) in data.children">
      <menu-item v-if="!child.children" :key="index">{{child.title}}</menu-item>
      <re-sub-menu v-else :key="index" :data="child"></re-sub-menu>
    </template>
  </sub-menu>
</template>

<script>
  import SubMenu from './SubMenu';
  import MenuItem from './MenuItem';

  export default {
    name: "ReSubMenu",
    props: {
      data: {
        type: Object,
        default: () => ({})
      }
    },
    components: {
      SubMenu,
      MenuItem
    },
  };
</script>

<style scoped>

</style>
