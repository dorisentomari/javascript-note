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
