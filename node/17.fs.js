const fs = require('fs');
const path = require('path');

// 常见的 64k 以下的文件可以使用 readFile
// 大文件可以使用 stream 流操作
// let b = fs.readFileSync(path.resolve(__dirname, './12.user.json1'), 'utf8');

// console.log(b);

let buf = Buffer.alloc(20);
fs.open(path.resolve(__dirname, './12.user.json1'), 'r', (err, fd) => {
  // fd 文件描述符
  // buf 为读取到哪个目标中
  // offset 指的是从 buf 的哪个位置开始写
  // length 读取的长度
  // position 从文件的哪个位置读取
  // byteRead 实际上读到的长度
  fs.read(fd, buf, 0, 10, 0, (err, byteRead) => {
    console.log(byteRead);
    console.log(buf);
    console.log(buf.toString());
  });
});



