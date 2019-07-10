// 范围请求，获取部分结果
// Range: bytes=0-5
// Content-Range: bytes 0-5/2381
// 206
// curl -v --header "Range:bytes=0-5" http://www.baidu.com

let http = require('http');
let fs = require('fs');
let path = require('path');

let downloadPath = path.resolve(__dirname, './static/user.txt');

let stat = fs.statSync(downloadPath);

let server = http.createServer((req, res) => {
  if (req.url === '/') {
    let range = req.headers['range'];
    if (range) {
      let [, start, end] = range.match(/(\d+)-(\d*)/);
      start = start ? Number(start) : 0;
      end = end ? Number(end) : stat.size - 1;
      res.setHeader('Content-Range', `bytes=${start}-${end}/${stat.size}`);
      res.setHeader('Content-Length', end - start + 1);
      res.statusCode = 206;
      fs.createReadStream(downloadPath, {start, end}).pipe(res);
    } else {
      fs.createReadStream(downloadPath).pipe(res);
    }
  } else {
    res.statusCode = 404;
    res.end();
  }

}).listen(3000);





