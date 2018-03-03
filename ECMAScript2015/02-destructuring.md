# 解构赋值
+ 解构赋值的规则
+ 只要等号右边的值不是对象或数组,就先将其转为对象,由于`undefined`和`null`无法转为对象,所以对它们进行解构赋值,都会报错.
## 1. 数组的解构赋值
### 1.1 解构赋值
> 从数组和对象中提取值,对变量进行赋值,这被称为解构（Destructuring）
```javascript
/** ES5的写法 */
let a = 1;
let b = 2;
let c = 3;
```
```javascript
/** ES6的写法 */
let [a, b, c] = [1, 2, 3];
```
### 1.2. 数组的对应位置变量赋值
> 本质上,这种写法属于`模式匹配`,只要等号两边的模式相同,左边的变量就会被赋予对应的值,如果解构不成功,变量的值就等于`undefined`
```javascript
let [one, [[two], three]] = [1, [[2], 3]];// 解构成功
console.log('one:', one);// one: 1
console.log('two:', two);// two: 2
console.log('three:', three);// three: 3

let [, , six] = [4, 5, 6];// 解构成功
console.log('six:', six);// six: 6

let [seven, , nine] = [7, 8, 9];// 解构成功
console.log('seven:', seven);// seven: 7
console.log('nine:', nine);// nine: 9

let [ten, ...numbers] = [10, 11, 12, 13];// 解构成功
console.log('ten:', ten);// ten: 10
console.log('numbers:', numbers);// numbers: [ 11, 12, 13 ]

let [x, y, ...z] = ['name'];// 解构不成功
console.log('x:', x);// x: name
console.log('y:', y);// y: undefined
console.log('z:', z);// z: []
```
### 1.3. 不完全解构
> 等号左边的模式,只匹配一部分的等号右边的数组
```javascript
let [one, two] = [1, 2, 3];// 不完全解构
console.log('one:', one);// one: 1
console.log('two:', two);// two: 2

let [four, [five], seven] = [4, [5, 6], 7];// 不完全解构
console.log('four:', four);// four: 4
console.log('five:', five);// five: 5
console.log('seven:', seven);// seven: 7 
```
### 1.4. 注意
#### 1.4.1. 不可遍历的结构不能被赋值
> 如果等号右边不是数组,或者严格来说,不是可遍历的结构,那么将会报错,等号右边的值,要么转为对象以后不具备`Iterator`接口,要么本身就不具备`Iterator`接口
```javascript
let [one] = 1;
let [two] = true;
let [three] = NaN;
let [four] = undefined;
let [five] = null;
let [six] = {};
```
#### 1.4.2. `Set`可以使用数组的解构赋值
```javascript
let [one, two, three] = new Set([1,2,3]);
console.log('one:', one);// one: 1
console.log('two:', two);// two: 2
console.log('three:', three);// three: 3
```
> 事实上,只要某种数据结构具有`Iterator`接口,都可以采用数组形式的解构赋值,参见`《Generator 函数》`

#### 1.4.3. 默认值
> 解构赋值允许指定默认值
```javascript
let [one = true] = [];
console.log('one:', one);// one: true

let [two, three = 3] = [2];
console.log('two:', two);// two: 2
console.log('three:', three);// three: 3
```

#### 1.4.4. `===`严格等于
> ES6内部允许使用严格相等运算符`===`,判断一个位置是否有值.所以,如果一个数组成员不严格等于`undefined`,默认值是不会生效的
```javascript
let [one = 1] = [undefined];
console.log('one:', one);// one: 1

let [two = 2] = [null];
console.log('two:', two);// two: null
```
#### 1.4.5. 默认值是一个表达式
> 如果默认值是一个表达式,那么这个表达式是惰性求值的,只有在用到的时候,才会求值
```javascript
function getValue() {
    return 1;
}

let [one = getValue()] = [undefined];
console.log(one);// one: 1
```
上面的代码等价于下边的代码
```javascript
function getValue() {
    return 1;
}

let one;
if ([1][0] === undefined) {
    one = getValue();
} else {
    one = [1][0];
}

console.log('one:', one);// one: 1
```
#### 1.4.6. 默认值的其他用法
> 默认值可以引用解构赋值的其他变量,但是该变量必须已经声明
```javascript
{
    let [one = 1, two = one] = [];
    console.log('one:', one);// one: 1
}

{
    let [one = 1, two = one] = ['zz'];
    console.log('one:', one);// one: zz
    console.log('two:', two);// two: zz
}

{
    let [one = 1, two = one] = ['zz', 'xx'];
    console.log('one:', one);// one: zz
    console.log('two:', two);// two: xx
}

{
    let [one = two, two = 1] = [];
    console.log('one:', one);// ReferenceError: two is not defined
    console.log('two:', two);
}
```

