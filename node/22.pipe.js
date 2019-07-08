const fs = require('fs');

let rs = fs.createReadStream('./static/user.txt', {
  highWaterMark: 4
});

let ws = fs.createWriteStream('./static/newUser.txt', {
  highWaterMark: 1
});

rs.pipe(ws);
