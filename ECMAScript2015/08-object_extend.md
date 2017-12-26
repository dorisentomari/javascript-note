# 8. 对象的扩展
## 8.1 属性的简洁表达法
+ 属性的简洁表示法
ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁
```javascript
const one = 111;
const two = {one};
console.log(two);// { one: 111 }
console.log({one: 111});// { one: 111 }
```
ES6 允许在对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值
````javascript
function one(x, y) {
    return {x, y};
}

console.log(one(1, 5));// { x: 1, y: 5 }

function two(x, y) {
    return {x: x, y: y};
}

console.log(two(1, 5));// { x: 1, y: 5 }
````
+ 除了属性简写，方法也可以简写
```javascript
const one = {
    sayHi() {
        return 'how are you?'
    }
};

const two = {
    sayHi: function () {
        return 'how are you?'
    }
};
```
+ 属性的赋值器（setter）和取值器（getter）
```javascript
const cart = {
    _wheels: 4,
    get wheels() {
        return this._wheels;
    },
    set wheels(num) {
        if (num < this._wheels) {
            throw new Error('设置错误');
        } else {
            this._wheels = num;
        }
    }
};
```
+ 如果某个方法的值是一个 Generator 函数，前面需要加上星号
```javascript
const one = {
    * sayHi() {
        yield 'how are you?';
    }
};
```
## 8.2 属性名表达式
+ JavaScript 定义对象的属性，有两种方法
```javascript
let one = {};
one.name = 'Mark';// 直接用标识符作为属性名

let two = {};
two['user'] = 'Sherry'; // 用表达式作为属性名，这时要将表达式放在方括号之内
console.log(one, two);// { name: 'Mark' } { user: 'Sherry' }
```
+ 如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用方法一（标识符）定义属性
```javascript
let one = 111;
let two = {
    [num]: true,
    ['user']: 'Mark'
};
```
+ 表达式还可以用于定义方法名
```javascript
let obj = {
    ['say' + 'Hi']() {
        return 'how are you?'
    }
};
```
+ 属性名表达式与简洁表示法，不能同时使用，会报错
```javascript
const one = 'numberOne';
const numberOne = '11111';
const two = {[one]: numberOne};
console.log(two);//{ numberOne: '11111' }
```
+ 属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串`[object Object]`
```javascript
const one = {numberOne: 111};
const two = {numberTwo: 222};
const number = {
    [one]: 'number one one one',
    [two]: 'number two two two'
};
console.log(number); //{ '[object Object]': 'number two two two' }
```
`[one]`和`[two]`得到的都是`[object Object]`，所以`[two]`会把`[one]`覆盖掉，而`number`最后只有一个`[object Object]`属性
## 8.3 方法的`name`属性
+ 函数的`name`属性，返回函数名。对象方法也是函数，因此也有`name`属性
```javascript
const person = {
    sayHi() {
        console.log('how are you?');
    }
};
console.log(person.sayHi.name); // sayHi
```
如果对象的方法使用了取值函数`getter`和存值函数`setter`，则`name`属性不是在该方法上面，而是该方法的属性的描述对象的`get`和`set`属性上面，返回值是方法名前加上`get`和`set`
```javascript
const one = {
    get two() {
    },
    set two(num) {
    }
};

// console.log(one.two.name);// TypeError

const des = Object.getOwnPropertyDescriptor(one, 'two');
console.log(des.get.name); // get two
console.log(des.set.name); // set two
```
+ 有两种特殊情况
    * `bind`方法创造的函数，`name`属性返回`bound`加上原函数的名字；
    * `Function`构造函数创造的函数，`name`属性返回`anonymous`
```javascript
console.log((new Function()).name); // anonymous

let one = function(){};

console.log(one.bind().name); // bound one
```
+ 如果对象的方法是一个`Symbol`值，那么`name`属性返回的是这个 `Symbol`值的描述
```javascript
const one = Symbol('one');
const two = Symbol();
let obj = {
    [one]() {
    },
    [two]() {
    }
};

console.log(obj[one].name);// [one]
console.log(obj[two].name);// ''
```
## 8.4 `Object.is()`
> ES5 比较两个值是否相等，只有两个运算符：相等运算符`==`和严格相等运算符`===`。它们都有缺点，前者会自动转换数据类型，后者的`NaN`不等于自身，以及`+0`等于`-0`。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等

