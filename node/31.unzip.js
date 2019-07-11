const http = require('http');
const fs = require('fs');
const path = require('path');
const urlParser = require('url');
const zlib = require('zlib');

http.createServer((req, res) => {
  let encodings = req.headers['accept-encoding'];
  res.setHeader('Content-Encoding', 'gzip');
  let fileName = 'write2.txt.gz';
  if (encodings) {
    let hasGzip = encodings.match(/\bgzip\b/);
    let hasDeflate = encodings.match(/\bdeflate\b/);
    if (hasGzip) {
      res.setHeader('Content-Encoding', 'gzip');
      fs.createReadStream(path.resolve(__dirname, fileName)).pipe(zlib.createGzip()).pipe(res);
    } else if (hasDeflate){
      res.setHeader('Content-Encoding', 'deflate');
      fs.createReadStream(path.resolve(__dirname, fileName)).pipe(zlib.createDeflate()).pipe(res);
    }
  }
}).listen(3000);







