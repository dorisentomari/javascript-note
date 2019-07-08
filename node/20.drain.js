const fs = require('fs');
const WriteStream = require('./21.writeStream');


// let ws = fs.createWriteStream('./static/number.txt', {
let ws = new WriteStream('./static/number.txt', {
  flags: 'w',
  encoding: 'utf8',
  autoClose: true,
  start: 0,
  // 期望用多少内存，超过预期，返回 false
  highWaterMark: 3
});

let i = 0;

function write () {
  let flag = true;
  while (i++ < 10 && flag) {
    flag = ws.write('' + i);
    console.log(flag);
  }
}

write();

ws.on('drain', () => {
  console.log('清空');
  write();
});
