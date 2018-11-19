# 1. [String.prototype.replace](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
+ str.replace(regexp|substr, newSubStr|function)
+ 返回一个被第二个参数替换后的新的字符串，不会修改原字符串
+ 如果没有参数，返回原字符串。如果没有第二个参数，那么将被替换成`undefined`
+ 第二个参数可以是一个`function`，当匹配开始执行后，函数开始执行，函数的返回值作为替换字符串。如果第一个参数是正则表达式，并且为全局匹配模式，那么这个方法会被多次调用，每一次匹配都会被调用。

# 2. 使用方法
### 2.1 使用字符串作为参数
替换字符串可以插入一些特殊的变量名，具体的参数的个数取决于正则里包括了多少个括号子串

|变量名|代表的值|
|-----|--------|
|$$   |插入一个$|
|$&   |插入匹配的子串|
|$`   |插入当前匹配的子串左边的内容|
|$'   |插入当前匹配的子串右边的内容|
|$n   |假如第一个参数是RegExp，并且n是小于100的非负整数，那么插入第n个括号匹配的字符串|

```javascript
// 把分组匹配到的两组字符串交换位置
let regexp = /(\w+)\s(\w+)/;
let str = 'hello world';
let newStr = str.replace(regexp, '$2 $1');
console.log(newStr);
```

### 2.2 指定一个函数作为参数
当匹配开始执行后，函数开始执行，函数的返回值作为替换字符串。如果第一个参数是正则表达式，并且为全局匹配模式，那么这个方法会被多次调用，每一次匹配都会被调用。

|变量名|代表的值|
|-----|--------|
|match|匹配的子串，对应上边的$&|
|p1,p2|假如`replace`的第一个参数是RegExp，则代表第n个括号匹配的字符串，对应上边的$1, $2|
|offset|匹配到的子字符串在原字符串中的偏移量，比如原字符串是`abcd`，匹配到的是`bc`，那么offset就是1|
|string|被匹配到的原字符串   |

```javascript
let regexp = /[A-Z]/g;
let str = 'fileName';

let newStr = str.replace(regexp, function(match, offset, string) {
  console.log(match);     // N  match参数是被正则匹配到的字符或字符串
  console.log(offset);    // 4  offset参数是被匹配到的值在原字符串中的索引位置，这里因为没有用到分组，所以不会有p1，p2参数
  console.log(string);    // fileName string参数是原字符串自身的值
  return '-' + match.toLowerCase();
});

console.log(newStr);
```

# 3. 代码示例
+ 输入: 一种字符串由`x`，`-`和`_`组成

```
---x---x---x---

_x_x___x___x___
```

+ 输出: `x`产生一个`on`的状态，`-`产生一个`off`的状态，`_`的长度表示某种状态的长度

```
[
  { on: true, length: 1 },
  { on: false, length: 1 },
  { on: true, length: 2 }
]
```

+ 结果

```javascript
let str = '-_x__--x____';
let resArray = [];
let newStr = str.replace(/(x_*)|(-*)/g, function(match, p1, p2, offset, string) {
  if (p1) {
    resArray.push({on: true, length: p1.length});
  }
  if (p2) {
    resArray.push({on: false, length: p2.length});
  }
})
console.log(resArray);

```













++
