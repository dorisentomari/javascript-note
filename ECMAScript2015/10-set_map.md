# 10. Set Map
## 10.1 Set
#### 10.1.1基本用法
ES6 提供了新的数据结构`Set`。它类似于数组，但是成员的值都是唯一的，没有重复的值
+ `Set`本身是一个构造函数，用来生成`Set`数据结构
```javascript
let sen = new Set();
let arr = [1, 5, 8, 9, 6, 3, 2, 1, 8];
arr.forEach(n => sen.add(n));
for(let i of sen){
    console.log(i);
}
/***
 * 1
 * 5
 * 8
 * 9
 * 6
 * 3
 * 2
 */
```
+ `Set`函数可以接受一个数组（或者具有`iterable`接口的其他数据结构）作为参数，用来初始化
```javascript
const ken = new Set([1, 2, 3, 4, 5, 4]);
console.log([...ken]); // [ 1, 2, 3, 4, 5 ]

const items = new Set([1, 2, 3, 4, 5, 4, 5, 6, 4]);
console.log(items.size); // 6

function one() {
    return [...document.querySelectorAll('p')];
}

const gen = new Set(one());
console.log(gen.size);
// 类似于
one().forEach(p => set.add(p));
console.log(gen.size);
```
向`Set`加入值的时候，不会发生类型转换，所以`5`和`"5"`是两个不同的值。`Set`内部判断两个值是否不同，使用的算法叫做`Same-value equality`，它类似于精确相等运算符`===`，主要的区别是`NaN`等于自身，而精确相等运算符认为`NaN`不等于自身
```javascript
let ken = new Set();
let one = NaN;
let two = NaN;
ken.add(one);
ken.add(two);
console.log(ken); // Set { NaN }
```
`Set`实例添加了两个`NaN`，但是只能加入一个。这表明，在`Set`内部，两个`NaN`是相等
+ 两个对象总是不相等
```javascript
let ken = new Set();
ken.add({});
console.log(ken.size, ken); // 1 Set { {} }
ken.add({});
console.log(ken.size, ken); // 2 Set { {}, {} }
```
#### 10.2 `Set`实例的属性和方法
+ `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
+ `Set.prototype.size`：返回`Set`实例的成员总数
`Set`实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。
下面先介绍四个操作方法。
+ `add(value)`,添加某个值，返回`Set`结构本身
+ `delete(value)`,删除某个值，返回一个布尔值，表示是否删除成功
+ `has(value)`,返回一个布尔值，表示该值是否为`Set`的成员
+ `clear()`,清除所有成员，没有返回值
```javascript
let ken = new Set();
ken.add('one').add('two').add('two');
console.log(ken.size, ken); // 2 Set { 'one', 'two' }

console.log(ken.has('one')); // true

ken.delete('two');
console.log(ken.size, ken); // 1 Set { 'one' }
```
+ 在判断是否包括一个键上面，`Object`结构和`Set`结构的写法不同
```javascript
const one = {
    width: 10,
    height: 12
}
if(one[width]){
    //
}

const two = new Set();
two.add('width');
two.add('height');

if(two.has('width')){
    //
}
```
+ `Array.from`方法可以将`Set`结构转为数组
```javascript
let ken = new Set([1, 2, 8, 9, 6, 3]);
let array = Array.from(ken);
console.log(array instanceof Array, array); // true [ 1, 2, 8, 9, 6, 3 ]
```
#### 10.3 遍历操作
`Set`结构的实例有四个遍历方法，可以用于遍历成员
+ `keys()`：返回键名的遍历器
+ `values()`：返回键值的遍历器
+ `entries()`：返回键值对的遍历器
+ `forEach()`：使用回调函数遍历每个成员
需要特别指出的是，`Set`的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用`Set`保存一个回调函数列表，调用时就能保证按照添加顺序调用
+ `keys()`，`values()`，`entries()`
`keys`方法、`values`方法、`entries`方法返回的都是遍历器对象。由于`Set`结构没有键名，只有键值(或者说键名和键值是同一个值)，所以`keys`方法和`values`方法的行为完全一致
```javascript
let ken = new Set(['one', 'two', 'three']);
for (let item of ken.keys()) {
    console.log(item);
}
/**
 * one
 * two
 * three
 */

