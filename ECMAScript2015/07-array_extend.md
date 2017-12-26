# 7. 数组的扩展
## 7.1 扩展运算符
+ 扩展运算符`spread`是三个点`...`,好比`rest`参数的逆运算,将一个数组转为用逗号分隔的参数序列
```javascript
console.log(...[1, 2, 3]); // 1 2 3
console.log(1, ...[2, 5, 8, 9, 6], 5); // 1 2 5 8 9 6 5
```
+ 该运算符主要用于函数调用
```javascript
function one(array, ...values) {
    array.push(...values);
    console.log(array);
}

one([], 2, 3, 4, 5, 3);// [ 2, 3, 4, 5, 3 ]
```
+ 扩展运算符与正常的函数参数可以结合使用,在扩展运算符后边放表达式
```javascript
let x = 10;
const arr = [...(x > 0 ? ['a'] : [])];
console.log(arr); // ['a']
```
> 如果扩展运算符后面是一个空数组,则不产生任何效果
```javascript
console.log([...[], 11]);// [ 11 ]
```
+ 代替数组的`apply`方法
```javascript
let one = [5,8,9,6,3];
let two = [8,9,6,7,8];
console.log(Math.max(...one));// 9
one.push(...two);
console.log(one);// [ 5, 8, 9, 6, 3, 8, 9, 6, 7, 8 ]
```
## 7.2 扩展运算符的应用
+ 复制数组
```javascript
let one = [1, 2];
let two = [...one];
let [...three] = one;
console.log('two:', two);// two: [ 1, 2 ]
console.log('thee:', three);// thee: [ 1, 2 ]
console.log(one === two);// false
console.log(one === three);// false
console.log(two === three);// false
```
> 上面的两种写法,`two`和`three`都是`one`的克隆
+ 合并数组
```javascript
let arr = [7, 5, 4];
// ES5
[1, 2].concat(arr);
// ES6
[1, 2, ...arr];

let one = [1, 2];
let two = [3, 4];
let three = [5, 6];
// ES5
one.concat(two, three);
// ES6
[...one, ...two, ...three];
```
+ 与解构赋值结合
> 扩展运算符可以与解构赋值结合起来,用于生成数组
```javascript
const [one, ...rest] = [1, 2, 3, 4, 5];
console.log(one, rest);// 1 [ 2, 3, 4, 5 ]

const [two, ...next] = [];
console.log(two, next);// undefined []

const [three, ...pext] = [1, 2, 3, 4, 5];
console.log(three, pext);// 1 [ 2, 3, 4, 5 ]
```
> 如果将扩展运算符用于数组赋值,只能放在参数的最后一位,否则会报错
```javascript
const [one, ...rest, two] = [];// SyntaxError: Rest element must be last element
```
+ 字符串
> 扩展运算符还可以将字符串转为真正的数组
```javascript
console.log([...'username']);// console.log([...'username']);// [ 'u', 's', 'e', 'r', 'n', 'a', 'm', 'e' ]
```
> 上面的写法,有一个重要的好处,那就是能够正确识别四个字节的 `Unicode`字符
```javascript
console.log('x\uD83D\uDE80y'.length);// 4
console.log([...'x\uD83D\uDE80y'].length);// 3
```
> 凡是涉及到操作四个字节的`Unicode`字符的函数,都有这个问题.因此,最好都用扩展运算符改写
```javascript
let str = 'x\uD83D\UDE80y';
console.log(str.split('').reverse().join(''));
console.log([...str].reverse().join(''));
```
> 上面代码中,如果不使用扩展运算符,字符串的`reverse`操作就不正确
+ `Map`和`Set`结构,`Generator`函数
> 扩展运算符内部调用的是数据结构的`Iterator`接口,因此只要具有 `Iterator`接口的对象,都可以使用扩展运算符,比如 Map 结构
```javascript
let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
]);

let arr = [...map.keys()];
console.log(arr);// [ 1, 2, 3 ]

const gen = function* () {
    yield 1;
    yield 2;
    yield 3;
};
console.log([...gen()]);// [ 1, 2, 3 ]
```
> 变量`gen`是一个`Generator`函数,执行后返回的是一个遍历器对象,对这个遍历器对象执行扩展运算符,就会将内部遍历得到的值,转为一个数组