## 2. 对象的解构赋值
### 2.1 等号左右两边次序
> 等号左边的两个变量的次序,与等号右边两个同名属性的次序不一致,但是对取值完全没有影响.
```javascript
let {one, two} = {one: 1, two: 2};
console.log('one:', one);// one: 1
console.log('two:', two);// two:2

let {three} = {one: 1, two: 2};
console.log('three:', three);// three: undefined
// three变量没有对应的同名属性,导致取不到值,最后等于`undefined`.
```
### 2.2. 对象同名属性赋值给等号右边的变量
> 对象的解构赋值的内部机制,是先找到同名属性,然后再赋给对应的变量.真正被赋值的是后者,而不是前者
```javascript
let {aaa: bbb} = {aaa: 'AAA', ccc: 'CCC'};
console.log('bbb:', bbb);// bbb: AAA

let {one: n, two: b} = {one: 111, two: 222};
console.log('n:', n);// n: 111
console.log('b:', b);// b: 222
```
### 2.3  解构用于嵌套解构的对象
```javascript
let person = {
    worker: [
        'mark',
        {age: 18}
    ]
};

let {worker: [user, {age}]} = person;
console.log('user:', user);// user: Mark
console.log('age:', age); // age: 18
```
+ 这里的`worker`只是模式,而非变量,因此不会被赋值,采用下边的这种方式可以将`worker`改成变量

```javascript
let person = {
    worker: [
        'mark',
        {age: 18}
    ]
};

let {worker, worker: [user, {age}]} = person;
console.log('worker:', worker);// worker: [ 'mark', { age: 18 } ]
console.log('user:', user);// user: Mark
console.log('age:', age); // age: 18
```
### 2.4 嵌套赋值
```javascript
let obj = {};
let arr = [];

({foo: obj.prop, bar: arr[0]} = {foo: 111, bar: true});
console.log('obj:', obj);// obj: { prop: 111 }
console.log('arr:', arr);// arr: [ true ]
```
### 2.5 对象的结构可以指定默认值
```javascript
{
    let {x = 3} = {};
    console.log('x:', x);// x: 3
}
{
    let {x, y = 5} = {x: 1};
    console.log('x:', x);// x: 1
    console.log('y:', y);// x: 5
}
{
    let {x: y = 3} = {};
    console.log('y:', y);// y: 3
}
{
    let {x: y = 3} = {x: 5};
    console.log('y:', y);// y: 5
}
{
    let {message: msg = 'this is a message'} = {};
    console.log('msg:', msg);// msg: this is a message
}
```
### 2.6 对象解构赋值的默认值
> 默认值生效的条件是,对象的属性值严格等于`undefined`,如果结构失败,变量的值等于`undefined`
```javascript
{
    let {x = 3} = {x: undefined};
    console.log('x:', x);// x: 3
}
{
    let {x = 3} = {x: null};
    console.log('x:', x);// x: null
}
```
### 2.7 已声明变量的解构赋值
```javascript
let x;
// { x } = {x:1};// 这是错误的写法
({x} = {x: 1});
console.log('x:', x);
```
> 错误的原因,因为JavaScript引擎会将`{x}`理解成为一个代码块,从而发生语法错误,只有不将大括号写在行首,避免JavaScript将其解释为代码块,才能解决这个问题.

### 2.8 古怪的但是没有意义的赋值表达式
```javascript
({} = [true, false]);
({} = 'abc');
({} = []);
```
### 2.9 对象的解构赋值到某一个变量
```javascript
let {log, sin, cos} = Math;
```
+ 数组的本质是特殊的对象,因此可以对数组进行对象属性的结垢
```javascript
let arr = [1, 2, 3];
let {0: first, [arr.length - 1]: last} = arr;
console.log('first:', first);// first: 1
console.log('last:', last);  // last: 3
```
## 3. 字符串的解构赋值
### 3.1 字符串被转换成类数组的对象
```javascript
const [a, b, c, d, e] = 'world';
console.log('a:', a);// a: w
console.log('b:', b);// b: o
console.log('c:', c);// c: r
console.log('d:', d);// d: l
console.log('e:', e);// e: d
```
### 3.2 类似数组对象的`length`属性
+ 类似数组的对象都有一个`length`属性
```javascript
let {length: len} = 'world';
console.log('len:', len);// len: 5
```
### 3.3 数值和布尔值的解构赋值
+ 解构赋值时,如果等号右边是数值和布尔值,则会先转为对象
```javascript
let {toString: name} = 123;
console.log(name === Number.prototype.toString());
//false
console.log(name === Number.prototype.toString);
//true
```
```javascript
let {toString: bool} = true;
console.log(bool === Boolean.prototype.toString());
// false
console.log(bool === Boolean.prototype.toString);
// true
```
+ 数值和布尔值的包装对象都有`toString`属性,因此变量`name`和`bool`都能取到值
```javascript
let {name: x} = undefined;// TypeError
let {name: y} = null;// TypeError
```

