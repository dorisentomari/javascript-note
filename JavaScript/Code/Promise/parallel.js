let fs = require('fs');

let after = function (times, callback) {
  let result = {};
  return function (key, value) {
    result[key] = value;
    if (--times === 0) {
      callback(result);
    }
  }
}

// 依靠计数器完成多个异步操作获取返回值
let newFn = after(2, function (result) {
  console.log('result: ', result);
});

fs.readFile('./file/name.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    newFn('name', data);
  }
});

fs.readFile('./file/age.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    newFn('age', data);
  }
});
