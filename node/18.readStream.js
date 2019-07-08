const fs = require('fs');
const EventsEmitter = require('events');

class ReadStream extends EventsEmitter{
  constructor (path, options = {}) {
    super();
    this.path = path;
    this.flags = options.flags || 'r';
    this.encoding = options.encoding || undefined;
    this.start = options.start || 0;
    this.end = options.end || undefined;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.open();
    this.on('newListener', (type) => {
      if (type === 'data') {
        // 用户监听了 data 事件，内部应该开始读取
        console.log('data');
        this.read();
      }
    });
  }

  open () {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        return this.emit('error', err);
      }
      // 保存文件额描述符
      this.fd = fd;
      console.log('fd: ', fd);
      this.emit('open', fd);
    });
  }

  read () {
    if (typeof this.fd !== 'number') {
      this.once('open', () => this.read());
    } else {
      let buffer = Buffer.alloc(this.highWaterMark);
      fs.read();
    }
  }

  pipe (ws) {
    this.on('data', data => {
      let flag = ws.write(data);
      if (!flag) {
        this.pause();
      }
      ws.on('drain', () => {
        this.resume();
      });
      this.on('end', () => {
        ws.end();
      });
    })
  }
}

module.exports = ReadStream;
