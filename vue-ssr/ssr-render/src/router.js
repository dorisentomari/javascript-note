import Vue from 'vue';
import VueRouter from 'vue-router';
import Bar from './components/bar.vue';
import Foo from './components/foo.vue';

Vue.use(VueRouter);

export default () => {
  let router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/bar'
      },
      {
        path: '/bar',
        name: 'bar',
        component: Bar
      },
      {
        path: '/foo',
        name: 'foo',
        component: Foo
      }
    ]
  });
  return router;
}
