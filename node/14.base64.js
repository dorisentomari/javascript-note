// 进制转换的问题
// 编码，1 个汉字占的字节大小
// 在 UTF8 编码下，占 3 个字节
// 在 GBK 编码下，占 2 个字节

// ASCII 里的 127 个字符表示了美国人所有的内容，十进制
// 1 个字节，由 8 个位组成

// GB2312 占 2 个字节，超过 127 就认为是其他字符，(247-161) * (254-161)

// GB18030 编码，(247-161) * 255

// Unicode 编码，可变的，没有被推行

// utf8，一个汉字占 3 个字节

// 01010101 01010101 01010101

// 二进制转换为十六进制

let buf = Buffer.from('珠');
console.log(buf);

console.log((0xe7).toString(2));
console.log((0x8f).toString(2));
console.log((0xa0).toString(2));


// 11100111 10001111 10100000

// 111001 111000 111110 100000

let arr = [
  parseInt('111001', 2),
  parseInt('111000', 2),
  parseInt('111110', 2),
  parseInt('100000', 2)
];

console.log(arr);

let str = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();

str += 'abcdefghijklmnopqrstuvwxyz';
str += '0123456789+/';

arr.forEach(el => {
  console.log(str[el]);
});

console.log(Buffer.from('珠').toString('base64'));
