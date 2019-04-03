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

