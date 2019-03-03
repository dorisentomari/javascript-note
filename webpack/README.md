# 0. webpack 精品文章
+ [Webpack Hot Module Replacement 的原理解析](https://github.com/Jocs/jocs.github.io/issues/15)

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
  + output 的 filename 可以为变量值，就是对应的 entry 的文件的名字
  + filename 的 hash 是根据文件内容计算出来的，8是指取前八位哈希值

```javascript
console.log('hi, how r u?');
```
+ webpack.config.js

```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].[hash:8].js',
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
  // 定义了一个 __webpack_require_ 的函数，模拟 commonjs 的 require
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    // 判断缓存里是否有该模块，如果有的话，表示模块已经加载过，直接返回该模块
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    // 如果没有加载过，那么就创建一个新的模块，并把这个模块放入缓存
    var module = installedModules[moduleId] = {
      // 模块的 id
      i: moduleId,
      // l 的意思是是否已经被 loader
      l: false,
      exports: {}
    };

    // Execute the module function
    // 执行模块的函数
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // Flag the module as loaded
    // 标志模块已经被载入
    module.l = true;
  // expose the modules object (__webpack_modules__)
  // 向外暴露模块对象
  __webpack_require__.m = modules;

  // expose the module cache
  // 模块的缓存
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  // 定义 getter 方法，兼容 exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        // 在 exports 对象上定义 name 属性，他的值是可枚举的，并指定获取器
        enumerable: true,
        get: getter
      });
    }
  };

  // define __esModule on exports
  // 在导出对象上，定义 _esModule，做兼容
  // es6 modules，使用的是 commonjs，在 export 导出的模块里，如果用 require 引入，那么实际上我们需要 require('./config').default ，使用的是 default 属性
  // export default name = 'mark'
  // require('./config.js').default
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  // __webpack_public_path__
  // 公开路径，对应于 output，publicPath
  __webpack_require__.p = "";
    // Return the exports of the module
    // 返回模块的导出对象， modules[moduleId].call 的时候，module.exports 会被修改
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

## 2.3 使用 loader 解析各种 css 和文件资源
+ loader 的使用
  + 单个 loader ，可以用字符串
  + 多个 loader ，可以用数组，多个 loader 顺序，默认是从右向左执行
  + loader 还可以写成对象的形式
+ loader 有三种写法
	+ use
	+ loader
	+ use + loader
+ 解析 css
  + 使用 css-loader，解析css代码，主要是为了处理 css 中的依赖，比如 @import 和 url() 等引用外部文件的声明
  + 使用 style-loader 将会把 css-loader 解析的结果转变成 js 代码，运行时动态插入 style 标签让 css 的代码生效
  
```javascript
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}
```

+ 解析 less/sass/stylus
```javascript
{
	test: /\.less$/,
	exclude: /node_modules/,
	use: ['style-loader', 'css-loader', 'less-loader']
},
{
	test: /\.scss/,
	exclude: /node_modules/,
	use: ['style-loader', 'css-loader', 'sass-loader']
},
{
	test: /\.styl/,
	exclude: /node_modules/,
	use: ['style-loader', 'css-loader', 'stylus-loader']
}
```

+ 根据浏览器的兼容性给 CSS 样式添加不同的前缀
	+ 使用 postcss-loader autoprefixer
	+ 在 module.rules 里 test css 的 user 里添加 postcss-loader

```javascript
// postcss.config.js
module.exports = {
  plugins: [require('autoprefixer')]
};
```

+ 解析二进制文件
	+ 可以解析图片，字体，word 等文件
	+ 使用 file-loader 用来解析二进制文件地址
	+ 把文件从原位置拷贝到目标位置并修改原引用地址
	+ 在 img 标签内使用 ./、../ 等查找本地的图片资源，需要使用 html-withimg-loader
	+ 如果在 img 标签中引入的是 web 图片，可以不使用 html-withimg-loader
	+ 注意： html-withimg-loader 会影响到 html-webpack-plugin 里的 title 的值
	+ 如果图片体积比较小，可以使用 url-loader 直接把图片转成 base64 字符串内嵌到 html 页面中
	
```javascript
{
	test: /\.(jpg|jpeg|png|gif|svg|bmp)$/,
	loader: {
		loader: 'file-loader',
		options: {
			// 指定输出的图片文件目录，指定目录后，需要在 server 下才能使用，在 file 下找不到图片
			outputPath: '/images'
		}
	}
},
{
	test: /\.(html|htm)/,
	loader: 'html-withimg-loader'
}
```

## 2.4 使用 webpack-dev-server 启动本地服务器
+ 配置这个服务器，可以在本地服务上查看编译后的页面效果
+ 可以配置文件目录，主机，端口，是否启用 gzip 压缩，html 的模板，是否热重载等
+ 在输出日志里，会看到很多引用的资源
  + 建立 socket 服务的资源，用来检测代码是否修改，是否要重新启动 devServer
  + 建立本地 devServer 所需要的文件
  + 发射 emit 事件
  + 我们自己写的源代码
+ 添加 watch 配置项，可以监控代码的修改，适时的编译

```javascript
devServer: {
  contentBase: './dist',
  host: '0.0.0.0',
  port: 3000,
  open: true,
  compress: true
},
watch: true,
watchOptions: {
  // 忽略的目录
	ignored: /node_modules/,
	// 每秒向服务发出多少次询问，是否要重新编译
	poll: 10,
	// 源代码文件编译 500 毫秒后，不再修改，重新编译
	aggregateTimeout: 500
}
```

## 2.5 html-webpack-plugin 建立 html 模板
+ 如果多页面应用里需要生成不同的 HTML，可以建立数组规则，循环 new
```javascript
new HTMLWebpackPlugin({
	// 引入的模板的路径
	template: './src/index.html',
	// 生成的 html 的文件名
	filename: 'index.html',
	// 生成的 html 文件的 title 标签的内容
	title: 'HTML的模板',
	// 在引入的文件后边添加哈希字符串，避免缓存
	hash: true,
	minify: {
		// 压缩代码，去掉所有的空白
		collapseWhitespace: true,
		// 去掉注释
		removeComments: true,
		// 去掉冗余的属性
		removeRedundantAttributes: true,
		// 如果 script 标签上有 type="text/javascript"，就去掉这个属性
		removeScriptTypeAttributes: true,
		// 如果 link 标签上有 type="text/css"，就去掉这个属性
		removeStyleLinkTypeAttributes: true,
		// 去掉标签上属性值的引号
		removeAttributeQuotes: true
	},
	meta: {
		viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
		'theme-color': '#4285f4'
	}
})
```

## 2.6 webpack 配置多入口

+ 先找到每个入口，然后从各个入口分别出发，找到依赖的模块，然后生成一个 Chunk 代码块，最后会把 Chunk 写入到文件系统中(Assets)
+ 一个入口对应多个模块，对应一个 Chunk
+ webpack.config.js

```javascript
const path = require('path');
const Webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    base: './src/base.js',
    // 如果在多页面应用中，需要使用公共的代码，可以写在 common 入口文件里，在每一个 html 的模板中，添加 common 这个 chunk
    // 如果有多个不同功能的公共代码，可以写多个不同的入口文件，供不同的页面使用
    common: './src/common.js'
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebpackPlugin({
      // 引入的模板的路径
      template: './src/index.html',
      // 生成的 HTML 的文件名
      filename: 'index.html',
      // 生成的 HTML 文件的 title 标签的内容
      title: 'index 的模板',
      // 在引入的文件后边添加哈希字符串，避免缓存
      hash: true,
      // 在产出的 HTML 文件里引入哪些代码块
      chunks: ['index', 'common']
    }),
    new HTMLWebpackPlugin({
      // 引入的模板的路径
      template: './src/index.html',
      // 生成的 HTML 的文件名
      filename: 'base.html',
      // 生成的 HTML 文件的 title 标签的内容
      title: 'base 的模板',
      // 在引入的文件后边添加哈希字符串，避免缓存
      hash: true,
      // 在产出的 HTML 文件里引入哪些代码块
      chunks: ['base', 'common']
    }),
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')])
  ]
};
```
+ 配置每个模块都使用到的变量
```javascript
// 添加插件
new Webpack.ProvidePlugin({
	$: 'jquery'
})
```
+ **有问题** 每个模块内部的变量都是该模块自身的私有变量，一般我们不会去获取其他模块的变量，但是如果我们一定要这么做，可以采用 expose-loader 暴露变量，在自身模块内部，会加载其他模块的变量，并且挂载到 window 对象上，`npm install expose-loader -D`

```javascript
// 引入
require('expose-loader?$!jquery');
require('expose-loader?libraryName!./user.js');
// 使用
console.log(window.$);
console.log(window.libraryName);

