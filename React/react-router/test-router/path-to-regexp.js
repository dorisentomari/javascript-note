const pathToRegexp = require('path-to-regexp');

// 配置的路径
let url = '/user/:id/:name';
// 请求的路径
let str = '/user/1/2';

let keys = [];

let reg = pathToRegexp(url, keys, {end: false});

keys = keys.map(key => key.name);

let [, ...args] = str.match(reg);
console.log(keys);
console.log(args);

let re = keys.reduce((a, b, index) => (a[b] = args[index], a), {});
console.log(re);
