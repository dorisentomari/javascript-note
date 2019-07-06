// 导出方式
// 1. module.exports = {};
// 2. exports.xxx = xxx;

// exports = xxx; 这种方式不要使用

// 模块的查找方式
// 先查找文件夹下的文件是否存在
// 如果不存在，先添加 .js后缀查找，找到就结束。
// 如果没找到，再添加 .json 后缀查找，找到就结束。
// 如果没找到，再添加 .node 后缀查找，找到就结束。
// 如果没找到，就去对应的目录下查找
// 如果对应的目录下有 package.json 文件，那么就从 package.json 里的 main 字段找入口文件，找到就结束。
// 如果 package.json 里的 main 字段里的入口文件没有找到，那么就找该目录下的 index 文件
// index 文件，查找 index 也是按照 .js, .json, .node 的顺序，找到就结束。

let str = require('./12.user');

console.log(str);
