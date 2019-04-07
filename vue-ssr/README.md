# 1. 预渲染原理
+ 一个运行在本地的无头浏览器

# 2. Vue 的预渲染插件
+ 使用插件`npm i prerender-spa-plugin`
+ vue.config.js 里导入
```javascript
const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = {
  plugins: [
    new PrerenderSPAPlugin({
    	staticDir: path.join(__dirname, 'dist'),
    	routes: ['/', '/about']
    })
  ]
};
```

# 3. vue 客户端渲染和服务端渲染
+ 客户端渲染不利于 SEO 搜索引擎优化
+ 服务端渲染可以被爬虫抓取到，客户端异步渲染很难被爬虫抓取到
+ SSR 直接将 HTML 字符串传递给浏览器，加快首屏渲染时间
+ SSR 占用更多的 CPU 和内存资源
+ 一些常用的浏览器的 API 可能无法使用
+ 在 vue 中只支持 beforeCreate 和 created 两个生命周期

# 4. vue ssr 安装的模块
+ vue-template-compiler vue-loader 处理编译 .vue 文件
+ vue-style-loader, 由于 style-loader 不支持服务端渲染，所以使用 vue-style-loader
