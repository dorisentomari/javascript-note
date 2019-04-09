import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';
import Bar from './components/bar.vue';
import Foo from './components/foo.vue';

Vue.use(VueRouter);
Vue.use(VueMeta);

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
