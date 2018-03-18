## ES6
+ ES6模块化如何使用，开发环境如何打包？
+ `Class`和普通构造函数有何区别？
+ `Promise`的基本使用和原理
+ 总结一下ES6其他常用功能

# 1. ES6模块化
## 1.1 模块化的基本语法
+ 示例代码
```javascript
// util1.js
export default {
	a: 100
}
// util2.js
export function fn1() {
	console.log('fn1');
}

export function fn2() {
	console.log('fn2');
}
// index.js
import util from './util1';
import {fn1, fn2} from './util2';
console.log(util);
fn1();
fn2();
```
## 1.2 开发环境配置
### 1.2.1 使用`babel`进行编译
+ `npm install -S babel-core babel-preset-es2015 babel-preset-latest`
+ 安装全局`babel` `npm install -g babel-cli`，当前版本6.26.0
+ 创建`.babelrc`文件
```json
{
    "presets": ["es2015", "latest"],
    "plugins": []
}
```
+ 创建`src`文件夹，并在`src`下创建`index.js`文件
+ `index.js`代码内容`[1, 2, 3].map(item => item + 2);`
+ `babel`编译`babel ./src/index.js`
+ 会在控制台把编译后的代码输出
### 1.2.2 使用`webpack`进行编译
+ `npm install webpack@3.11.0 babel-core@6.26.0 -S`
+ 配置`webpack.config.js`文件
```javascript
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './build/bundle.js'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
        }]
    }
}
```
+ 配置`package.json`中的`scripts`
```json
"scripts": {
    "start": "webpack"
}
```
+ 运行`npm start`
`npm start`实际上运行的是`webpack`项目内命令，而不是全局命令
### 1.2.3 使用`rollup.js`进行编译
+ `npm install rollup rollup-plugin-node-resolve rollup-plugin-babel babel-plugin-external-helpers babel-preset-latest -S`
+ 配置`.babelrc`
```json
{
    "presets": [
        ["latest", {
            "es2015": {
                "modules": false
            }
        }]
    ],
    "plugins": ["external-helpers"]
}
```
+ 配置`rollup.config.js`
```javascript
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/index.js',  
    output: {
        file: 'build/bundle.js',
        format: 'umd'
    },       
    plugins: [
        resolve(),          
        babel({             
            exclude: 'node_modules/**' 
        })
    ]
}
```
+ 修改`package.json`的`scripts`
```json
"scripts": {
    "start": "rollup -c rollup.config.js"
  },
```
+ 运行`npm start`
+ 缺点：功能比较单一，只能模块化打包，`webpack`功能强大
+ 参考设计原则和《Linux/Unix设计思想》
+ 工具尽量功能单一，可集成，可扩展
### 1.3 关于JS众多标准
+ 没有模块化
+ AMD称为标准，`require.js`(也有CMD)
+ 前端打包工具，使得Node.js模块化可以被使用
+ ES6出现，想要统一现在所有的模块化标准
+ Node.js积极支持，浏览器尚未统一

### 1.4 问题解答
+ 语法: `import export`,注意有无`default`
+ 环境: `babel`编译ES6语法，模块化可以用`webpack`和`rollup`
+ 对模块化标准的看法