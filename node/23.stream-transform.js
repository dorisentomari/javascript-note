const {Transform} = require('stream');
const crypto = require('crypto');
// 转换流只能实现一个 _transform 方法

// 等价于 console.log
// process.stdout.write();

// 输入
// process.stdin.on('data', data => {
//   console.log(data);
// });

class MyTransform extends Transform {

  _transform (chunk, encoding, callback) {
    chunk = crypto.createHash('md5').update(chunk).digest('hex');
    this.push(chunk.toString().toUpperCase() + '\n');
    callback();
  }

}

process.stdin.pipe(new MyTransform()).pipe(process.stdout);
