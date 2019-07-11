const zlib = require('zlib');
const path = require('path');
const fs = require('fs');

let filePath = path.join(__dirname, './write.txt');

let file = fs.readFileSync(filePath, 'utf8');

zlib.gzip(file, (err, result) => {
  console.log(result);
  fs.writeFileSync('write2.txt.gz', result, 'utf8');
});

zlib.unzip('write2.txt.gz', (err, result) => {
  console.log(result);
});

