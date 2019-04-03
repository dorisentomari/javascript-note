let MyPromise = require('./MyPromise');

let p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    let num = Math.random();
    if (num < 0.5) {
      resolve(num);
    } else {
      reject('失败');
    }
  });
});

p1.then(data => {
  console.log(data);
}, err => {
  console.log(err);
});


