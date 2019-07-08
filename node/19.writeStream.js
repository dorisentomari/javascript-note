const fs = require('fs');

let ws = fs.createWriteStream('./static/user.txt', {
  flags: 'w',
  encoding: 'utf8',
  autoClose: true,
  start: 0,
  // 期望用多少内存，超过预期，返回 false
  highWaterMark: 2
});

let res = ws.write('hello', () => {
  console.log('write hello end');
});

console.log('hello ', res);

res = ws.write(' world', () => {
  console.log('write world end');
});

console.log('world ', res);

// fs.write, fs.close
ws.end(' how are you?');
ws.end();

