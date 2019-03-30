import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue';
import Order from '../views/Order.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    }
  ]
})