for (let item of ken.values()) {
    console.log(item);
}
/**
 * one
 * two
 * three
 */

for (let item of ken.entries()) {
    console.log(item);
}
/**
 * [ 'one', 'one' ]
 * [ 'two', 'two' ]
 * [ 'three', 'three' ]
 */
```
`entries`方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等

+ `Set`结构的实例默认可遍历，它的默认遍历器生成函数就是它的`values`方法
```javascript
console.log(Set.prototype[Symbol.iterator] === Set.prototype.values); // true
```
可以省略`values`方法，直接用`for...of`循环遍历`Set`
+ `forEach()`
`Set`结构的实例与数组一样，也拥有`forEach`方法，用于对每个成员执行某种操作，没有返回值
```javascript
let ken = new Set([1, 4, 9]);
ken.forEach((value, key) => console.log(key, ':', value));
/***
 * 1 ':' 1
 * 4 ':' 4
 * 9 ':' 9
 */
```
上面代码说明，`forEach`方法的参数就是一个处理函数。该函数的参数与数组的`forEach`一致，依次为键值、键名、集合本身（上例省略了该参数）。这里需要注意，`Set`结构的键名就是键值（两者是同一个值），因此第一个参数与第二个参数的值永远都是一样的

`forEach`方法还可以有第二个参数，表示绑定处理函数内部的`this`对象

+ 遍历的应用
扩展运算符`...`内部使用`for...of`循环，所以也可以用于`Set`结构
```javascript
let ken = new Set([1, 4, 9]);
let gen = [...ken];
console.log(gen); // [ 1, 4, 9 ]
```
扩展运算符和`Set`结构相结合，就可以去除数组的重复成员
```javascript
let ken = [1, 4, 9,4,8,4,9];
let gen = [...new Set(ken)];
console.log(gen); // [ 1, 4, 9, 8]
```
数组的`map`和`filter`方法也可以间接用于`Set`了
```javascript
let ken = new Set([1, 5, 3, 2, 7, 4, 5, 6]);
ken = new Set([...ken].map(x => x * x));
console.log(ken); // Set { 1, 25, 9, 4, 49, 16, 36 }

let gen = new Set([1, 2, 3, 4, 5]);
gen = new Set([...gen].filter(x => (x % 2) === 0))
console.log(gen); // Set { 2, 4 }
```
+ Set 可以很容易地实现并集`Union`、交集`Intersect`和差集`Difference`
```javascript
let ken = new Set([1, 2, 5]);
let gen = new Set([2, 5, 9]);

let union = new Set([...ken, ...gen]);
let intersectKen = new Set([...ken].filter(x => gen.has(x)));
let differenceKen = new Set([...ken].filter(x => !gen.has(x)));
console.log('ken gen union', union); // ken gen union Set { 1, 2, 5, 9 }
console.log('ken gen intersectKen', intersectKen); // ken gen intersect Set { 2, 5 }
console.log('ken gen differenceKen', differenceKen); // ken gen difference Set { 1 }

let intersectGen = new Set([...gen].filter(x => ken.has(x)));
let differenceGen = new Set([...gen].filter(x => !ken.has(x)));
console.log('gen ken inersectGen', intersectGen); // gen ken inersectGen Set { 2, 5 }
console.log('gen ken difference', differenceGen); // gen ken difference Set { 9 }
```
差集会因为数值顺序的不一样而导致结果不一样

+ 在遍历操作中，同步改变原来的`Set`结构
有两种变通方法。一种是利用原`Set`结构映射出一个新的结构，然后赋值给原来的`Set`结构；另一种是利用`Array.from`方法
```javascript
let ken = new Set([1, 2, 5]);

