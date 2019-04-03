const PENDING = 'pending';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function MyPromise (exector) {
  this.status = PENDING;
  this.value = undefined;
  this.reason = undefined;

  let self = this;

  function resolve (value) {
    if (self.status === PENDING) {
      self.value = value;
      self.status = FULFILLED;
    }
  }

  function reject (reason) {
    if (self.status === PENDING) {
      self.reason = reason;
      self.status = REJECTED;
    }
  }

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
}

module.exports = MyPromise;
