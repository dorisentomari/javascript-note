const MyPromise = require('./04-Promise');
const fs = require('fs');

// function read(url) {
//   return new MyPromise((resolve, reject) => {
//     fs.readFile(url, 'utf8', (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }

// 回调方法的 Promise 化
function promisify(fn) {
  return function () {
    return new MyPromise((resolve, reject) => {
      fn(...arguments, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

let read = promisify(fs.readFile);

// 把一个对象上的所有方法都 Promise 化
function promisifyAll(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'function') {
      obj[key + 'Async'] = promisify(obj[key]);
    }
  }
}


MyPromise.all([1, 2, 3, read('./info.txt'), read('./age.txt')]).then(res => {
  console.log('MyPromise.all: ', res);
});

MyPromise.race([read('./info.txt'), read('./age.txt'), 1, 2, 3]).then(res => {
  console.log('MyPromise.race: ', res);
});