ken = new Set([...ken].map(val => val * 2));
console.log(ken); // Set { 2, 4, 10 }

ken = new Set(Array.from(ken, val => val * 2));
console.log(ken); // Set { 4, 8, 20 }
```
#### `WeakSet`
+ 没有`size`属性，不能遍历

## 10.2 `Map`
#### 10.2.1 含义和基本用法
> JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制
```javascript
const data = {};
const element = document.getElementById('wrapper');
data[element] = 'metadata';
console.log(data['[object HTMLDivElement]']); // metadata
```
原意是将一个`DOM`节点作为对象data的键，但是由于对象只接受字符串作为键名，所以`element`被自动转为字符串`[object HTMLDivElement]`

为了解决这个问题，ES6 提供了`Map`数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，`Object`结构提供了“字符串—值”的对应，`Map`结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，`Map`比`Object`更合适
```javascript
let ken = new Map();
let gen = {number: 111};
ken.set(gen, 'gen string');
console.log(ken.get(gen)); // gen string

console.log(ken.has(gen)); // true
console.log(ken.delete(gen)); // true
```
```javascript
const ken = new Map([
    ['name', 'Mark'],
    ['home', 'Beijing']
]);
console.log(ken.size); // 2
console.log(ken.has('name')); // true
console.log(ken.get('name')); // Mark
```
+ `Map`构造函数接受数组作为参数
```javascript
let ken = [
    ['name', 'Mark'],
    ['home', 'Beijing']
];

let kenMap = new Map();

ken.forEach(
    ([key, value]) => kenMap.set(key, value)
);
console.log(kenMap); // Map { 'name' => 'Mark', 'home' => 'Beijing' }
```
+ `Set`和`Map`都可以用来生成新的`Map`
```javascript
let ken = new Set([
    ['name', 'Mark'],
    ['home', 'Beijing']
]);

let gen = new Map(ken);
console.log(gen.get('name')); // Mark

let sen = new Map([['color', 'work']]);
let den = new Map(sen);
console.log(den.get('color')); // work
```
+ 如果对同一个键多次赋值，后面的值将覆盖前面的值
+ 如果读取一个未知的键，则返回`undefined`
+ 只有对同一个对象的引用，`Map`结构才将其视为同一个键
```javascript
let ken = new Map();
ken.set(['name'], 'Sherry');
console.log(ken.get['name']); // get
```
上面代码的`set`和`get`方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此`get`方法无法读取该键，返回`undefined`
```javascript
let ken = new Map();
let one = ['aaa'];
let two = ['aaa'];
ken.set(one, 111).set(two, 222);
console.log(ken.get(one)); // 111
console.log(ken.get(two)); // 222
```
`Map` 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名
如果`Map`的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，`Map`将其视为一个键，比如`0`和`-0`就是一个键，布尔值`true`和字符串`true`则是两个不同的键。另外，undefined和`null`也是两个不同的键。虽然`NaN`不严格相等于自身，但`Map`将其视为同一个键
```javascript
let ken = new Map();

ken.set(-0,111);
console.log(ken.get(+0)); // 111

ken.set(true, 1);
ken.set('true', 3);
console.log(ken.get(true)); // 1

ken.set(undefined, 66);
ken.set(null, 88);
console.log(ken.get(undefined)); // 66
console.log(ken.get(null)); // 88

ken.set(NaN, 99);
console.log(NaN); // NaN
```
#### 10.2.2 实例的属性和操作方法
+ `size`属性
`size`属性返回`Map`结构的成员总数
```javascript
let ken = new Map();

