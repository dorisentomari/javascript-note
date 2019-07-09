const http = require('http');
const fs = require('mz/fs');
const url = require('url');
const path = require('path');
const mime = require('mime');

let server = http.createServer(async (req, res) => {
  let { pathname } = url.parse(req.url);
  let filePath = path.join(__dirname, pathname);
  try {
    let statObj = await fs.stat(filePath);
    if (statObj.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      await fs.access(filePath);
    }
    res.setHeader('Content-Type', `${mime.getType(filePath)};charset=utf8`);
    fs.createReadStream(filePath).pipe(res);
  } catch (e) {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = 3000;

server.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running at http://localhost:${PORT}`);
  }
});
