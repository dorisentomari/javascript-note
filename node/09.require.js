// require 的执行过程
// 1. 加载时，先看这个模块是否被缓存过，第一次没有缓存
// 2. Module._resolveFilename，解析出当前引用文件的绝对路径
// 3. 创建一个模块，模块有两个属性，一个叫 id 的文件名，exports = {}
// 4. 将模块放到缓存中
// 5. 加载这个文件，Module.prototype.load
// 6. 拿到文件的扩展名，根据扩展名，调用对应的方法
// 7. 读取文件，加一个自执行函数，将代码放入

const fs = require('fs');
const path = require('path');
const vm = require('vm');

function Module (id) {
  this.id = id;
  this.exports = {};
}

Module._resolveFilename = function (filename) {
  let extnameList = ['.js', '.json', '.node'];
  filename = path.resolve(__dirname, filename);
  let extnameFlag = path.extname(filename);
  if (extnameList.includes(extnameFlag)) {
    return filename;
  } else {
    return filename + '.js';
  }
};

Module.wrapper = [
  '(function(module, exports, require, __dirname, __filename){',
  '})'
];

Module._extensions = Object.create(null);
Module._extensions['.js'] = function (module) {
  let content = fs.readFileSync(module.id, 'utf8');
  let strTemplate = Module.wrapper[0] + content + Module.wrapper[1];
  let fn = vm.runInThisContext(strTemplate);
  fn.call(module.exports, module, module.exports, r, __dirname, this.id);
};

Module._extensions['.json'] = function (module) {
  let content = fs.readFileSync(module.id, 'utf8');
  module.exports = JSON.stringify(content);
};


Module._cache = {};

Module.prototype.load = function () {
  // 获取文件的扩展名
  let extname = path.extname(this.id);
  Module._extensions[extname](this);
};

function r (filename) {
  let absPath = Module._resolveFilename(filename);
  let cache = Module._cache[absPath];
  if (cache) {
    return cache.exports;
  }
  let module = new Module(absPath);
  Module._cache[absPath] = module;
  module.load();
  return module.exports;
}

let str = r('./07.moduleA');
// json 返回的是一个字符串，不是 JSON 对象
let json = r('./10.user.json');
console.log(str);
console.log(json);
