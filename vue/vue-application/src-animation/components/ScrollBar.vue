<template>
  <div class="ball" :style="style" :id="ballId">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'ScrollBar',
    props: {
      color: {
        type: String,
        default: '#000'
      },
      value: {
        type: Number,
        default: 0
      },
      target: {
        type: Number,
        default: 300
      }
    },
    computed: {
      style() {
        return {background: this.$props.color};
      },
      ballId() {
        return `ball` + this._uid
      }
    },
    mounted() {
      let ball = document.getElementById(this.ballId);
      let timer;
      let fn = () => {
        let left = this.value;
        if (left >= this.target) {
          return cancelAnimationFrame(timer);
        }
        this.$emit('input', left + 2);
        ball.style.transform = `translate(${this.value}px)`;
        timer = requestAnimationFrame(fn);
      };
      timer = requestAnimationFrame(fn);
    }
  }
</script>

<style lang="less">
  .ball {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    text-align: center;
    line-height: 100px;
  }
</style>
