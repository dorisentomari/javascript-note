<template>
  <div>
    <h1>Home</h1>
    <h1>{{lesson}}
      <button @click="showClick">click</button>
    </h1>
    <!-- name="bounce"-->
    <transition
      enter-active-class="bounceIn"
      leave-active-class="bounceOut"
    >
      <h1 v-show="isShow">{{name | toUpper(3)}}</h1>
    </transition>
    <!--<div class="box" v-click-outside="hide">-->
      <!--<h1><input type="text" @focus="show"></h1>-->
      <!--<div class="content" style="width: 100px; height: 100px; background: red;" v-if="isShow">-->
        <!--content-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import {vuexMixins} from "../mixins";

  export default {
    name: "Home",
    mixins: [vuexMixins],
    data() {
      return {
        isShow: false,
        name: 'sherry'
      }
    },
    directives: {
      'click-outside'(el, bindings, vnode) {
        document.addEventListener('click', e => {
          if (!el.contains(e.target)) {
            vnode.context[bindings.expression]();
          }
        })
      }
    },
    methods: {
      show() {
        this.isShow = true;
      },
      hide() {
        this.isShow = false;
      },
      showClick() {
        this.isShow = !this.isShow;
      }
    }
  }
</script>

<style scoped>
  .a-enter {
    opacity: 0;
  }

  .a-enter-active {
    transition: opacity 1s linear;
  }

  .a-enter-to {
    opacity: 1;
  }

  .a-lease {
    opacity: 1;
  }

  .a-leave-active {
    transition: opacity 1s linear;
  }

  .a-leave-to {
    opacity: 0;
  }

  .bounce-enter-active {
    animation: bounceIn 1s ease-in;
  }

  .bounce-leave-active {
    animation: bounceOut 1s ease-in;
  }


</style>
