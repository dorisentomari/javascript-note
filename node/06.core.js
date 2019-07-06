// fs, path, vm 核心模块

let fs = require('fs');
let path = require('path');
let vm = require('vm');

let res = fs.readFileSync(path.resolve(__dirname, './05.module.js'), 'utf8');

// console.log(res);


// console.log(path.extname('1.min.js'));

// 判断文件是否存在，存在返回 undefined，不存在报错
res = fs.accessSync(path.resolve(__dirname, './05.module.js'), 'utf8');

// console.log(res);

// vm 是沙箱，是一个干净的环境
// eval 不是一个干净的环境，因为 eval 会取上级作用域的变量

let b = 100;
let str = `let b = 100;console.log(b)`;
let strFn = new Function(str);
// console.log(str);
// 这个方法可以创造一个干净的上下文环境，不会向上查找作用域环境
vm.runInThisContext(`let b = 100;console.log(b)`);