> 如果对没有`Iterator`接口的对象,使用扩展运算符,将会报错.
```javascript
const obj = {a: 1, b: 2};
console.log([...obj]); // TypeError: obj is not iterable
```    
## 7.3 `Array.from()`
`Array.from`方法用于将两类对象转为真正的数组:类似数组的对象`array-like object`和可遍历`iterable`的对象,包括 ES6 新增的数据结构`Set`和`Map`
> 常见的类似数组的对象是`DOM`操作返回的`NodeList`集合,以及函数内部的`arguments`对象,`Array.from`都可以将它们转为真正的数组

```javascript
let node = document.querySelectorAll('p');
Array.from(node).forEach((list) => {
    console.log(list);
});

function one() {
    let arg = Array.from(arguments);
    console.log(arg);
}

one(1, 2, 3, 4);// [ 1, 2, 3, 4 ]
```
+ `Set`
> 只要是部署了`Iterator`接口的数据结构,`Array.from`都能将其转为数组
```javascript
console.log(Array.from('username'));// [ 'u', 's', 'e', 'r', 'n', 'a', 'm', 'e' ]

let name = new Set(['user', 'age']);
console.log(Array.from(name));// [ 'user', 'age' ]
```
> 字符串和`Set`结构都具有`Iterator`接口,因此可以被`Array.from`转为真正的数组
+ 扩展运算符`...`也可以将某些数据结构转为数组
```javascript
function one() {
    const args = [...arguments];
    console.log(args);
}

one(1, 2, 3, 4);// [ 1, 2, 3, 4 ]
```
> 扩展运算符背后调用的是遍历器接口`Symbol.iterator`,如果一个对象没有部署这个接口,就无法转换.`Array.from`方法还支持类似数组的对象.所谓类似数组的对象,本质特征只有一点,即必须有`length`属性.因此,任何有`length`属性的对象,都可以通过`Array.from`方法转为数组,而此时扩展运算符就无法转换
```javascript
console.log(Array.from({length: 100}));// 返回100个undefined
```
+ 部署该方法的浏览器,可以用`Array.prototype.slice`方法替代
```javascript
const toArray = (() => {
    Array.from ? Array.from : obj => [].slice.call(obj);
});
```
> `Array.from`还可以接受第二个参数,作用类似于数组的`map`方法,用来对每个元素进行处理,将处理后的值放入返回的数组
```javascript
console.log(Array.from([, 2, 3, 5], x => x * x));
// 等价于
console.log(Array.from([1, 2, 3, 4].map(x => x * x)));
// 将数组中布尔值为false的成员转为0
console.log(Array.from([1,2,3,4,,],x=> x|| 0));// [ 1, 2, 3, 4, 0 ]
//返回各种数据的类型
function typesOf() {
    return Array.from(arguments, value => typeof value);
}
console.log(typesOf(1, true, 'sen'));// [ 'number', 'boolean', 'string' ]
```
> 如果`map`函数里面用到了`this`关键字,还可以传入`Array.from`的第三个参数,用来绑定`this`

> `Array.from()`可以将各种值转为真正的数组,并且还提供`map`功能.这实际上意味着,只要有一个原始的数据结构,你就可以先对它的值进行处理,然后转成规范的数组结构,进而就可以使用数量众多的数组方法
```javascript
console.log(Array.from({length: 2}, () => 'Mark'));
```
> `Array.from`的第一个参数指定了第二个参数运行的次数.这种特性可以让该方法的用法变得非常灵活

