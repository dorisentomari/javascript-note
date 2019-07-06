const fs = require('fs');
const path = require('path');

// 常见的 64k 以下的文件可以使用 readFile
// 大文件可以使用 stream 流操作
// let b = fs.readFileSync(path.resolve(__dirname, './12.user.json1'), 'utf8');

// console.log(b);

// let buf = Buffer.alloc(20);
// fs.open(path.resolve(__dirname, './12.user.json1'), 'r', (err, fd) => {
// fd 文件描述符
// buf 为读取到哪个目标中
// offset 指的是从 buf 的哪个位置开始写
// length 读取的长度
// position 从文件的哪个位置读取
// byteRead 实际上读到的长度
// fs.read(fd, buf, 0, 10, 0, (err, byteRead) => {
//   console.log(byteRead);
//   console.log(buf);
//   console.log(buf.toString());
// });
// });

// TODO 同步创建文件夹
function mkdirSync (path) {
  let arr = path.split('/');
  for (let i = 0; i < arr.length; i++) {
    let p = arr.slice(0, i + 1).join('/');
    try {
      fs.accessSync(p);
    } catch (e) {
      fs.mkdirSync(p);
    }
  }
}


// fs.mkdir('./aDir', (err, data) => {
//   console.log(data);
// });

// mkdirSync('./aDir/bDir/cDir/dDir/eDir/fDir');

// TODO 异步创建文件夹
function mkdirAsync (path, callback) {
  let arr = path.split('/');
  let index = 0;

  function next () {
    if (index >= arr.length) {
      return callback();
    }
    let p = arr.slice(0, index + 1).join('/');
    fs.access(p, err => {
      if (err) {
        index++;
        fs.mkdir(p, next);
      } else {
        index++;
        next();
      }
    });
  }

  next();
}

// mkdirAsync('./aDir/b1Dir', () => {
//   console.log('end 1');
// });
//
// mkdirAsync('./aDir/b2Dir', () => {
//   console.log('end 2');
// });

// let statObj = fs.statSync('./12.user');
// console.log(statObj);
// console.log(statObj.isDirectory());

// TODO 同步删除文件夹
function rmdirSync (p) {
  let statObj = fs.statSync(p);
  if (statObj.isDirectory()) {
    // 如果是目录
    let dirs = fs.readdirSync(p);
    if (dirs.length) {
      dirs.map(dir => {
        let current = path.join(p, dir);
        rmdirSync(current);
      });
    } else {
      fs.rmdirSync(p);
    }
  } else {
    // 如果是文件，直接删除
    fs.unlinkSync(p);
  }
}

rmdirSync('./aDir');

// TODO 异步删除文件夹
// TODO

// TODO 广度删除文件夹
// 广度，先排序，再删除

function wideRmdir (p) {
  let arr = [p];
  let index = 0;
  let current;
  while ((current = arr[index])) {
    let statObj = fs.statSync(current);
    if (statObj.isDirectory()) {
      let dirs = fs.readdirSync(current);
      dirs = dirs.map(d => path.join(current, d));
      arr = [...arr, ...dirs];
      index++;
    }
  }
  console.log(arr);
  for (let i = arr.length - 1; i >= 0; i--) {
    let current = arr[i];
    let statObj = fs.statSync(current);
    if (statObj.isDirectory()) {
      fs.rmdirSync(current);
    } else {
      fs.unlinkSync(current);
    }
  }
}

wideRmdir('./aDir');

// TODO Promise 方式写，async await 方式写







