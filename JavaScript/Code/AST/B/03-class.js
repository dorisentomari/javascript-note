const babel = require('@babel/core');
const types = require('@babel/types');

let code = `
class People {
  constructor(name) {
    this.name = name;
  }

  getName () {
    return this.name;
  }

}`;

// function People (name) {
//   this.name = name;
// }
//
// People.prototype.getName = function () {
//   return this.name;
// };

let classPlugin = {
  visitor: {
    ClassDeclaration(path) {
      let node = path.node;
      let className = node.id.name;
      // 函数名字必须是一个标识符，不能是一个字符串
      className = types.identifier(className);
      let func = types.functionDeclaration(className, [], types.blockStatement([]), false, false);
      path.replaceWith(func);
      let es5Func = [];
      let classList = node.body.body;
      classList.forEach((item, index) => {
        // 函数的代码体
        let body = classList[index].body;
        if (item.kind === 'constructor') {
          let params = item.params.length ? item.params.map(item => item.name) : [];
          // params = types.identifier(params);
          // func = types.functionDeclaration(className, [params], body, false, false);
        } else {
          // 原型上的方法
          let protoObj = types.memberExpression(className, types.identifier('prototype'));
          let left = types.memberExpression(protoObj, types.identifier(item.key.name));
          let right = types.functionExpression(null, [], body, false, false);
          let assign = types.assignmentExpression('=', left, right);
          es5Func.push(assign);
        }

      });
      if (es5Func.length === 0) {
        path.replaceWith(func);
      } else {
        // 有原型上的方法
        es5Func.push(func);
        // 替换 n 个节点
        path.replaceWithMultiple(func);
      }

    }
  }
};


let result = babel.transform(code, {
  plugins: [
    classPlugin
  ]
});

console.log(result.code);
