# 1. 抽象语法树(Abstract Syntax Tree)
+ webpack 和 lint 等很多的工具和库的核心都是通过 AST 抽象语法树这个概念来实现对代码的检查、分析等操作的，通过了解 AST 的概念，可以编写类似的工具

# 2. 抽象语法树的用途
+ 代码语法的检查，代码风格的检查，代码的格式化，代码的高亮，代码的错误提示，代码自动补全等
	+ 如 eslint 对代码错误或风格的检查，发现一些潜在的错误
	+ IDE 的错图提示，格式化，高亮，自动补全
+ 代码混淆压缩
	+ uglifyjs等
+ 优化变更代码，改变代码结构
	+ 代码打包工具 webpack， rollup 等
	+ CommonJS，AMD，CMD，UMD 等代码规范之间的转义
	+ CoffeeScript，TypeScript，JSX 等语法转原生 JavaScript

# 3. 抽象语法树的定义




## 1. 工具
+ esprima
+ estraverse
+ escodegen

## 2. 使用 esprima 把代码解析成 AST
### 2.1 直接解析成 AST
+ 输入一小段代码，进行解析
```javascript
const esprima = require('esprima');

let code = 'function ast(){}';

console.log(JSON.stringify(esprima.parse(code)));
```
+ 直接进行解析后的结果
```json
{
	"type": "Program",
	"body": [
		{
			"type": "FunctionDeclaration",
			"id": {
				"type": "Identifier",
				"name": "ast_enter_leave"
			},
			"params": [],
			"body": {
				"type": "BlockStatement",
				"body": []
			},
			"generator": false,
			"expression": false,
			"async": false
		}
	],
	"sourceType": "script"
}
```

+ ![在线解析AST](https://astexplorer.net/)
[在线解析AST示例](./image/01-function_ast_()%7B%7D.png)

### 2.2 序列化
+ 对代码段进行序列化
```javascript
const esprima = require('esprima');

let code = 'function ast(){}';

console.log(esprima.tokenize(code));
```
+ 序列化后的结果
	+ Keyword是关键字
	+ Identifier是标识符
	+ Punctuator是标点符号

```json
[
	{ "type": "Keyword", "value": "function" },
	{ "type": "Identifier", "value": "ast" },
	{ "type": "Punctuator", "value": "(" },
	{ "type": "Punctuator", "value": ")" },
	{ "type": "Punctuator", "value": "{" },
	{ "type": "Punctuator", "value": "}" }
]
```

## 3. 使用 estraverse 对 AST 深层解析
+ 使用 esprima 把代码块解析成 AST
+ 再次使用 estraverse 对 AST 进行深度解析

```javascript
const esprima = require('esprima');
const estraversw = require('estraverse');
let code = 'function ast(){}';

let ast = esprima.parse(code);
estraversw.traverse(ast, {
  enter(node) {
    console.log('enter: ', node.type);
    if (node.type === 'Identifier') {
      node.name += '_enter';
    }
  },
  leave(node) {
    console.log('leave: ', node.type);
    if (node.type === 'Identifier') {
      node.name += '_leave';
    }
  }
});
```
+ 深度解析后的执行顺序
```
enter:  Program
 enter:  FunctionDeclaration
	 enter:  Identifier
	 leave:  Identifier
	 enter:  BlockStatement
	 leave:  BlockStatement
 leave:  FunctionDeclaration
leave:  Program
```

## 4. 使用 escodegen 把解析后的 AST 转换成源代码
+ 转换代码
```javascript
const esprima = require('esprima');
const estraversw = require('estraverse');
const escodegen = require('escodegen');
let code = 'function ast(){}';

let ast = esprima.parse(code);
estraversw.traverse(ast, {
  enter(node) {
    console.log('enter: ', node.type);
    if (node.type === 'Identifier') {
      node.name += '_enter';
    }
  },
  leave(node) {
    console.log('leave: ', node.type);
    if (node.type === 'Identifier') {
      node.name += '_leave';
    }
  }
});

let result = escodegen.generate(ast);
console.log(result);
```
+ 转换后的结果
```javascript
function ast_enter_leave() {
}
```

## 5. 转换箭头函数
+ 访问者模式 Visitor 对于某个对象或者一组对象，不同的访问者，产生的结果不同，执行的操作也不同
+ babel-core
+ babel-types
+ Babel 插件手册

## 5.1 代码编写
```javascript
// 核心库，用来实现转换核心引擎
const babel = require('babel-core');
// 可以实现类型判断，生成 AST 零部分
const types = require('babel-types');

let code = `let sum = (a, b) => a + b;`;
/***
 let sum = function (a, b) {
   return a + b;
 }
 */

let visitor = {
  ArrowFunctionExpression(path) {
    let params = path.node.params;
    let blockStatement = types.blockStatement([
      types.returnStatement(path.node.body)
    ]);
    let func = types.functionExpression(null, params, blockStatement, false, false);
    path.replaceWith(func);
  }
};

let arrayPlugin = {visitor};
// babel 先把代码转成 AST ,然后开始遍历
let result = babel.transform(code, {
  plugins: [
    arrayPlugin
  ]
});

console.log(result.code);
```
## 5.2 运行结果
```javascript
let sum = function (a, b) {
  return a + b;
};
```
## 5.3 代码解析


# 6. 计算乘法
## 6.1 代码示例
```javascript
const babel = require('babel-core');
const types = require('babel-types');

let code = `const result = 1000 * 60 * 60 * 24`;

// 预计算
let visitor = {
  BinaryExpression(path) {
    let node = path.node;
    if (!isNaN(node.left.value) && !isNaN(node.right.value)) {
      let result = eval(node.left.value + node.operator + node.right.value);
      result = types.numericLiteral(result);
      path.replaceWith(result);
      if (path.parentPath.node.type === 'BinaryExpression') {
        visitor.BinaryExpression.call(null, path.parentPath);
      }
    }
  }
};
let arrayPlugin = {visitor};
let result = babel.transform(code, {
  plugins: [arrayPlugin]
});

console.log(result.code);
```
## 6.2 运行结果
```javascript
const result = 60000;
```

# 7. babel 配置
+ transform-runtime babel默认只转换新的 JavaScript 语法，而不转换新的 API，例如，Iterator，Generator，Set，Maps，Proxy，Reflect，Symbol，Promise等全局对象，以及一些定义在全局对象上的方法，比如 Object.assign，都不会转移，启用 babel-plugin-transform-runtime 后，babel 就会使用 babel-runtime 下的工具函数
+ 编译顺序为首先是 plugins 从左往后，然后 presets 从右往左

```json
{
	"presets": ["env", "stage-0"],
	"plugins": [
		["extract", {"library": "lodash"}],
		["transform-runtime", {}]
	]
}
```
