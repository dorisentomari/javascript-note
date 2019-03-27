// const MyPromise = require('./03-thenPromise.js')

let p = new MyPromise((resolve, reject) => {
  resolve(123);
});

let promise2 = p.then(data => {
  console.log(data, '|||||||||');
  return data;
}, err => {
  return err + 400;
})

promise2.then(data => {
  console.log(data, '***');
}).then(data => {
  console.log(data, '////')
})


