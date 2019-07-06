// buffer 代表的是内存
// buffer 一旦声明后不能随意更改大小

let buf = Buffer.alloc(5);

console.log(buf);

let buf2 = Buffer.allocUnsafe(5);

console.log(buf2);

let buf3 = Buffer.from('计算机');

console.log(buf3);
console.log(buf3.length);
console.log(buf3.byteLength);
console.log(Buffer.isBuffer(buf3));
console.log(Buffer.isBuffer(Array));

// alloc 根据长度声明 buffer
// from 根据字符串声明 buffer
// isBuffer 判断是否是 Buffer 类型

let buf4 = Buffer.from([0x16, 0xff]);
// console.log(buf4);

// copy(targetBuffer, targetBufferStart, sourceStart, sourceEnd);
Buffer.prototype.copy = function (targetBuffer, targetBufferStart, sourceStart = 0, sourceEnd = this.length) {
  for (let i = 0; i < sourceEnd - sourceStart; i++) {
    targetBuffer[targetBufferStart + i] = this[i];
  }
};

let buf5 = Buffer.from('将');
let buf6 = Buffer.from('军');
let bigBuffer = Buffer.alloc(6);

buf5.copy(bigBuffer, 0, 0, 3);
buf6.copy(bigBuffer, buf5.length);
console.log(buf5, buf5.toString());
console.log(buf6, buf6.toString());
console.log(bigBuffer, bigBuffer.toString());

Buffer.concat = function (bufferList, len = bufferList.reduce((prev, curr) => prev + curr.length, 0)) {
  let buffer = Buffer.alloc(len);
  let offset = 0;
  bufferList.forEach(buf => {
    buf.copy(buffer, offset);
    offset += buf.length;
  });
  return buffer;
};

let buf7 = Buffer.concat([buf5, buf6]);
console.log(buf7.toString());

let buf8 = Buffer.from('将*军*将');
console.log(buf8.indexOf('*', 4));

Buffer.prototype.split = function (sep) {
  let arr = [];
  let len = Buffer.from(sep).length;
  let current;
  let offset = 0;
  while((current = (this.indexOf(sep, offset))) !== -1) {
    arr.push(this.slice(offset, current));
    offset = current + len;
  }
  arr.push(this.slice(offset));
  return arr;
};

let li = buf8.split('*');

console.log(li);
li.forEach(l => console.log(l.toString()));
