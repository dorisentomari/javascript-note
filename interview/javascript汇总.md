# 1. 用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值

```javascript
const randomNumber = () => Math.floor(Math.random() * 31 + 2);

let len = 5;

let i = 0;

let arr = [];

function randomArr (arr, num) {
  if(arr.indexOf(num) < 0) {
    arr[i] = num;
    i++;
  } else {
    num = randomNumber();
  }
  if (arr.length === len) {
    return arr;
  } else {
    return randomArr(arr, num);
  }
}

let s = randomArr([], randomNumber());

console.log(s);
```

# 2. 计算当月最后一天是几号(当前这个月的天数)
+ 原理: 获取当前的时间，获取下个月当前的时间，两个时间差，换算成天，就是当前这个月的天数

```javascript
function getCurrentMonthLastDay() {
  let currentDay = new Date();
  currentDay.setMonth(currentDay.getMonth() + 1);
  let diff = currentDay - new Date();
  let day = diff / 1000 / 60 / 60 / 24;
  return day;
}

let day = getCurrentMonthLastDay();
console.log(day);
```

# 3. 去除字符串的空格
+ 去除头部空格
+ 去除尾部空格
+ 去除头部和尾部空格
+ 去除中间空格
+ 去除所有空格

```javascript
function trimSpace(str, mode) {
  const POSITION = Object.freeze({
    left: Symbol(),
    right: Symbol(),
    both: Symbol(),
    center: Symbol(),
    all: Symbol(),
  });

  const trimLeftSpace = /^\s+/g;
  const trimRightSpace = /\s+$/g;
  const trimBothSpace = /^\s+|\s+$/g;
  const trimCenterSpace = /\w\s+\w/g;
  const trimAllSpace = /\s/g;

  switch (mode) {
    case POSITION.left:
      str = str.replace(trimLeftSpace, '');
      break;
    case POSITION.right:
      str = str.replace(trimRightSpace, '');
      break;
    case POSITION.both:
      str = str.replace(trimBothSpace, '');
      break;
    case POSITION.center:
      while (str.match(trimCenterSpace)) {
        str = str.replace(/(\w)(\s+)(\w)/, `$1$3`)
      }
      break;
    case POSITION.all:
      str = str.replace(trimAllSpace, '');
      break;
    default:
      str = str.replace(trimBothSpace, '');
      break;
  }
  return str;
}


let str = ' hello world ';
console.log(trimSpace(str, POSITION.left));
console.log(trimSpace(str, POSITION.right));
console.log(trimSpace(str, POSITION.both));
console.log(trimSpace(str, POSITION.center));
console.log(trimSpace(str, POSITION.all));
```

# 4. 去除字符串中最后一个指定的字符
+ str.substr(start, end)，end 默认是到字符串结束
+ str.substring(start, length)，length 默认到字符串结束

```javascript
function removeLastMark(str, mark) {
  if (!str || !mark) {
    return str;
  }
  let idx = str.lastIndexOf(mark);
  if (idx === -1) {
    return str;
  }
  return str.substr(0, idx) + str.substr(idx + 1);
}
```

# 5. 把下划线命名转换为驼峰命名
+ 驼峰分为大驼峰和小驼峰
+ 原理: 循环正则匹配 `\w_\w` 字符串，如果匹配到，说明需要进行替换，如果匹配不到，说明不需要替换
+ 首字母为 `_` 和尾字母为 `_` 的不做替换

```javascript
function toCamel(str, isBigCamel = false) {
  if (isBigCamel) {
    str = str.replace(/(\w)/, (match, $1) => `${$1.toUpperCase()}`);
  }
  while (str.match(/\w_\w/)) {
    str = str.replace(/(\w)(_)(\w)/, (match, $1, $2, $3) => `${$1}${$3.toUpperCase()}`);
  }
  return str;
}
```

# 6. 切换字符串大小写
+ 根据英文字母在 ASCII 表中的数值大小来确定该字符是大写还是小写，或者是没有大小写之分

```javascript
function changeStr(str) {
  let arr = str.split('');
  str = '';
  arr.forEach(item => {
    let charCode = item.charCodeAt();
    if (charCode >= 65 && charCode <= 90) {
      str += item.toLowerCase();
    } else if (charCode >= 97 && charCode <= 122) {
      str += item.toUpperCase();
    } else {
      str += item;
    }
  });
  return str;
}
```

# 7. 对字符串加密和解密
> 在密码学中，凯撒密码（英语：Caesar cipher），或称凯撒加密、凯撒变换、变换加密，是一种最简单且最广为人知的加密技术。它是一种替换加密的技术，明文中的所有字母都在字母表上向后（或向前）按照一个固定数目进行偏移后被替换成密文。例如，当偏移量是3的时候，所有的字母A将被替换成D，B变成E，以此类推。这个加密方法是以罗马共和时期凯撒的名字命名的，据称当年凯撒曾用此方法与其将军们进行联系。

> 凯撒密码通常被作为其他更复杂的加密方法中的一个步骤，例如维吉尼亚密码。凯撒密码还在现代的ROT13系统中被应用。但是和所有的利用字母表进行替换的加密技术一样，凯撒密码非常容易被破解，而且在实际应用中也无法保证通信安全。


```javascript
// 利用 base64, 浏览器环境自带 btoa / atob 方法
// Node.js 需要引入相关库
const str = "abcdefg";

console.log(btoa(str));
console.log(atob(btoa(str)));

// 凯撒密码
const encodeCaesar = ({str = "", padding = 3}) =>
  !str
    ? str
    : str
        .split("")
        .map((s) => String.fromCharCode(s.charCodeAt() + padding))
        .join("");

const decodeCaesar = ({str = "", padding = 3}) =>
  !str
    ? str
    : str
        .split("")
        .map((s) => String.fromCharCode(s.charCodeAt() - padding))
        .join("");

console.log(encodeCaesar({str: "hello world"}));
console.log(decodeCaesar({str: "khoor#zruog"}));
```