### 3.4 函数参数的解构赋值
```javascript
function sum([a, b]) {
    return a + b;
}
console.log(sum([1, 8]));
```
+ 例子1
```javascript
[[1, 2], [3, 4]].map(([a, b]) => {
    console.log(a + b);
});
// 3 
// 7
```
+ 例子2
```javascript
function foo({x = 0, y = 0} = {}) {
    return [x, y];
}
console.log(foo({x: 1, y: 3}));// [ 1, 3 ]
console.log(foo({x: 1}));// [ 1, 0 ]
console.log(foo({}));// [ 0, 0 ]
console.log(foo());// [ 0, 0 ]
// 实际上是把调用的`foo()`的实参传给`foo()`的虚参等号右边
```
+ `undefined`会触发函数参数的默认值
```javascript
[1, undefined, 3].map((x = 'yes') => {
    console.log('x:', x);
});
// x: 1
// x: yes
// x: 3
```
## 4. 圆括号问题
> 解构赋值虽然很方便,但是解析起来并不容易.对于编译器来说,一个式子到底是模式,还是表达式,没有办法从一开始就知道,必须解析到（或解析不到）等号才能知道.
+ 由此带来的问题
> 如果模式中出现圆括号怎么处理.ES6的规则是,只要有可能导致解构的歧义,就不得使用圆括号. 
> 但是,这条规则实际上不那么容易辨别,处理起来相当麻烦.因此,建议只要有可能,就不要在模式中放置圆括号.
+ 赋值语句的非模式部分,可以使用圆括号
+ 不能使用圆括号的情况
    * 变量声明语句
    * 函数参数
    * 赋值语句的模式

## 5. 解构赋值的用途
### 5.1 交换变量的值
+ 简洁易读,语义清晰
```javascript
let x = 1;
let y = 2;
[x, y] = [y, x];
```
### 5.2 从函数返回多个值
```javascript
function getArray() {
    return [1, 2, 3];
}

let [a, b, c] = getArray();
console.log('a:', a);//  a: 1
console.log('b:', b);//  b: 2
console.log('c:', c);//  c: 3

function getObj() {
    return {
        one: 1,
        two: 2
    }
}

let {one, two} = getObj();
console.log('one:', one);// one: 1
console.log('two:', two);// two: 2
```
### 5.3 函数参数的定义
+ 解构赋值可以方便地将一组参数与变量名对应起来
```javascript
// 参数是有次序的值
function NoOrder([x, y, z]) {}
NoOrder([1, 2, 3]);

// 参数是无次序的值
function HaveOrder({x, y, z}) {}
HaveOrder({z: 3, y: 2, x: 1});
```
### 5.4 提取`JSON`数据
```javascript
let JSONData = {
    username: 'Mark',
    age: 18,
    score: [94, 96],
    status: 'PASS'
};

let {username, age, score, status} = JSONData;
console.log('username:', username);// username: Mark
console.log('age:', age);// age: 18
console.log('score:', score);// score: [ 94, 96 ]
console.log('status:', status);// status: PASS

```
### 5.5 函数参数的默认值
+ 避免写更多的`||`语句
```javascript
jQuery.ajax = function (url, {
    async = true,
    beforeSend = function () {
    },
    cache = true,
    complete = function () {
    },
    global = true
    // other options
}){
    // other code  
};
```
### 5.6 遍历`Map`结构
> 任何部署了Iterator接口的对象,都可以用`for...of`循环遍历,Map结构原生支持Iterator接口,配合变量的解构赋值,获取键名和键值就很方便
```javascript
const map = new Map();
map.set('username', 'Mark');
map.set('age', 18);
map.set('status', 'PASS');

for (let [key, value] of map) {
    console.log('key:', key, 'value:', value);
}
// key: username value: Mark
// key: age value: 18
// key: status value: PASS
```
+ 只想获得键名
```javascript
for (let [key] of map) {
    console.log('key:', key, 'value:', value);
}
```
+ 只想获得键值
```javascript
for (let [,value] of map) {
    console.log('key:', key, 'value:', value);
}
```
### 5.7 输入模块的指定方法
> 加载模块时,往往需要指定输入哪些方法.解构赋值使得输入语句非常清晰
```javascript
const {NumberOne, NumberTwo} = require('Number');
```