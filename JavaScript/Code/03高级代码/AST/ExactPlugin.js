const babel = require('babel-core');
const types = require('babel-types');

// 只会处理 ImportDeclaration 语句
let visitor = {
  ImportDeclaration(path, ref = {opts: {}}) {
    let node = path.node;
    let specifiers = node.specifiers;
    console.log('-----------------------------');
    console.log('-----------------------------');
    console.log('-----------------------------');
    console.log(ref.opts);
    console.log(node.source.value);
    console.log(JSON.stringify(specifiers[0]));
    console.log(types.isImportDefaultSpecifier(specifiers[0]));
    console.log('-----------------------------');
    console.log('-----------------------------');
    console.log('-----------------------------');
    if (ref.opts.library === node.source.value && !types.isDefaultImportSpecifier(specifiers[0])) {
      let newImportSpecifiers = specifiers.map(specifier => (
        types.importDeclaration(
          [types.ImportDefaultSpecifier(specifier.local)],
          types.StringLiteral(`${node.source.value}/${specifier.local.name}`)
        )
      ));
      path.replaceWithMultiple(newImportSpecifiers);
    }
  }
};

let code = `import {flatten, join} from 'lodash'`

let result = babel.transform(code, {
  plugins: [
    {visitor}
  ]
});

console.log(result);
