import createApp from './app.js';

// 服务端会调用此函数，产生一个新的 app 实例
export default (context) => {
  return new Promise((resolve, reject) => {
    let {app, router, store} = createApp();
    router.push(context.url);
    // 为了防止路由中的异步逻辑
    // 等待路由加载完成后，返回 vue 实例
    // 服务端才可以渲染出完整的页面

    // 需要把当前页面中匹配到的组件，找到它的 asyncData 方法，让这个方法执行
    router.onReady(() => {
      // 获取到当前路径匹配到的组件，查看这个组件是否有 asyncData 方法
      let matchsComponents = router.getMatchedComponents();
      Promise.all(matchsComponents.map(component => {
        if (component.asyncData) {
          return component.asyncData({store});
        }
      })).then(() => {
        // 把 vuex 中的状态挂载到当前上下文的 state 中
        context.state = store.state;
        context.meta = app.$meta();
        resolve(app);
      })
    })
  })
}
