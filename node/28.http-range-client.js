let http = require('http');
let fs = require('fs');
let path = require('path');
let limit = 5;
let start = 0;

let ws = fs.createWriteStream('write.txt');

let flowing = true;
process.stdin.on('data', function (data) {
  if(data.toString().includes('p')) {
    flowing = false;
  } else if(data.toString().includes('r')){
    flowing = true;
    download();
  }
});

function download () {
  http.get({
    hostname: 'localhost',
    port: 3000,
    headers: {
      Range: `bytes=${start}-${start + limit}`
    }
  }, function (res) {
    let total = res.headers['content-range'].split('/')[1];
    start = start + limit + 1;
    res.pipe(ws, { end: false });
    if (total >= start) {
      setTimeout(() => download(), 100);
    } else {
      console.log('write end');
      ws.end();
    }
  });
}

download();