// 引入 css 的普通用法
require('./index.css');
// 等价于，此时不能在 webpack.module.rules 里配置 css 的 loader，否则会编译失败
require('style-loader!css-loader!./index.css');
```
  
+ **有问题** 如果不想在代码中写 expose-loader，可以在 webpack.module.rules 里添加规则
```javascript
{
	test: require.resolve('jquery'),
	use: {
		loader: 'expose-loader',
		options: '$'
	}
}
```

## 2.7 使用 babel 编译
+ 使用最新的 babel@7，配置比较少
+ 下载 babel-loader，@babel/core，@babel/preset-env，安装后就可以编译 es6 语法了，但是还不能编译一些比较特殊的语法，比如装饰器，所以如果需要的语法 babel 不能编译，那么就需要去安装专门的 babel 插件
+ 如果需要配置解析 react，那么需要下载安装 @babel/preset-react
+ 配置装饰器，需要下载插件 @babel/plugin-proposal-class-properties，@babel/plugin-proposal-decorators
```javascript
{
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: ['@babel/preset-env', '@babel/preset-react'],
			plugins: [
				['@babel/plugin-proposal-decorators', { legacy: true }],
				['@babel/plugin-proposal-class-properties', { loose: true }]
			]
		}
	}
}
```

## 2.8 优化打包
+ 压缩 js 和 css
```javascript
// 压缩 CSS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩 JS
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');

