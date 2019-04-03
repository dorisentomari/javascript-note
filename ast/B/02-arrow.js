// 使用 babel 实现
// 使用 @babel/core 进行转化
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
