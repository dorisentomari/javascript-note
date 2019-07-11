const http = require('http');
const fs = require('fs');
const path = require('path');
const urlParser = require('url');

http.createServer((req, res) => {
  let url = path.join(__dirname, req.url);
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  fs.stat(url, (err, stat) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not Found');
    } else {
      let referer = req.headers['referer'] || req.headers['referrer'];
      // 判断 referer 和我们设定的是否一致，或者说是否在我们的白名单里，如果是，就正常返回，如果不是，那就返回一个警告图片
      fs.createReadStream(url).pipe(res);
    }
  });
}).listen(3000);







