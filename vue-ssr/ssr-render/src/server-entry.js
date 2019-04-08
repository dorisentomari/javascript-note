import createApp from './app.js';

// 服务端会调用此函数，产生一个新的 app 实例
export default (context) => {
  return new Promise((resolve, reject) => {
    let {app, router} = createApp();
    router.push(context.url);
    // 为了防止路由中的异步逻辑
    // 等待路由加载完成后，返回 vue 实例
    // 服务端才可以渲染出完整的页面
    router.onReady(() => {
      resolve(app);
    })
  })
}
