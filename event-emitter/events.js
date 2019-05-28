function EventEmitter() {
  this._events = [];
}

EventEmitter.prototype.on = function (eventName, callback) {
  if (eventName !== 'newListener') {
    this._events['newListener'] ? this._events['newListener'].forEach(fn => fn(eventName)) : void 0;
  }
  if (!this._events) {
    this._events = []
  }
  if (this._events[eventName]) {
    this._events[eventName].push(callback);
  } else {
    this._events[eventName] = [callback];
  }

}

EventEmitter.prototype.once = function (eventName, callback) {
  function one() {
    callback(...arguments);
    this.off(eventName, one);
  }
  one.l = callback
  this.on(eventName, one);
}

EventEmitter.prototype.off = function (eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(fn => {
      return fn !== callback && fn.l !== callback;
    });
  }
}

EventEmitter.prototype.emit = function (eventName, ...args) {
  if (this._events[eventName]) {
    this._events[eventName].forEach(fn => {
      fn.call(this, ...args);
    })
  }
}

module.exports = EventEmitter;
