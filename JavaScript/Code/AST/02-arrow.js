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
/**
let sum = function (a, b) {
  return a + b;
};
 * */
