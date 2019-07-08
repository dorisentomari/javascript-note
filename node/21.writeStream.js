const fs = require('fs');
const EventEmitter = require('events');

class WriteStream extends EventEmitter {
  constructor (path, options) {
    super();
    this.path = path;
    this.flag = options.flag || 'w';
    this.autoClose = options.autoClose || true;
    this.start = options.start || 0;
    this.highWaterMark = options.highWaterMark || 16 * 1024;
    this.open();
    // 存放缓存列表，存放多次 write 的方法
    this.cache = [];
    // 需要维护一个写入的总长度
    this.len = 0;
    // 是否触发 drain 事件
    this.needDrain = false;
    // 偏移量
    this.offset = this.start;
    this.writing = false;
  }

  write (chunk, encoding, callback) {
    // 强制转换写入的内容为 Buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    this.len += chunk.length;
    let ret = this.len <= this.highWaterMark;
    if (this.writing) {
      this.cache.push({
        chunk,
        encoding,
        callback
      });
    } else {
      this.writing = true;
      this._write(chunk, encoding, () => {
        callback();
        this.clearBuffer();
      });
    }
    return ret;
  }

  clearBuffer () {
    // 将缓存一个个拿出来，依次执行
    let obj = this.cache.shift();
    if (obj) {
      this._write(obj.chunk, obj.encoding, () => {
        obj.callback();
        this.clearBuffer();
      });
    } else {

    }
  }

  _write (chunk, encoding, callback) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => {
        this._write(chunk, encoding, callback);
      });
    } else {
      console.log('this.fd: ', this.fd);
      fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
        // 写入后增加长度
        this.offset += written;
        this.len -= written;
        // 清空 cache
        callback();
      });
    }
  }

  open () {
    fs.open(this.path, this.flag, (err, fd) => {
      if (err) {
        console.log(err);
      }
      this.fd = fd;
      this.emit('open', this.fd);
      console.log('open: ', this.fd);
    });
  }

}

module.exports = WriteStream;

