const fs = require('fs');

let json = []

for (let i = 1; i <= 63; i++) {
  json.push(`http://static.ikite.top/image/cartoon/${i}.jpg`);
}

fs.writeFileSync('data.json', JSON.stringify(json), err => {
  if (err) {
    console.log(err);
  } else {
    console.log('写入成功')
  }
});
