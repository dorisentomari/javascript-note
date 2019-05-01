import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'animate.css';

Vue.config.productionTip = false;

Vue.directive('color', (el, bindings, vnode) => {
  el.style.color = bindings.value;
});

Vue.filter('toUpper', (value, count = 1) => {
  return value.slice(0, count).toUpperCase() + value.slice(count);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