> `Array.from()`的另一个应用是,将字符串转为数组,然后返回字符串的长度.因为它能正确处理各种`Unicode`字符,可以避免`JavaScript`将大于`\uFFFF`的`Unicode`字符,算作两个字符的 `bug`
```javascript
function one(str) {
    return Array.from(str).length;
}
```
## 7.4 `Array.of()`
`Array.of`方法用于将一组值,转换为数组
```javascript
console.log(Array.of(1, 2, 3));// [ 1, 2, 3 ]
console.log(Array.of(3));// [ 3 ]
console.log(Array.of());// [ ]
console.log(Array.of(undefined));// [ undefined ]
```
> `Array.of`基本上可以用来替代`Array()`或`new Array()`,并且不存在由于参数不同而导致的重载.它的行为非常统一
> `Array.of`总是返回参数值组成的数组.如果没有参数,就返回一个空数组.
+ `Array.of`方法可以用下面的代码模拟实现
```javascript
function ArrayOf() {
    return [].slice.call(arguments);
}
```
## 7.5 数组实例的`copyWithin()`
数组实例的`copyWithin`方法,在当前数组内部,将指定位置的成员复制到其他位置,会覆盖原有成员,然后返回当前数组.也就是说,使用这个方法,会修改当前数组
```javascript
console.log(Array.prototype.copyWithin(target, start = 0, end = this.length));
```
+ `target`,必需,从该位置开始替换数据.
+ `start`,可选,从该位置开始读取数据,默认为 0.如果为负值,表示倒数.
+ `end`,可选,到该位置前停止读取数据,默认等于数组长度.如果为负值,表示倒数
```javascript
console.log([1,2,3,4,5].copyWithin(0, 1));// [ 2, 3, 4, 5, 5 ]
console.log([1,2,3,4,5].copyWithin(0, 2));// [ 3, 4, 5, 4, 5 ]
console.log([1,2,3,4,5].copyWithin(0, 3));// [ 4, 5, 3, 4, 5 ]
console.log([1,2,3,4,5].copyWithin(0, 4));// [ 5, 2, 3, 4, 5 ]
console.log([1,2,3,4,5].copyWithin(0, 5));// [ 1, 2, 3, 4, 5 ]
```

## 7.6 数组实例的`find()`和`findIndex()`
数组实例的`find`方法,用于找出第一个符合条件的数组成员.它的参数是一个回调函数,所有数组成员依次执行该回调函数,直到找出第一个返回值为`true`的成员,然后返回该成员.如果没有符合条件的成员,则返回`undefined`
```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
console.log(arr.find(n => n > 5));// 6
```
数组实例的`findIndex`方法的用法与`find`方法非常类似,返回第一个符合条件的数组成员的位置,如果所有成员都不符合条件,则返回`-1`
```javascript
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
arr.findIndex((value, index, ar) => {
    console.log(value > 5, index, ar);
});

/****
 * false 0 [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]
 * false 1 [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]
 * false 2 [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]
 * false 3 [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]
 * false 4 [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]
 * true 5 [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]
 * true 6 [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]
 * true 7 [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]
 * true 8 [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]
 * false 9 [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ]
 */

console.log([NaN].indexOf(NaN));// -1
console.log([NaN].findIndex(n => Object.is(NaN, n)));// 0
```
> `indexOf`方法无法识别数组的`NaN`成员,但是`findIndex`方法可以借助`Object.is`方法做到

