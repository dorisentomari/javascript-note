Function.prototype.before = function (callback) {
  return () => {
    callback();
    this();
  }
}

function fn() {
  console.log('一些有用的功能');
}

let newFn = fn.before(() => {
  console.log('在函数前执行');
});

// newFn();

let after = function (times, callback) {
  return (...args) => {
    if (--times === 0) {
      callback(...args);
    }
  }
}

let newAfter = after(3, (a, b) => {
  console.log('newAfter: ', a, b);
});

newAfter('hello', 'how are you?')
newAfter('hello', 'how are you?')
newAfter('hello', 'how are you?')