ken.set('username', 'Mark');
ken.set('home', 'Beijing');
console.log(ken.size); // 2
```
+ `set(key, value)`
`set`方法设置键名`key`对应的键值为`value`，然后返回整个`Map`结构。如果`key`已经有值，则键值会被更新，否则就新生成该键
`set`方法返回的是当前的`Map`对象，因此可以采用链式写法
```javascript
let ken = new Map();
ken.set('username', 'Mark').set('home', 'Beijing').set('age', 18);
console.log(ken); // Map { 'username' => 'Mark', 'home' => 'Beijing', 'age' => 18 }
```
+ `get(key)`
`get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`
```javascript
let ken = new Map();
let name = function () {
    console.log('name function');
}
ken.set(name, 'username set ken');
console.log(ken.get(name)); // username set ken
```
+ `has(key)`
```javascript
let ken = new Map();
ken.set('username', 'Mark').set('home', 'Beijing').set('age', 18);
console.log(ken.has('username')); // true
console.log(ken.has('home')); // true
console.log(ken.has('age')); // true
```
+ `delete(key)`
```javascript
let ken = new Map();
ken.set('username', 'Mark').set('home', 'Beijing').set('age', 18);
ken.delete('username');
console.log(ken.has('username')); // false
```
+ `clear()`
```javascript
let ken = new Map();
ken.set('username', 'Mark').set('home', 'Beijing').set('age', 18);
ken.clear();
console.log(ken); // Map {}
```

#### 10.2.3 遍历方法
`Map`结构原生提供三个遍历器生成函数和一个遍历方法
+ `keys()`：返回键名的遍历器。
+ `values()`：返回键值的遍历器。
+ `entries()`：返回所有成员的遍历器。
+ `forEach()`：遍历 Map 的所有成员
`Map`的遍历顺序就是插入顺序
```javascript
let ken = new Map([
    ['username', 'Sherry'],
    ['age', 18],
    ['home', 'Beijing']
]);
for (let key of ken.keys()) {
    console.log(key);
}
/***
 * username
 * age
 * home
 */

for (let value of ken.values()) {
    console.log(value);
}
/**
 * Sherry
 * 18
 * Beijing
 */

for (let item of ken.entries()) {
    console.log(item);
}
/**
 * [ 'username', 'Sherry' ]
 * [ 'age', 18 ]
 * [ 'home', 'Beijing' ]
 */

for (let [key, value] of ken.entries()) {
    console.log(key, value);
}
/**
 * username Sherry
 * age 18
 * home Beijing
 */

for (let [key, value] of ken) {
    console.log(key, value);
}
/**
 *  Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法
 * username Sherry
 * age 18
 * home Beijing
 */
console.log(ken[Symbol.iterator] === ken.entries); // true
```
+ `Map`结构转为数组结构，比较快速的方法是使用扩展运算符`...`
```javascript
let ken = new Map([
    ['username', 'Sherry'],
    ['age', 18],
    ['home', 'Beijing']
]);

let one = [...ken.keys()];
console.log(one); //[ 'username', 'age', 'home' ]

let two = [...ken.values()];
console.log(two); // [ 'Sherry', 18, 'Beijing' ]

let three = [...ken.entries()];
console.log(three);

/**
 * [ [ 'username', 'Sherry' ],
 * [ 'age', 18 ],
 * [ 'home', 'Beijing' ] ]
 */

let four = [...ken];
console.log(four);
/**
 * [ [ 'username', 'Sherry' ],
 * [ 'age', 18 ],
 * [ 'home', 'Beijing' ] ]
 */
```
+ 结合数组的`map`方法、`filter`方法，可以实现 Map 的遍历和过滤（Map 本身没有`map`和`filter`方法）
```javascript
let ken = new Map([
    ['111', 'Sherry'],
    ['222', 18],
    ['333', 'Beijing']
]);

let gen = new Map([...ken].filter(([key, value]) => key < '333'));
let sen = new Map([...ken].map(([key, value]) => [key * 2, value]));
console.log(gen); // Map { '111' => 'Sherry', '222' => 18 }
console.log(sen); // Map { 222 => 'Sherry', 444 => 18, 666 => 'Beijing' }
```
+ Map 还有一个`forEach`方法，与数组的`forEach`方法类似，也可以实现遍历
```javascript
let ken = new Map([
    ['111', 'Sherry'],
    ['222', 18],
    ['333', 'Beijing']
]);

