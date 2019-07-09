const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
// 用来处理不同类型文件
const mime = require('mime');

let server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url);
  let filePath = path.join(__dirname, pathname);
  // 当前路径是文件还是文件夹
  // 如果没有这个文件，看文件夹下是否有 index.html 文件
  fs.stat(filePath, (err, stat) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }
    if (stat.isDirectory()) {
      let p = path.join(filePath, 'index.html');
      fs.access(p, (accessError) => {
        if (accessError) {
          res.statusCode = 404;
          res.end('Not Found');
        } else {
          res.setHeader('Content-Type', 'text/html;charset=utf8');
          fs.createReadStream(p).pipe(res);
        }
      });
    } else {
      // 通过路径给mime，让他自动生成类型
      res.setHeader('Content-Type', `${mime.getType(filePath)};charset=utf8`);
      fs.createReadStream(filePath).pipe(res);
    }
  });
});
const PORT = 3000;

server.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running at http://localhost:${PORT}`);
  }
});
