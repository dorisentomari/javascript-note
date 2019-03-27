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

MyPromise.prototype.then = function (onfulfilled, onrejected) {
  let self = this;
  if (self.status === FULFILLED) {
    onfulfilled(self.value);
  }
  
  if (self.status === REJECTED) {
    onrejected(self.reason);
  }

  if (self.status === PENDING) {
    // 异步，需要把成功和失败分别存放到对应的数组里
    // 如果异步调用了 resolve 或 reject，会依次执行 
    self.onResolveCallbacks.push(() => {
      onfulfilled(self.value);
    });
    self.onRejectCallbacks.push(() => {
      onrejected(self.reason);
    });
  }

}

module.exports = MyPromise;
