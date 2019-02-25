// 初始状态
const PENDING = 'pending';
// 成功状态
const FULFILLED = 'fulfilled';
// 失败状态
const REJECTED = 'rejected';


function Promise(executor) {
  // 缓存当前 promise 的实例
  let self = this;
  // 设置状态
  self.status = PENDING;
  // 定义存放成功的回调的数组
  self.onResolvedCallbacks = [];
  // 定义存放失败的回调的数组
  self.onRejectedCallbacks = [];
  // 当调用此方法的时候，如果 promise 的状态为 pending ，可以转为成功状态
  // 如果已经是成功状态或失败状态，则什么都不做
  // 2.1
  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }

    // 2.1.1
    // 如果是初始状态，转为成功状态
    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = FULFILLED;
        // 成功后会得到一个值，这个值不能改变
        self.value = value;
        // 调用所有成功的回调
        self.onResolvedCallbacks.forEach(cb => cb(self.value));
      }
    })
  }

  function reject(reason) {
    // 2.1.2
    if (self.status === PENDING) {
      self.status = REJECTED;
      // 把失败的原因给 value
      self.value = reason;
      self.onRejectedCallbacks.forEach(cb => cb(self.value));
    }
  }

  try {
    // 此函数执行可能会异常，所以需要捕获
    // 如果出错了，需要用错误对象 reject
    executor(resolve, reject);
  } catch (e) {
    // 如果函数执行失败了，则调用失败的 reject
    reject(e);
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用'));
  }
  let called = false;
  // if (x instanceof Promise) {
  //   if (x.status === PENDING) {
  //     x.then(y => {
  //       resolvePromise(promise2, y, resolve, reject);
  //     }, reject);
  //   } else {
  //     x.then(resolve, reject);
  //   }
  // }

  if (x !== null && ((typeof x === 'object') || (typeof x === 'function'))) {
    // 对应的是一个 thenable 对象，是要有 then 方法就可以
    try {
      // 当我们的 promise 和别人写的 promise 进行交互
      // 编写的时候，要尽量考虑兼容性，允许别人乱写
      let then = x.then;
      if (typeof then === 'function') {
        // 有些 promise 会同时执行成功和失败的回调
        // 如果 promise2 已经成功或失败，就不再处理了
        if (called) {
          return
        }
        called = true;
        then.call(x, function (y) {
          resolvePromise(promise2, y, resolve, reject);
        }, function (err) {
          if (called) {
            return
          }
          called = true;
          reject(err);
        });
      } else {
        // 到此 x 不是一个 thenable 对象，那就直接把他当做 resolve promise2 即可
        // 当返回的是一个对象，但是有 then 属性，也不可以 then
        resolve(x);
      }
    } catch (e) {
      if (called) {
        return
      }
      called = true;
      reject(e);
    }
  } else {
    // 如果 x 是一个普通的值，则用 x 的值赋给 promise2
    resolve(x);
  }
}


// onFulfilled 是用来接收 promise 成功的值或者失败的原因
Promise.prototype.then = function (onFulfilled, onRejected) {
  // 如果成功和失败的回调没有传值，则表示这个 then 没有任何逻辑，把值往后抛
  // 2.2.1
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {
    throw reason
  };
  // 2.2.2
  // 如果当前的 promise 状态已经是成功状态， onFulfilled 直接取值
  let self = this;
  let promise2;
  if (self.status === FULFILLED) {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value);
          // 如果获取到了返回值 x，会走解析 promise 的过程
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          // 如果执行成功的回调过程中出错了，用错误的原因把 promise2 进行 reject
          reject(e);
        }
      });
    })
  }

  if (self.status === REJECTED) {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          let x = onRejected(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    })
  }

  if (self.status === PENDING) {
    return promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });

      self.onRejectedCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onRejected(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });

      });
    });
  }
};

// catch 原理就是只传失败的回调
Promise.prototype.catch = function (onRejected) {
  this.then(null, onRejected);
};

Promise.deferred = Promise.defer = function () {
  let defer = {};
  defer.promise = new Promise(function (resolve, reject) {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

module.exports = Promise;