[
  new OptimizeCSSAssetsPlugin(),
	new UglifyjsPlugin({
		cache: true,
		parallel: true,
		sourceMap: false
	})
]
```

+ HappyPack 多线程，HappyPack 能够让 webpack 把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程

```javascript
const HappyPack = require('happypack');

module.exports = {
  module: {
    rules: [
      {
              test: /\.css$/,
              exclude: /node_modules/,
              use: 'happypack/loader?id=css'
            },
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: 'happypack/loader?id=babel'
            }
    ]
  },
  plugins: [
    new HappyPack({
			id: 'babel',
			loaders: [
				{
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: [
							['@babel/plugin-proposal-decorators', { legacy: true }],
							['@babel/plugin-proposal-class-properties', { loose: true }]
						]
					}
				}
			]
		}),
		new HappyPack({
			id: 'css',
			loaders: ['style-loader', 'css-loader', 'postcss-loader']
		})
  ]
}
```
+ ParallelUglifyPlugin 对 js 文件的串行压缩变为开启多个子进程并行执行

```javascript
new ParallelUglifyPlugin({
	workerCount: 3,
	uglifyJs: {
		output: {
			beautify: false,
			comments: false
		},
		compress: {
			// 删掉没有用到的代码时不输出警告
			warnings: false,
			// 删掉所有的 console 语句，可以兼容 ie 浏览器
			drop_console: true,
			// 内嵌定义了但是只用到一次的变量
			cpllapse_vars: true,
			// 提取出现多次但是没有定义成变量或去引用的静态值
			reduce_vars: true
		}
	}
})
```

## 2.9 [DLL 动态链接库(Dynamic link library)](https://zh.wikipedia.org/wiki/%E5%8A%A8%E6%80%81%E9%93%BE%E6%8E%A5%E5%BA%93)

> 动态链接库（英语：Dynamic-link library，缩写为DLL）是微软公司在微软视窗操作系统中实现共享函数库概念的一种实现方式。这些库函数的扩展名是.DLL、.OCX（包含ActiveX控制的库）或者.DRV（旧式的系统驱动程序）。
  
> 所谓动态链接，就是把一些经常会共享的代码（静态链接的OBJ程序库）制作成DLL档，当可执行文件调用到DLL档内的函数时，Windows操作系统才会把DLL档加载存储器内，DLL档本身的结构就是可执行档，当程序有需求时函数才进行链接。透过动态链接方式，存储器浪费的情形将可大幅降低。静态链接库则是直接链接到可执行文件。
  
> DLL的文件格式与视窗EXE文件一样——也就是说，等同于32位视窗的可移植执行文件（PE）和16位视窗的New Executable（NE）。作为EXE格式，DLL可以包括源代码、数据和资源的多种组合。
  
> 在更广泛的意义上说，任何同样文件格式的计算机文件都可以称作资源DLL。这样的DLL的例子有扩展名为ICL的图标库、扩展名为FON和FOT的字体文件。

+ .dll 后缀的文件成为动态链接库，在一个动态链接库红可以包含给其他模块调用的函数和数据
+ 把基础模块独立打包到单独的动态链接库
+ 把需要导入的模块在动态链接库里的时候，模块不能再次被打包，而是去动态链接库里获取 dll-plugin

### 2.9.1 创建 DLL
+ DllPlugin插件，用于打包出一个个动态连接库
+ 使用一个单独的生成 dll 的 webpack 配置文件用来生成 dll
+ output.filename 是要生成的 dll 的文件的名字
+ output.library 要和 DllPlugin.name 的值相同，是创建的 dll 里的变量名
+ DllPlugin 里的 manifest.json 是生成的文件名，使用时要保持一致
+ manifest.json 文件是一个缓存文件，记录创建的 dll 里的变量名和缓存的库
```javascript
// webpack.config.react.js
const path = require('path');
const Webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // 输出动态链接库的文件名称
    filename: '[name]_dll.js',
    // 导出变量的名称
    // 全部变量的名字，其他会从此变量上获取到里边的模块
    library: '_dll_[name]'
  },
  plugins: [
    new Webpack.DllPlugin({
      // manifest.json 是一个缓存文件
      // 与 output.library 中的值一致，值就是输出的 manifest.json 中的 name 的值
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ]
};
```

### 2.9.2 引入使用 dll
+ DllReferencePlugin，在配置文件中引入 DllPlugin 插件打包好的动态连接库
+ 使用已经生成的 dll
+ HtmlIncludeAssetsPlugin 的配置里的 assets 是指要引入的 dll 资源， append 为 false 是指把引入的这个资源放在 webpack 打包引入的其他资源的前边

```javascript
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

// webpack.config.prod.js
new Webpack.DllReferencePlugin({
	// 这个引入的就是 webpack.config.react.js 打包生成的 react.manifest.json
	manifest: require(path.resolve(__dirname, 'dist', 'manifest.json'))
}),
new HtmlIncludeAssetsPlugin({
	assets: ['./react_dll.js'],
	append: false
})
```

### 2.9.3 library 和 libraryTarget
+ output.library 配置的是导出库的名称，通常和 libraryTarget 放在一起使用
+ output.libraryTarget 配置的是以何种方式导出库

### 2.9.4 关于 libraryTarget 的方式
+ 实际上就是导出的方式不一样，导入的方式也不一样
+ 1. `var` 默认配置，编写的库将通过 var 被赋值给通过 library 指定的变量
	+ lib_code 其中 lib_code 代指导出库的代码内容，是有返回值的一个自执行函数
	
```javascript
// webpack 输出的代码
var _dll_react = (function(modules) {})({
  a: function () {},
  b: function () {},
  c: function () {},
});

// 使用库的方法
_dll_react.doSomething();
// 如果 output.library 为空值，那么就直接输出
```

+ 2. `commonjs`，编写的库将通过 CommonJS 规范导出

```javascript
// webpack 输出的代码
exports["_dll_react"] = (function(modules) {})({
  a: function () {},
  b: function () {},
  c: function () {},
});

// 使用库的方法
require('library-name-in-npm')['libraryName'].doSomething();
// 其中 library-name-in-npm 是指模块发布到 npm 代码仓库时的名称
```

+ 3. `commonjs2`，编写的库将通过 CommonJS2 规范导出，这个时候配置 output.library 没有意义，因为模块直接导出，没有导出变量

```javascript
// webpack 输出的代码
module.exports = (function(modules) {})({
  a: function () {},
  b: function () {},
  c: function () {},
});

// 使用库的方法
require('library-name-in-npm')['libraryName'].doSomething();
// 其中 library-name-in-npm 是指模块发布到 npm 代码仓库时的名称
```

+ 4. `this`，编写的库将通过 this 被赋值给通过 library 指定的名称

```javascript
// webpack 输出的代码
this["_dll_react"] = (function(modules) {})({
  a: function () {},
  b: function () {},
  c: function () {},
});

// 使用库的方法
this['_dll_react'].doSomething();
```

+ 5. `global` 和 `window`，编写的库将通过 window 被赋值给通过 library 指定的名称，实际上就是把库挂载到 window 对象上

```javascript
// webpack 输出的代码
window["_dll_react"] = (function(modules) {})({
  a: function () {},
  b: function () {},
  c: function () {},
});

// 使用库的方法
window['_dll_react'].doSomething();
```

### 2.9.5 写一个 lib 为例解释 libraryTarget 
+ lib.js
```javascript
function getName () {
  return 'hello, webpack';
}

exports.getName = getName;
```

+ webpack.config.lib.js
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/lib.js',
  output: {
    path: path.resolve(__dirname, 'lib_dll'),
    // 输出动态链接库的文件名称
    filename: 'bundle.js',
    // 导出变量的名称
    // 全部变量的名字，其他会从此变量上获取到里边的模块
    library: 'lib',
    libraryTarget: ''
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    })
  ]
};
```
+ var 模式
```javascript
// bundle.js
var lib = (function () {})();

// 可以直接使用
lib.getName();
```

+ commonjs 模式
```javascript
// bundle.js
exports["lib"] = (function () {})();

// 由于浏览器不能识别 exports，所以要在 node 里进行引入使用
let bundle = require('../lib_dll/bundle');
console.log(bundle.lib.getName());
```

+ commonjs2 模式
```javascript
// bundle.js
module.exports = (function () {})();

// 由于浏览器不能识别 module，所以要在 node 里进行引入使用
let bundle = require('../lib_dll/bundle');
console.log(bundle.getName());
```

+ this 、 window 和 global 模式
```javascript
// bundle.js
this["lib"] = (function () {})();
window["lib"] = (function () {})();
globalThis["lib"] = (function () {})();

// 可以直接使用
console.log(this.lib.getName());
console.log(window.lib.getName());
console.log(globalThis.lib.getName());
```

## 2.10 区分环境
+ 开发网页的时候，一般会有多套运行环境
	+ 在开发过程中方便开发调试的环境
	+ 发布到线上给用户使用的运行环境

### 2.10.1 环境区别
+ 线上的代码被压缩
+ 开发环境可能会打印只有开发者开能看到的日志
+ 开发环境和线上环境后端数据接口可能不同
+ 在命令行使用不同操作系统的命令，如果直接使用 set 或 export 会报错，所以使用 cross-env 这个库来兼容，`cross-env NODE_ENV=development`

### 2.10.2 使用 webpack-merge
```javascript
// webpack.config.js
const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');

let env = '';

if (process.env.NODE_ENV === 'development') {
  env = require('./webpack.dev.config.js');
} else if (process.env.NODE_ENV === 'production') {
  env = require('./webpack.prod.config.js');
}

module.exports = merge(base, env);
```

### 2.10.3 在代码里使用环境变量
+ 这里定义的 `__development` 变量可以直接在代码中使用

```javascript
new Webpack.DefinePlugin({
	__development__: JSON.stringify(process.env.NODE_ENV) === "'development'"
})
```

# 3. CDN
+ CDN ，内容分发网络，通过把资源部署到世界各地，用户在访问时按照就近原则从离用户最近的服务器获取资源，从而加速资源的获取速度
+ HTML 文件不缓存，放在自己的服务器上，关闭自己服务器的缓存，静态资源的 url 变成指向 CDN 服务器的地址
+ 静态的 JavaScript ，CSS，图片等文件开启 CDN 和缓存，并且文件名上带哈希值
+ 为了并行加载不阻塞，把不同的静态资源分配到不同的 CDN 服务器上

```javascript
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    publicPath: 'http://cdn.yourdomain.com'
  }
}
```

