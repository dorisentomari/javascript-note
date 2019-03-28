const fs = require('fs');
const MyPromise = require('./03-thenPromise');

// 延迟对象
function read(url) {
  let defer = MyPromise.deferred();
  fs.readFile(url, 'utf8', (err, data) => {
    if (err) {
      return defer.reject(err);
    } else {
      defer.resolve(data);
    }
  });
  return defer.promise;
}

read('./age.txt').then(data => {
  console.log(data);
});

