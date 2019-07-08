const fs = require('fs');

// 文件的拷贝，fs.readFile, fs.writeFile

let rs = fs.createReadStream('./static/user.txt', {
  highWaterMark: 4
});

let ws = fs.createWriteStream('./static/newUser.txt', {
  highWaterMark: 1
});

rs.on('data', d => {
  let flag = ws.write(d);
  if (!flag) {
    rs.pause();
  }
});

ws.on('drain', () => {
  console.log('当前写入的4个字节都成功了');
  rs.resume();
});
