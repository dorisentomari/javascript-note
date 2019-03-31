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
+ 工具的原理是通过 JavaScript Parser 把代码转化成一棵抽象语法树(AST)，这棵树定义了代码的结构，通过操作这棵树，可以精准的定位到声明语句，赋值语句，运算语句等，实现对代码的分析，优化，变更等。
+ 在计算机科学中，抽象语法树是编程语言的源代码的抽象语法结构的树状表现形式，
+ JavaScript 的语法是为了给开发者更好的编程而谁的，但是不适合程序的理解。所以需要通过转换为 AST 更适合程序分析，浏览器编译器一般会把源代码转化为 AST 来进一步的分析等其他操作。

# 4. AST
+ 解析 JS 的语法，生成语法树
+ 遍历树，先序深度优先，更改树的内容
+ 生成新的内容

# 5. 工具
+ esprima，把 JavaScript 解析称为 AST
+ estraverse，遍历 AST 语法树
+ escodegen，把语法树转化成 JavaScript 代码
+ ![在线解析称为AST](http://esprima.org/demo/parse.html)
+ ![在线解析AST](https://astexplorer.net/)
+ [在线解析AST示例](A/image/01-function_ast_()%7B%7D.png)

# 6. 使用 esprima 把代码解析成 AST
## 6.1 esprima.parse(code) 解析代码
+ 输入一小段代码，进行解析

```javascript
const esprima = require('esprima');

let code = 'function ast(){}';

let tree = esprima.parse(code);

console.log(tree);
```

+ 解析后的结果

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

## 6.2 esprima.tokenize(code) 序列化代码
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

## 6.3 解析的顺序
+ 在解析的过程中，针对每一个 type 所在区域都会有一个 enter 和 leave 的过程，使用 estraverse 库的 traverse 方法可以查看 enter 和 leave 的顺序

# 7. 使用 estraverse 对 AST 深层解析
## 7.1 查看解析的顺序
+ 先使用 esprima 把代码块解析成 AST
+ 再次使用 estraverse 对 AST 进行深度解析

```javascript
const esprima = require('esprima');
const estraverse = require('estraverse');
let code = `function ast(){}`;

let tree = esprima.parseScript(code);

estraverse.traverse(tree, {
  enter(node) {
    console.log('enter: ', node.type);
  },
  leave(node) {
    console.log('leave: ', node.type);
  }
});
```

+ 深度解析后的执行顺序，输出的结果

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

## 7.2 修改代码的内容
+ 在刚才的一段代码中，只有一个 Identifier 这一个标识符，这个标识符就是声明的标识符。实际上就是这个函数的名字
+ 所以，我们可以通过 Identifier 这个标识符来修改这个函数的名字
+ 在这里判断节点的 type 是否为 Identifier，如果是 Identifier，那么就修改这个节点的 name 属性，把 name 的值修改为 `NEW_AST`
+ 此时，通过 escodegen 库的 generate 方法，可以把抽象语法树再次生成新的代码，此时的代码里的函数名，就是 `NEW_AST`

```javascript
const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');
let code = `function ast(){}`;

let tree = esprima.parseScript(code);

estraverse.traverse(tree, {
  enter(node) {
    console.log('enter: ', node.type);
    if (node.type === 'Identifier') {
      node.name = 'NEW_AST';
    }
  }
});

let result = escodegen.generate(tree);
console.log(result);
```

+ 输出的代码内容
```javascript
function NEW_AST() {
}
```

# 8. 转换箭头函数
+ 访问者模式 Visitor 对于某个对象或者一组对象，不同的访问者，产生的结果不同，执行的操作也不同
+ @babel/core，@babel/types，Babel 官网

```javascript
const babel = require('@babel/core');
const types = require('@babel/types');

let code = `let sum = (a,b) => a + b`;

let ArrowPlugin = {
  visitor: {
    // path 是树的路径
    ArrowFunctionExpression(path) {
      let node = path.node;
      // 生成一个函数表达式
      let params = node.params;
      let body = node.body;
      if (!types.isBlockStatement(body)) {
        // 不是代码块
        let resultStatement = types.returnStatement(body);
        body = types.blockStatement([resultStatement]);
      }
      let funcs = types.functionExpression(null, params, body, false, false);
      path.replaceWith(funcs);
    }
  }
};

let result = babel.transform(code, {
  plugins: [
    ArrowPlugin
  ]
});

console.log(result.code);
```

+ 运行结果

```javascript
let sum = function (a, b) {
  return a + b;
};
```


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
