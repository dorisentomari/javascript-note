// const MyPromise = require('./MyPromise');

let promise = new MyPromise((resolve, reject) => {
  console.log('1');
  setTimeout(() => {
    // resolve('成功');
    reject('失败');
  }, 1000);
});

promise.then(value => {
  console.log('success: ', value);
}, err => {
  console.log('failed: ', err);
});

promise.then(value => {
  console.log('success: ', value);
}, err => {
  console.log('failed: ', err);
});

promise.then(value => {
  console.log('success: ', value);
}, err => {
  console.log('failed: ', err);
});