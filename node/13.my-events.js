function EventEmitter () {
  this._events = {};
}

EventEmitter.prototype.on = function (eventName, callback) {
  if (!this._events) {
    this._events = {};
  }
  if (eventName !== 'newListener') {
    // 监听绑定的方法
    this._events.newListener && this._events.newListener.forEach(fn => fn(eventName));
  }
  if (this._events[eventName]) {
    this._events[eventName].push(callback);
  } else {
    this._events[eventName] = [callback];
  }
};

EventEmitter.prototype.emit = function (eventName, ...args) {
  if (this._events[eventName]) {
    this._events[eventName].forEach(events => events.call(this, ...args));
  }
};

EventEmitter.prototype.off = function (eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(fn => fn !== callback && fn.l !== callback);
  }
};

EventEmitter.prototype.once = function (eventName, callback) {
  function one () {
    callback();
    this.off(eventName, one);
  }
  one.l = callback;
  this.on(eventName, one);
};

module.exports = EventEmitter;
