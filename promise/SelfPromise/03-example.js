const MyPromise = require('./03-thenPromise.js')

let p = new MyPromise((resolve, reject) => {
  throw new Error('错误')
});

p.then().then().then().then().then().then().then(data => {
  console.log(data, 'success');
}, err => {
  console.log(err);
});
