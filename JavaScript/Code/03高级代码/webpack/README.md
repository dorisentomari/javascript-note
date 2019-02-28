# 1. 什么是 webpack
+ Webpack 可以看做是模块打包机，它所做的事情是，分析你的项目结构，找到 JavaScript 模块以及它的一些浏览器不能直接运行的扩展语言，并将其打包为合适的格式以供浏览器使用。
+ 构建就是把源代码抓换成线上发布的可执行的 JavaScript，CSS，HTML 代码等，包括
+ 代码转换： TypeScript 编译成 JavaScript，SCSS 编译成 CSS
+ 文件优化：压缩 JavaScript，CSS，HTML 代码，压缩合并图片等
+ 代码分割：提取多个页面的公共代码，提取首屏不需要执行部分的代码让其异步加载
+ 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件
+ 自动刷新：监听本地源代码的变化，自动重新构建，刷新浏览器
+ 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过
+ 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统
+ 构建其实就是工程化，自动化思想在前端开发中的体现，把一些列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。构建给前端开发注入了更大的活力，解放了前端的生产力。

# 2. 快速上手
## 2.1 webpack 核心概念
+ entry: 入口，webpack 执行构建的第一步从 entry 开始，可以抽象为输入
+ module: 模块，在 webpack 里一切皆模块，一个模块对应一个文件， webpack 会从配置里 entry 开始递归找出所有依赖的模块
+ chunk: 代码块，一个 chunk 由多个模块组合而成，用于代码合并与分割
+ loader: 模块转换器，用于把模块原内容按照需求转换成新内容
+ plugin: 扩展插件，在 webpack 构建流程中的特定时机注入扩展逻辑来改变结果或你想要做的事情
+ output: 输出结果，在 webpack 经过一些列处理并得出最终想要的代码后输出结果

> webpack 启动后会从 entry 里配置的 module 开始递归解析 entry 依赖的所有的 module。每找到一个 module，就会根据配置的 loader 去找对应的转换规则，对 module 进行转换后，再解析出当前 module 依赖的 module。这些模块会以 entry 为单位进行分组，一个 entry 和其所有依赖的 module 被分到一个组也就是一个 chunk。最后 webpack 会把所有 chunk 转换成文件输出。在整个流程中 webpack 会在恰当的时机执行 plugin 里定义的逻辑。

## 2.2 配置 webpack
+ 安装依赖 `npm install webpack webpack-cli -D`
+ 文件目录
```
|——src
|  |——index.js
|——webpack.config.js
|——package.json
```
+ index.js
```javascript
console.log('hi, how r u?');
```
```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```
+ package.json
```json
{
  "name": "01-start",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^4.29.6",
    "webpack-cli": "^3.2.3"
  },
  "scripts": {
    "build": "webpack"
  }
}
```
+ 启动命令 npm run build，在根目录下会生成一个 dist 的目录，生成的文件是 bundle.js
+ 删掉暂时无用的代码和注释后，得到的 bundle.js 里的内容
```javascript
(function(modules) { // webpackBootstrap
  // modules 是一个数组，里边的元素是每一个函数，实际上就是我们引用的模块，因为每一个文件就是一个模块，就是我们所引用的文件

  // The module cache
  // installedModules 用于模块缓存
  var installedModules = {};

  // The require function
  // 定义了一个 __webpack_require_ 的函数
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    // 判断缓存里是否有该模块，如果有的话，直接返回该模块
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    // 创建一个新的模块，并把这个模块放入缓存
    var module = installedModules[moduleId] = {
      // 模块的 id
      i: moduleId,
      // l 的意思是是否已经被 loader
      l: false,
      exports: {}
    };

    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // Flag the module as loaded
    // 标志模块已经被载入
    module.l = true;

    // Return the exports of the module
    // 返回 module.exports， modules[moduleId].call 的时候，module.exports 会被修改
    return module.exports;
  }
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})({
  "./src/index.js": (function(module, exports) {
    eval("console.log('hello, how are you');\r\n\n\n//# sourceURL=webpack:///./src/index.js?");
  })
});
```

+ 解析 bundle.js 里的代码
	+ [简要分析webpack打包后代码](https://segmentfault.com/a/1190000006814420#articleHeader0)
	+ [深入剖析 webpack 打包生成的一大堆代码到底是啥](https://blog.csdn.net/haodawang/article/details/77126686)
	+ 本质上 bundle.js 里是一个自执行的函数，简化一下就是 `(function(module){})({a: function () {}, b: function () {} })`
	+ `modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);` call 能确保当模块使用 this 的时候，this 是指向 module.exports。
