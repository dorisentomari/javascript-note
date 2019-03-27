const PENDING = 'pending';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function MyPromise (exector) {
  this.status = PENDING;
  this.value = undefined;
  this.reason = undefined;
  this.onResolveCallbacks = [];
  this.onRejectCallbacks = [];

  let self = this;

  function resolve (value) {
    if (self.status === PENDING) {
      self.value = value;
      self.status = FULFILLED;
      self.onResolveCallbacks.forEach(fn => fn());
    }
  }

  function reject (reason) {
    if (self.status === PENDING) {
      self.reason = reason;
      self.status = REJECTED;
      self.onRejectCallbacks.forEach(fn => fn());
    }
  }

  // 定义两个队列，存放对应的回调，
  try {
    exector(resolve, reject);
  } catch (e) {
    // 报错就是调用 then 方法的 reject 方法
    reject(e);
  }
}

// promise2 是当前 Then 返回的 promise
// x 是当前 then 中成功或失败回调的结果
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject('循环引用');
  }
  if (promise2 !== null && (typeof promise2 === 'object' || typeof promise2 === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        // 用刚才取出的 Then 方法，不要再取值，因为再次取值可能会发生异常
        then.call(x, y => {
          resolve(y);
        }, r => {
          reject(r);
        });

      } else {
        resolve(x);
      }
    } catch (e) {
      reject(e);
    }
  } else {
    resolve(x);
  }

}

MyPromise.prototype.then = function (onfulfilled, onrejected) {
  let self = this;
  let promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onfulfilled(self.value);
          console.log('setTimeout', x);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    }
    
    if (self.status === REJECTED) {
      setTimeout(() => {
        try {
          let x = reject(onrejected(self.reason));
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    }

    if (self.status === PENDING) {
      // 异步，需要把成功和失败分别存放到对应的数组里
      // 如果异步调用了 resolve 或 reject，会依次执行 
      self.onResolveCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onfulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })
      });

      self.onRejectCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onrejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })
      });
    }
  });
  
  return promise2;

}

// module.exports = MyPromise;
