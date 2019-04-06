<template>
  <div id="app">
    <ScrollBar color="red" :value="pos1" :target="500" @input="input">红球</ScrollBar>
    <ScrollBar color="orange" v-model="pos3" :target="500">红球</ScrollBar>
    <ScrollBar color="blue" :value="pos2" :target="500" @update:value="input">篮球</ScrollBar>
    <button @click="getPosition">获取球 1 的位置</button>
  </div>
</template>

<script>
import ScrollBar from './components/ScrollBar'
export default {
  name: 'app',
  data () {
    return {
      color: 'orange',
      pos1: 50,
      pos2: 100,
      pos3: 60
    }
  },
  components: {
    ScrollBar
  },
  methods: {
    getPosition () {
      console.log();
    },
    input (value) {
      this.pos1 = value;
      this.pos2 = value;
      console.log(value);
    }
  }
}
</script>