## 7.7 数组实例的`fill()`
`fill`方法使用给定值,填充一个数组
```javascript
console.log(new Array(10).fill(0));// [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
```    
`fill`方法用于空数组的初始化非常方便.数组中已有的元素,会被全部抹去.
`fill`方法还可以接受第二个和第三个参数,用于指定填充的起始位置和结束位置.
```javascript
let ken = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
console.log(ken.fill(5, 1, 3));// [ 0, 5, 5, 0, 0, 0, 0, 0, 0, 0 ]
```
> 表示往`ken`里边填充`5`,从第`2`个位置开始,到第`3`个位置之前结束
## 7.8 数组实例的`entries()`,`keys()`和`values()`
ES6 提供三个新的方法——`entries()`,`keys()`和`values()`——用于遍历数组.它们都返回一个遍历器对象(详见《Iterator》一章),可以用`for...of`循环进行遍历,唯一的区别是`keys()`是对键名的遍历、`values()`是对键值的遍历,`entries()`是对键值对的遍历
```javascript
for (let ken of ['a', 'b', 'c'].keys()) {
    console.log(ken);
}
/***
 * 0
 * 1
 * 2
 */

for (let [ken, gen] of ['a', 'b', 'c'].entries()) {
    console.log(ken, gen);
}
/***
 * 0 'a'
 * 1 'b'
 * 2 'c
 */
```
+ 如果不使用`for...of`循环.可以手动调用遍历器对象的`next`方法.进行遍历
```javascript
let one = ['a', 'b', 'c'];
let oneEntry = one.entries();
console.log(oneEntry.next().value);// [ 0, 'a' ]
console.log(oneEntry.next().value);// [ 1, 'b' ]
console.log(oneEntry.next().value);// [ 2, 'c' ]
console.log(oneEntry.next().value);// undefined
```
## 7.9 数组实例的`includes()`
`Array.prototype.includes`方法返回一个布尔值.表示某个数组是否包含给定的值.与字符串的`includes`方法类似
```javascript
console.log(['a', 'b', 'c'].includes('a'));// true
console.log(['a', 'b', 'c'].includes('e'));// false
```
该方法的第二个参数表示搜索的起始位置.默认为0.如果第二个参数为负数.则表示倒数的位置.如果这时它大于数组长度（比如第二个参数为-4.但数组长度为3）.则会重置为从0开始
```javascript
console.log(['a', 'b', 'c'].includes('a', 3));// false
console.log(['a', 'b', 'c'].includes('b', -1));// false
```
没有该方法之前.我们通常使用数组的`indexOf`方法.检查是否包含某个值

> `indexOf`方法有两个缺点.一是不够语义化.它的含义是找到参数值的第一个出现位置.所以要去比较是否不等于-1.表达起来不够直观.二是.它内部使用严格相等运算符（===）进行判断.这会导致对NaN的误判
```javascript
console.log([NaN].indexOf(NaN)); // -1
console.log([NaN].includes(NaN));// true
```
下面代码用来检查当前环境是否支持该方法.如果不支持.部署一个简易的替代版本
```javascript
const contains = (() =>
        Array.prototype.includes
            ? (arr, value) => arr.includes(value)
            : (arr, value) => arr.some(el => el === value))();

console.log(contains(['one', 'two'], 'one'));// true
console.log(contains(['one', 'two'], 'three'));// false
```
## 7.10 数组的空位
数组的空位指.数组的某一个位置没有任何值.比如.`Array`构造函数返回的数组都是空位.
<br/>  
注意.空位不是`undefined`.一个位置的值等于`undefined`.依然是有值的.空位是没有任何值.in运算符可以说明这一点
```javascript
console.log(0 in [undefined, undefined]);// true
console.log(0 in [, , ,]);// false
```
> 第一个数组的 0 号位置是有值的.第二个数组的 0 号位置没有值
+ ES5 对空位的处理.已经很不一致了.大多数情况下会忽略空位
    * `forEach()`, `filter()`, `reduce()`, `every()` 和`some()`都会跳过空位.
    * `map()`会跳过空位,但会保留这个值
    * `join()`和`toString()`会将空位视为`undefined`,而`undefined`和`null`会被处理成空字符串
```javascript
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// reduce方法
[1,,2].reduce((x,y) => return x+y) // 3

// some方法
[,'a'].some(x => x !== 'a') // false

// map方法
[,'a'].map(x => 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // "#a##"

// toString方法
[,'a',undefined,null].toString() // ",a,,"
```
+ ES6 则是明确将空位转为`undefined`
```javascript
Array.from(['a',,'b'])
// [ "a", undefined, "b" ]

[...['a',,'b']]
// [ "a", undefined, "b" ]

[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]

new Array(3).fill('a') // ["a","a","a"]

let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1
```
+ `entries()`、`keys()`、`values()`、`find()`和`findIndex()`会将空位处理成`undefined`
```javascript
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
```
由于空位的处理规则非常不统一,所以建议避免出现空位.