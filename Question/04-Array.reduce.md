## [[3, 2, 1].reduce(Math.pow), [].reduce(Math.pow)]

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
