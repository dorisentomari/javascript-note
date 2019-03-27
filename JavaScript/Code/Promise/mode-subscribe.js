let fs = require('fs');

function EventEmitter () {
  this._arr = [];
}

// 订阅，也就是执行
EventEmitter.prototype.on = function (callback) {
  this._arr.push(callback);
}

// 发布，发布时需要让 on 的方法依次执行
EventEmitter.prototype.emit = function (callback) {
  this._arr.forEach(fn => fn.apply(this, arguments));
}

let e = new EventEmitter();

let result = {};

e.on((data, key) => {
  result[key] = data;
  if (Object.keys(result).length === 2) {
    console.log(result);
  }
});

fs.readFile('./file/name.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    e.emit(data, 'name');
  }
});

fs.readFile('./file/age.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    e.emit(data, 'age');
  }
});