> ES6 提出`Same-value equality`(同值相等)算法，用来解决这个问题。`Object.is`就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符`===`的行为基本一致
```javascript
console.log(Object.is('one', 'one'));
console.log(Object.is({}, {}));
```
不同之处只有两个：一是`+0`不等于`-0`，二是`NaN`等于自身
```javascript
console.log(+0 === -0); // true
console.log(NaN === NaN); // false

console.log(Object.is(+0, -0)); // false
console.log(Object.is(NaN, NaN)); // true
```
+ ES5 可以通过下面的代码，部署`Object.iS`
```javascript
Object.defineProperty(Object, 'is', {
    value: function (x, y) {
        if (x === y) {
            // 针对+0不等于-0的情况
            return x !== 0 || 1 / x === 1 / y;
        }
        return x !== x && y !== y;
    },
    configurable: true,
    enumerable: true,
    writable: true
});
```
## 8.5 `Object.assign()`
+ `Object.assign`方法用于对象的合并，将源对象`source`的所有可枚举属性，复制到目标对象`target`
```javascript
const target = {one: 111};
const source1 = {two: 222};
const source2 = {three: 333};

const result = Object.assign(target, source1, source2);
console.log(result);// { one: 111, two: 222, three: 333 }
```
`Object.assign`方法的第一个参数是目标对象，后面的参数都是源对象
> 注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
```javascript
const target = {one: 111};
const source1 = {two: 222};
const source2 = {one: 333};

const result = Object.assign(target, source1, source2);
console.log(result);// { one: 333, two: 222 }
```
+ 如果只有一个参数，`Object.assign`会直接返回该参数
```javascript
const number = {one: 111};
console.log(Object.assign(number));
```
+ 如果该参数不是对象，则会先转成对象，然后返回
```javascript
const num = 1111;
console.log(Object.assign(num));
```
+ 由于`undefined`和`null`无法转成对象，所以如果它们作为参数，就会报错
```javascript
console.log(Object.assign(null));// TypeError:
console.log(Object.assign(undefined));// TypeError:
```
> 如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果`undefined`和`null`不在首参数，就不会报错
```javascript
let num = {one: 111};
let source = {ten: 10};
console.log(Object.assign(num, undefined, null, source)); // { one: 111, ten: 10 }
```
> 其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果，因为只有字符串的包装对象，会产生可枚举属性

```javascript
let num = 111;
let str = 'nice';
let boo = true;
let result = Object.assign({}, num, str, boo, {time: new Date()});
console.log(result);
/***
 * { '0': 'n',
 * '1': 'i',
 * '2': 'c',
 * '3': 'e',
 * time: 2017-12-24T07:42:36.833Z }
 */
```
```javascript
console.log(Object(10));// [Number: 10]
console.log(Object('nice'));// [String: 'nice']
console.log(Object(true));// [Boolean: true]
console.log(typeof Object(true));// object
```
> 布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性`[[PrimitiveValue]]`上面，这个属性是不会被`Object.assign`拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝

> `Object.assign`拷贝的属性是有限制的，只拷贝源对象的自身属性，不拷贝继承属性，也不拷贝不可枚举的属性`enumerable: false`

+ `Object.assign`要拷贝的对象只有一个不可枚举属性`invisible`，这个属性并没有被拷贝进去

+ 属性名为`Symbol`值的属性，也会被`Object.assign`拷贝
```javascript
console.log(Object.assign({one: 1111}, {[Symbol('one')]: 111}));// { one: 1111, [Symbol(one)]: 111 }
```
## 8.6 注意点
+ 浅拷贝
`Object.assign`方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用
```javascript
const num = {one: {a: 111}};
const result = Object.assign({}, num);
console.log(num.one.a);// 111
console.log(result.one.a);// 111
```
源对象`num`的`one`属性的值是一个对象，`Object.assign`拷贝得到的是这个对象的引用。这个对象的任何变化，都会反映到目标对象上面
+ 同名属性的替换
+ 数组的处理
`Object.assign`可以用来处理数组，但是会把数组视为对象
```javascript
const num = [1, 2, 3];
const source = [4, 5];
const result = Object.assign(num, source);
console.log(result); // [ 4, 5, 3 ]
```
`Object.assign`把数组视为属性名为 0、1、2 的对象，因此源数组的`0`号属性`4`覆盖了目标数组的`0`号属性
+ 取值函数的处理
`Object.assign`只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制
```javascript
const source = {
    get one() {
        return 1;
    }
};

const target = {};
const result = Object.assign(target, source);
console.log(result);// { one: 1 }
```
## 8.7 常见用途
+ 为对象添加属性
```javascript
class Point {
    constructor(x, y) {
        Object.assign(this, x, y);
    }
}
```
通过`Object.assign`方法，将`x`属性和`y`属性添加到`Point`类的对象实例
+ 为对象添加方法
```javascript
class Point {
    
}
Object.assign(Point.prototype, {
    sayHi(one, two){
        
    },
    sayHello(one, two){
        
    }
});
// 等同于下边的写法
Point.prototype.sayHi = function(one, two){   };

Point.prototype.sayHello = function(one, two){   };
```
+ 克隆对象
```javascript
function clone(origin) {
    return Object.assign({}, origin);
}
```
原始对象拷贝到一个空对象，就得到了原始对象的克隆，不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码
```javascript
function clone(origin) {
    let originPrototype = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originPrototype), origin);
}
```
+ 合并多个对象
将多个对象合并到某个对象
```javascript
const merge = (target, ...sources) => Object.assign(target, sources);
```
如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并
```javascript
const merge = (...sources) => Object.assigin({}, ...sources);
```
+ 为属性指定默认值
```javascript
const DEFAULT = {
    logLevel: 0,
    content: 'html page'
};

function processContent(options) {
    options = Object.assign({}, DEFAULT, options);
    console.log(options);
}

processContent({});// { logLevel: 0, content: 'html page' }
```
`DEFAULTS`对象是默认值，`options`对象是用户提供的参数。`Object.assign`方法将`DEFAULTS`和`options`合并成一个新对象，如果两者有同名属性，则`option`的属性值会覆盖`DEFAULTS`的属性值

