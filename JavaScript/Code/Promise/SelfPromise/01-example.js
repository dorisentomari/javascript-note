const MyPromise = require('./01-basePromise.js');

let promise = new MyPromise((resolve, reject) => {
  console.log('1');
  resolve('成功');
});

promise.then(value => {
  console.log('success: ', value);
}, err => {
  console.log('failed: ', err);
});
