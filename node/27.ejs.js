const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

let templatePath = path.resolve(__dirname, './ejs/template.html');

let templateStr = fs.readFileSync(templatePath, 'utf8');

function render (str, obj) {
  return str.replace(/<%=([\s\S]+?)%>/g, function () {
    return obj[arguments[1]];
  });
}

let regExpEqual = /<%=([\s\S]+?)%>/g;
let regExp = /<%([\s\S]+?)%>/g;

function render (templateStr, obj) {
  let str = `let str='';\r\n`;
  str += `with(obj){\r\n`;
  str += 'str+=`';
  templateStr = templateStr.replace(regExpEqual, function () {
    return '${' + arguments[1] + '}';
  });
  let content = templateStr.replace(regExp, function () {
    return  '`\r\n' + arguments[1] + '\r\nstr+=`';
  });
  let strTemplate = str + content + '`\r\nreturn str;}\r\n';

  let fn = new Function('obj', strTemplate);
  return fn(obj);
}

let result = render(templateStr, { name: 'mark', users: ['mark', 'jack', 'sherry'] });

let writeFilePath = path.resolve(__dirname, './ejs/targetFile.html');

fs.writeFileSync(writeFilePath, result, 'utf8');

console.log(result);
