export default {
  init(cb) {
    // 发送请求一般由两种，一种是 fetch，一种是 xhr
    let xhr = window.XMLHttpRequest;
    let oldOpen = xhr.prototype.open;
    xhr.prototype.open = function (method, url, async, username, password) {
      this.info = {
        method, url, async, username, password
      };
      return oldOpen.apply(this, arguments);
    };
    let oldSend = xhr.prototype.send;
    xhr.prototype.send = function (value) {
      let start = +new Date();
      let fn = (type) => () => {
        this.info.time = +new Date() - start;
        this.info.requestSize = value ? value.length : 0;
        this.info.responseSize = xhr.responseText.length;
        this.info.type = type;
        cb(this.info);
      };
      this.addEventListener('load', fn('load'), false);
      this.addEventListener('error', fn('error'), false);
      this.addEventListener('abort', fn('abort'), false);
      return oldSend.apply(this, arguments);
    }
  },
  // 还需要扩展一个 fetch 的监控方法
}
