# [关于JavaScript的44个问题](http://javascript-puzzlers.herokuapp.com/?tdsourcetag=s_pctim_aiomsg)

## 1. `['1', '2', '3'].map(parseInt)`

+ 结果: `[1, NaN, NaN]`
+ [`map`方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
  + 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
  + 会把数组`arr`进行遍历，`map`的三个参数分别是`item`某一个元素的值，`index`某个元素在`arr`里的索引，`array`是整个数组`arr`
+ [`parseInt方法`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
  + `parseInt`函数解析一个字符串参数，并返回一个指定基数的整数 (数学系统的基础)
  + `parseInt(string, radix)`接收两个参数
  + `string`指的是被解析的值，如果参数不是一个字符串，那么将其转换为字符串，字符串开头的空白符会被忽略
  + `radix`指的是`string`的基数，介于2-36之间，该参数默认为10。
  + 这个方法实际上就是把`string`这个参数，转为`radix`进制
+ 解析:
  + 如果`string`参数不能转为数字，那么将返回`NaN`
  + 如果`radix`为0，那么将返回`string`自身
  + 如果`radix`为1，那么将返回`NaN`
  + 如果`radix`为2，那么`string`的范围将是`string >= -20 and -9 <= string <= -2 and 2 <= string <= 9 and string >=20`，那么将返回`NaN`

+ 理想状况下是这样
这种情况下，默认的`radix`就是`10`，所以可以直接返回`[1, 2, 3]`

```javascript
let arr = ['1', '2', '3'];
arr.map((item, index, array) => {
  return parseInt(item);
});
```

+ 实际情况是这样的
这种情况下，实际上是把`index`作为`parseInt`的第二个参数传入，根据上边的解析的结果，可以得出结果就是`[1, NaN, NaN]`
```javascript
let arr = ['1', '2', '3'];
arr.map((item, index, array) => {
  return parseInt(item, index);
});
```

## 2. `[typeof null, null instanceof Object]`
+ 结果: `['object', false]`
+ [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)
  + 值`null`特指对象的值未设置。它是 JavaScript 基本类型之一。
  + `null`不是一个空引用，而是一个原始值
  + `typeof null`结果是`object`，这是 JavaScript 自身的一个bug
+ [`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
  + `instanceof`运算符用于测试构造函数的`prototype`属性是否出现在对象的原型链中的任何位置
  + 实际上就是为了检测一个对象是否是某种类型
  + 本质上`null`和`Object`不是一个数据类型，`null`值并不是以`Object`为原型创建出来的

+ 解析:
  + `typeof null`得到的结果是`object`
  + `null instanceof Object`得到的结果是`false`

#### 2.1 [延伸`instanceof`](https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/index.html)

```javascript
const name = new String('mark');
console.log(name instanceof String); // true
console.log('mark' instanceof String); // false

const age = new Number(18);
console.log(age instanceof Number); // true
console.log(18 instanceof Number); // false

function Foo () {};
let foo = new Foo();
console.log(foo instanceof Foo); // true

console.log(Object instanceof Object);      // true
console.log(Function instanceof Function);  // true
console.log(Object instanceof Function);    // true
console.log(Function instanceof Object);    // true
console.log(Number instanceof Number);      // false
console.log(String instanceof String);      // false
```
+ 问题: 为什么`Object`和`Function`的`instanceof`自己结果为`true`，而`String`和`Number`的`instanceof`自己结果为`false`？

> 在 JavaScript 原型继承结构里面，规范中用 ``[[Prototype]]`` 表示对象隐式的原型，在 JavaScript 中用 `__proto__` 表示，并且在 Firefox 和 Chrome 浏览器中是可以访问得到这个属性的，但是 IE 下不行。所有 JavaScript 对象都有 `__proto__` 属性，但只有 `Object.prototype.__proto__` 为 null，前提是没有在 Firefox 或者 Chrome 下修改过这个属性。这个属性指向它的原型对象。 至于显示的原型，在 JavaScript 里用 `prototype` 属性表示，这个是 JavaScript 原型继承的基础知识，在这里就不在叙述了。

+ 解答:
  + `Object.prototype`是所有对象的根源
  + `Object.prototype`只是挂载在`Object`函数对象上
  + `Function.prototype`构造自`Object.prototype`
  + `Function.prototype`挂载在`Function`函数对象上
  + `Object`函数和`Function`函数构造自`Function.prototype`
  + `Object`字面量对象`{}`构造自`Object.prototype`
  + `Object`字面量对象`{}.__proto__ === Object.prototype`
  + `Function`函数和自定义函数都继承自`Function.prototype`
  + `Function.prototype`和`Function.__proto__`(原构造对象)相同
  + 所以，是先有的`Object.prototype`，再有`Function.prototype`，再有的`Function`和`Object`函数对象  

## 3. `[[3, 2, 1].reduce(Math.pow), [].reduce(Math.pow)]`

+ 结果: `TypeError: Reduce of empty array with no initial value`
+ [`reduce`方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
  + `reduce()` 方法对累计器和数组中的每个元素（从左到右）应用一个函数，将其简化为单个值。
  + `reduce(accumulator, currentValue, currentIndex, sourceArray)`函数接收4个参数
    + `accumulator`为累加器
    + `currentValue`为当前值
    + `currentIndex`为当前值的索引
    + `sourceArray`为源数组
    + 语法`arr.reduce(callback, [initialValue])`，如果没有提供`initialValue`，那么将使用数组中的第一个元素，在没有初始值的空数组上调用`reduce`将会报错
+ 解析:
  + `[3, 2, 1].reduce(Math.pow)`中，没有`initialValue`，那么第一个参数`3`就是初始值，调用的函数`Math.pow`就是对`3`进行`2`次方运算。
  + `[].reduce(Math.pow)`中，没有`initialValue`，也没有任何参数，所以会报错

#### 3.1 关于reduce的延伸
+ 1. 把二维数组转化为一维数组

```javascript
let arr = [[0, 1], [2, 3], [4, 5], [6, 7]];
let res = arr.reduce((a, b) => {
  return a.concat(b);
}, []);
```

+ 2. 计算数组中每个元素出现的次数

```javascript
let citis = ['beijing', 'shanghai', 'hongkong', 'beijing', 'hongkong', 'beijing'];
let countedCities = citis.reduce((allCities, city) => {
  if (city in allCities) {
    allCities[city]++;
  } else {
    allCities[city] = 1;
  }
  return allCities;
}, {});
```

+ 3. 按照属性对元素进行分类

```javascript
let user = [
  {name: 'mark', age: 18},
  {name: 'sherry', age: 18},
  {name: 'jack', age: 20},
];

function groupBy(arr, key) {
  return arr.reduce((acc, obj) => {
    let value = obj[key];
    if (!acc[value]) {
      acc[value] = [];
    }
    acc[value].push(obj);
    return acc;
  }, {});
}

let res = groupBy(user, 'age');
```

+ 4. 使用扩展运算符和`initialValue`绑定包含在对象数组中的数组
就是一个数组里，里边的元素都是对象，对象里有一个属性，值是数组，要求把这个对象里的这个属性的值，全部都打散，放在一个数组中。

```javascript
let languages = [
  {
    country: 'China',
    languages: ['Chinese', 'Cantonese', 'Minnan dialect']
  },
  {
    country: 'American',
    languages: ['English', 'Mexican']
  },
  {
    country: 'France',
    languages: ['Franch', 'Spanish']
  }
];

let allLanguages = languages.reduce((acc, current) => {
  return [...acc, ...current.languages];
}, ['Alphabet']);
```

+ 数组去重

```javascript
let arr = [0, 1, 2, 3, 4, 3, 4, 5, 2, 1, 5];
arr = arr.sort();
let res = arr.reduce((acc, current) => {
  if (acc.length === 0 || acc[acc.length -1] !== current) {
    acc.push(current);
  }
  return acc;
}, []);

```

+ 按顺序运行`Promise`

```javascript
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a + 1);
  });
}

function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

function p3(a) {
  return a + 3;
}

function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

function runPromise(arr, value) {
  return arr.reduce((promiseChain, currentFunction) => {
    return promiseChain.then(currentFunction)
  }, Promise.resolve(value));
}

const promiseArray = [p1, p2, p3, p4];

runPromise(promiseArray, 10).then(res => console.log(res));
```

+ 功能型函数管道

```javascript
const double = x => x + x;
const triple = x => x * 3;
const quadruple = x => x * 4;

const pipe = (...functions) => value => functions.reduce((acc, fn) => fn(acc), value);

const mutiply6 = pipe(double, triple, quadruple);
const mutiply9 = pipe(double, triple, quadruple);

console.log(mutiply6(6));
console.log(mutiply6(9));
```





















++
