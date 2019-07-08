const fs = require('fs');

let ReadStream = require('./18.readStream');

// let rs = fs.createReadStream('./static/user.txt', {
let rs = new ReadStream('./static/user.txt', {
  // 读
  flags: 'r',
  // 读取出来的是 buffer 二进制
  encoding: null,
  // 读完之后，文件是否需要自动关闭
  autoClose: true,
  // 开始读取的位置，包含 start
  start: 0,
  // 结束读取的位置，包含 end
  end: 10,
  // 每次读取的大小，默认就是 64 * 1024 = 65536
  highWaterMark: 64 * 1024,
});

// console.log(rs);

let arr = [];

rs.on('open', fd => {
  console.log(fd);
});

rs.on('data', data => {
  console.log('on data event');
  arr.push(data);
  // 读取事件暂停
  // rs.pause();
});

rs.on('end', () => {
  console.log(Buffer.concat(arr).toString());
});

rs.on('close', () => {
  console.log('close');
});

// setInterval(() => {
//   // 暂停 1 秒后，继续读取
//   rs.resume();
//   console.log('on data resume');
// }, 1000);

rs.on('error', err => {
  console.log(err);
});