注意，由于存在浅拷贝的问题，`DEFAULTS`对象和`options`对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则，`DEFAULTS`对象的该属性很可能不起作用
```javascript
const DEFAULT = {
    url: {
        host: 'localhost',
        port: 7777
    }
};

function processContent(options) {
    options = Object.assign({}, DEFAULT, options);
    console.log(options);
}

processContent({url: {port: 8888}});// { url: { port: 8888 } }
```
## 8.8 属性的可枚举性和遍历
+ 可枚举性
对象的每个属性都有一个描述对象`Descriptor`，用来控制该属性的行为。`Object.getOwnPropertyDescriptor`方法可以获取该属性的描述对象
```javascript
let num = {one: 111};
let result = Object.getOwnPropertyDescriptor(num, 'one');
console.log(result);
/***
 * { value: 111,
 * writable: true,
 * enumerable: true,
 * configurable: true }
 */
```
+ 目前，有四个操作会忽略`enumerable`为`false`的属性
    * `for...i`n循环：只遍历对象自身的和继承的可枚举的属性。
    * `Object.keys()`：返回对象自身的所有可枚举的属性的键名。
    * `JSON.stringify()`：只串行化对象自身的可枚举的属性。
    * `Object.assign()`： 忽略`enumerable`为`false`的属性，只拷贝对象自身的可枚举的属性。
```javascript
let resultToString = Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable;
console.log(resultToString); // false

let resultLength = Object.getOwnPropertyDescriptor([], 'length').enumerable;
console.log(resultLength); // false
```
`toString`和`length`属性的`enumerable`都是`false`，因此`for...in`不会遍历到这两个继承自原型的属性
+ ES6 规定，所有`Class`的原型的方法都是不可枚举的
```javascript
class Point {
    num() {
        return 1;
    }
}

let classPrototype = Object.getOwnPropertyDescriptor(Point.prototype, 'num').enumerable;
console.log(classPrototype); // false
```
操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用`for...in`循环，而用`Object.keys()`代替

## 8.9 属性的遍历
ES6 一共有 5 种方法可以遍历对象的属性。
+ `for...in`循环遍历对象自身和继承的可枚举属性(不包含`Symbol`属性)
+ `Object.keys(objs)`返回一个数组，包含对象自身的(不包含继承的)所有可枚举属性(不包含`Symbol`属性)的键名
+ `Object.getOwnPropertyNames(obj)`返回一个数组，包含对象自身的所有属性(包括不可枚举属性，不包含`Symbol`属性)的键名
+ `ObjectgetOwnPropertySymbols(objs)`返回一个数组，包含对象自身的所有`Symbol`属性的键名
+ `Reflect.ownKeys(objs)`返回一个数组，包含对象自身所有的键名，不管键名是`Symbol`或者是字符串，也不管是否可枚举
以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则
+ 首先遍历所有数值键，按照数值升序排列。
+ 其次遍历所有字符串键，按照加入时间升序排列。
+ 最后遍历所有`Symbol`键，按照加入时间升序排列。
```javascript
let result = Reflect.ownKeys({[Symbol()]: 0, b: 0, 10: 0, 2: 0, a: 0});
console.log(result); // [ '2', '10', 'b', 'a', Symbol() ]
```