ken.forEach((value, key, map) => console.log(key, value));
/**
 * 111 Sherry
 * 222 18
 * 333 Beijing
 */
```
+ `forEach`方法还可以接受第二个参数，用来绑定`this`
```javascript
let one = {
    report: function (key, value) {
        console.log(key, value);
    }
}

let map = new Map([
    ['username', 'Sherry'],
    ['age', 18],
    ['home', 'Beijing']
])

map.forEach(function (key, value, map) {
    this.report(key, value);
}, one);
/**
 * Sherry username
 * 18 'age'
 * Beijing home
 */
```
#### 10.2.4 与其他数据结构的互相转换
+ `Map`转为数组
```javascript
let ken = new Map([
    ['username', 'Sherry'],
    ['age', 18],
    ['home', 'Beijing']
])
console.log([...ken]);
/***
 * [ [ 'username', 'Sherry' ],
 * [ 'age', 18 ],
 * [ 'home', 'Beijing' ] ]
 */
```
+ `Map`转为对象
如果所有 Map 的键都是字符串，它可以转为对象
```javascript
let ken = new Map([
    ['username', 'Sherry'],
    ['age', 18],
    ['home', 'Beijing']
])

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [key, value] of strMap) {
        obj[key] = value;
    }
    return obj;
}

console.log(strMapToObj(ken));
// { username: 'Sherry', age: 18, home: 'Beijing' }
```
+ 对象转为`Map`
```javascript
let ken = {username: 'Sherry', age: 18, home: 'Beijing'}

function objToStrMap(obj) {
    let strMap = new Map();
    for (let key of Object.keys(obj)) {
        strMap.set(key, obj[key]);
    }
    return strMap;
}

console.log(objToStrMap(ken));
// Map { 'username' => 'Sherry', 'age' => 18, 'home' => 'Beijing' }
```
+ `Map`转为`JSON`
`Map`转为`JSON`要区分两种情况。一种情况是，`Map`的键名都是字符串，这时可以选择转为对象`JSON`
```javascript
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [key, value] of strMap) {
        obj[key] = value;
    }
    return obj;
}

function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}

let ken = new Map([
    ['username', 'Sherry'],
    ['age', 18],
    ['home', 'Beijing']
]);
console.log(strMapToJson(ken));
// {"username":"Sherry","age":18,"home":"Beijing"}
```
`Map`的键名有非字符串，这时可以选择转为数组`JSON`
```javascript
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [key, value] of strMap) {
        obj[key] = value;
    }
    return obj;
}

function strMapToJson(strMap) {
    return JSON.stringify([...strMap]);
}

let ken = new Map([
    ['username', 'Sherry'],
    ['age', 18],
    ['home', 'Beijing']
]);
console.log(strMapToJson(ken));
// [["username","Sherry"],["age",18],["home","Beijing"]]
```
+ `JSON`转为`Map`
`JSON`转为`Map`，正常情况下，所有键名都是字符串
```javascript
function objToStrMap(obj) {
    let strMap = new Map();
    for (let key of Object.keys(obj)) {
        strMap.set(key, obj[key]);
    }
    return strMap;
}

function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
}

let ken = '{"username":"Sherry","age":18,"home":"Beijing"}';
console.log(jsonToStrMap(ken));
// Map { 'username' => 'Sherry', 'age' => 18, 'home' => 'Beijing' }
```
有一种特殊情况，整个`JSON`就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为`Map`。这往往是数组转为 JSON 的逆操作
```javascript
function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}

let ken = '[["username", "Mark"], [{"age": 18}, ["KEVEN"]]]';
console.log(jsonToMap(ken));
// Map { 'username' => 'Mark', { age: 18 } => [ 'KEVEN' ] }
```
#### 10.2.5 `WeakMap`
`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合
+ `WeakMap`只接受对象作为键名（null除外），不接受其他类型的值作为键名
+ `WeakMap`的键名所指向的对象，不计入垃圾回收机制
