import createApp from './app.js';

// 服务端会调用此函数，产生一个新的 app 实例
export default () => {
  let {app} = createApp();
  return app;
}
