class HistoryRoute {
  constructor() {
    this.current = null;
  }
}


class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash'
    this.routes = options.routes || []
    // 传递的路由表是一个数组 { '/home': Home, '/about': About }
    this.routesMap = this.createMap(this.routes);
    // 路由中需要存放当前的路径，需要状态
    this.history = new HistoryRoute;
    // 开始初始化操作
    this.init();
  }

  init() {
    if (this.mode === 'hash') {
      // 先判断用户打开时有没有哈希，没有的话，就跳转到 #/ 路径
      location.hash ? '' : location.hash = '/'
      window.addEventListener('load', () => {
        // load 事件是在 Vue.component, Vue.install 结束之后才执行
        console.log('loaded');
        this.history.current = location.hash.slice(1);
      });
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1);
      });
    } else {
      location.pathname ? '' : location.pathname = '/';
      window.addEventListener('load', () => {
        this.history.current = location.pathname;
      });
      window.addEventListener('popstate', () => {
        this.history.current = location.pathname;
      });
    }
  }

  createMap(routes) {
    return routes.reduce((prev, current) => {
      prev[current.path] = current.component;
      return prev;
    }, {});
  }

  go() {
  }

  push() {
  }

  pop() {
  }

}

// 使用 Vue.use 会调用 install 方法
VueRouter.install = function (Vue, options) {
  // 每一个组件都有 this.$router 和 this.$route 属性
  // 在所有组件中，获取同一个路由的实例
  Vue.mixin({
    beforeCreate() {
      // 获取组件的属性名字 this.$options.name
      // 有 $router 属性的就是根组件
      if (this.$options && this.$options.router) {
        // 把当前实例挂载到 _root 上
        this._root = this;
        // 把路由实例挂载到 _router 上
        this._router = this.$options.router;
        // 如果 history 中的 current 属性变化，也会修改视图
        Vue.util.defineReactive(this, 'xxx', this._root._router)
      } else {
        // vue 组件的渲染顺序，先渲染父组件，再渲染子组件，再渲染孙子组件，深度优先
        // 如果想要获取唯一的路由实例，this._root
        // 保证每一个组件的 _root 都是他们父组件的 _root
        this._root = this.$parent._root;

      }

      Object.defineProperty(this, '$router', {
        get() {
          return this._root._router;
        }
      });

      Object.defineProperty(this, '$route', {
        get() {
          // current 属性
          return {
            // 当前路由所在的状态
            current: this._root._router.history.current
          };
        }
      });
    }

  });

  Vue.component('router-link', {
    props: {
      to: String,
      tag: String
    },
    methods: {
      handleClick () {
        console.log('1');
      }
    },
    render(h) {
      console.log(this._self)
      let mode = this._self._root._router.mode;
      let tag = this.tag || 'a';
      // this.$slots.default 默认插槽
      return <tag on-click={this.handleClick} href={mode === 'hash' ? `#${this.to}` : this.to}>{this.$slots.default}</tag>
    }
  });

  Vue.component('router-view', {
    // 根据当前状态 current routes
    render(h) {
      // current 的变化，应该会影响到视图的刷新，使用 Object.defileProperty
      let current = this._self._root._router.history.current;
      let routeMap = this._self._root._router.routesMap;
      return h(routeMap[current]);
    }
  });

};

export default VueRouter
