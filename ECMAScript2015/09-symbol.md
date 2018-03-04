# `Symbol`
## 1. `Symbol`概述
### 1.1 引入`Symbol`类型
+ ES5的对象属性名都是字符串，这容易造成属性名的冲突。
> 比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法`mixin`模式，新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是ES6引入`Symbol`的原因

+ ES6引入了一种新的原始数据类型`Symbol`，表示独一无二的值。它是`JavaScript`语言的第七种数据类型，前六种是：`undefined`、`null`、`Boolean`、`String`、`Number`、`Object`
+ `Symbol`值通过`Symbol`函数生成
+ 对象的属性名现在可以有两种类型
    * 一种是原来就有的字符串
    * 另一种就是新增的`Symbol`类型。凡是属性名属于`Symbol`类型，就都是独一无二的，可以保证不会与其他属性名产生冲突
```javascript
let sen = Symbol();
console.log(typeof sen); // symbol
```
+ 注意
    * `Symbol`函数前不能使用`new`命令，否则会报错。这是因为生成的`Symbol`是一个原始类型的值，不是对象。
    * 也就是说，由于`Symbol`值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型
### 1.2 `Symbol`的基本使用
+ `Symbol`函数可以接受一个字符串作为参数，表示对`Symbol`实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分
```javascript
let sen = Symbol('sen');
let ken = Symbol('ken');
console.log(sen); // Symbol(sen)
console.log(ken); // Symbol(ken)
console.log(sen.toString()); // Symbol(sen)
console.log(ken.toString()); // Symbol(ken)
```
+ 如果不加参数，它们在控制台的输出都是`Symbol()`，不利于区分。有了参数以后，就等于为它们加上了描述，输出的时候就能够分清，到底是哪一个值
### 1.3 `Symbol`参数是对象
+ 如果`Symbol`的参数是一个对象，就会调用该对象的`toString`方法，将其转为字符串，然后才生成一个`Symbol`值
```javascript
const num = {
    one() {
        return 'one string';
    }
}
const person = {
    name: 'Mark'
}
const ball = {
    toString() {
        return 'ball string'
    }
}
let sen = Symbol(num);
let ken = Symbol(person);
let gen = Symbol(ball);
console.log(sen); // Symbol([object Object])
console.log(ken); // Symbol([object Object])
console.log(gen); // Symbol(ball string)
```
+ `Symbol`函数的参数只是表示对当前`Symbol`值的描述，因此相同参数的`Symbol`函数的返回值是不相等的
### 1.4 `Symbol`值不能与其他类型的值进行运算
```javascript
let sen = Symbol('sen symbol flags');
console.log('sen' + sen);// TypeError: Cannot convert a Symbol value to a string
```
+ `Symbol`值可以显式转为字符串，布尔值，但是不可以转为数值
```javascript
let sen = Symbol('sen symbol flags');
console.log(String(sen)); // Symbol(sen symbol flags)
console.log(sen.toString()); // Symbol(sen symbol flags)

let gen = Symbol();
console.log(Boolean(gen)); // true
console.log(Number(gen)); //TypeError Cannot convert a Symbol value to a number
```
## 2. 作为属性名的`Symbol`
+ 由于每一个`Symbol`值都是不相等的，这意味着`Symbol`值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖
```javascript
let ken = Symbol();
let one = {};
one[ken] = 111;
console.log(one); // {Symbol(): 111}
console.log(one[ken]); // 111

let two = {
    [ken]: 222
};
console.log(two); // {Symbol(): 222}
console.log(two[ken]); // 222

let three = {};
Object.defineProperty(three, ken, {value: 333});

console.log(three); // {}
console.log(three[ken]); // 333
```
通过方括号结构和`Object.defineProperty`，将对象的属性名指定为一个`Symbol`值
+ `Symbol`值作为对象属性名时，不能用点运算符
```javascript
const sen = Symbol();
const gen = {};
gen.sen = 'sen symbol';
console.log(gen.sen); // sen symbol
console.log(gen[sen]); // undefined
console.log(gen['sen']); // sen symbol
```
+ 在对象的内部，使用`Symbol`值定义属性时，`Symbol`值必须放在方括号之中
```javascript
const sen = Symbol();

let gen = {
    [sen](num) {
        return num * num;
    }
}
console.log(gen[sen](5)); // 25
```
如果`sen`不放在方括号中，该属性的键名就是字符串`sen`，而不是`sen`所代表的那个`Symbol`值
+ `Symbol`类型还可以用于定义一组常量，保证这组常量的值都是不相等的
```javascript
let log = {};
log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn'),
}
console.log(log.levels.DEBUG, 'debug message'); // Symbol(debug) 'debug message'
console.log(log.levels.INFO, 'info message'); // Symbol(info) 'info message'
console.log(log.levels.WARN, 'warn message'); // Symbol(warn) 'warn message'
```
```javascript
const COLOR_RED = Symbol('red line');
const COLOR_GREEN = Symbol('green line');

function getColor(color) {
    switch (color) {
        case COLOR_RED:
            return COLOR_GEREN;
        case COLOR_GREEN:
            return COLOR_RED;
        default:
            throw new Error('undefined color');
    }
}
console.log(getColor(COLOR_RED)); // Symbol(green line)
console.log(getColor(COLOR_GREEN)); // Symbol(red line)
```
常量使用`Symbol`值最大的好处，就是其他任何值都不可能有相同的值了，因此可以保证上面的`switch`语句会按设计的方式工作
**`Symbol`值作为属性名时，该属性还是公开属性，不是私有属性。**
## 3. 消除魔术字符串
+ 魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。
+ 风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替
+ 魔术字符串
```javascript
function getArea(shape, options) {
    let area = 0;
    switch (shape) {
        case 'Triangle':
            area = .5 * options.width * options.height;
            break;
    }
    return area;
}

console.log(getArea('Triangle', {width: 10, height: 10})); // 50
```
字符串`Triangle`就是一个魔术字符串。它多次出现，与代码形成`强耦合`，不利于将来的修改和维护
+ 常用的消除魔术字符串的方法，就是把它写成一个变量
```javascript
const shapeType = {
    triangle: 'Triangle'
}

function getArea(shape, options) {
    let area = 0;
    switch (shape) {
        case shapeType.triangle:
            area = .5 * options.width * options.height;
            break;
    }
    return area;
}

console.log(getArea(shapeType.triangle, {width: 10, height: 10})); // 50
```
+ 我们把`Triangle`写成`shapeType`对象的`triangle`属性，这样就消除了强耦合

+ `shapeType.triangle`等于哪个值并不重要，只要确保不会跟其他`shapeType`属性的值冲突即可。因此，这里就很适合改用`Symbol`值
```javascript
const shapeType = {
    triangle: Symbol()
}
```
## 4. 属性名的遍历 
+ `Symbol`作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols`方法，可以获取指定对象的所有`Symbol`属性名
+ `Object.getOwnPropertySymbols`方法返回一个数组，成员是当前对象的所有用作属性名的`Symbol`值。
```javascript
const obj = {};
let one = Symbol('111');
let two = Symbol('222');
obj[one] = 'this is obj one property';
obj[two] = 'this is obj two property';
const objSymbol = Object.getOwnPropertySymbols(obj);
console.log(objSymbol); // [ Symbol(111), Symbol(222) ]
```
+ `Object.getOwnPropertySymbols`方法与`for...in`循环、`Object.getOwnPropertyNames`方法进行对
```javascript
const obj = {};
let one = Symbol('111');
Object.defineProperty(obj, one, {
    value: 'this is obj one property'
})

for (let i in obj) {
    console.log(i); // 无输出
}

let resultName = Object.getOwnPropertyNames(obj);
console.log(resultName); // []

let resultSymbol = Object.getOwnPropertySymbols(obj);
console.log(resultSymbol); // [ Symbol(111) ]
```
使用`Object.getOwnPropertyNames`方法得不到`Symbol`属性名，需要使用`Object.getOwnPropertySymbols`方法
+ `Reflect.ownKeys`方法可以返回所有类型的键名，包括常规键名和 Symbol 键名
```javascript
let obj = {
    [Symbol('val')]: 111,
    enum: 2,
    nonEnum: 3
}

let result = Reflect.ownKeys(obj);
console.log(result); // [ 'enum', 'nonEnum', Symbol(val) ]
```
+ 由于以`Symbol`值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。
```javascript
let size = Symbol('size');

class Collection {
    constructor() {
        this[size] = 0;
    }
    
    add(item) {
        this[this[size]] = item;
        this[size]++;
    }
    
    static sizeOf(instance) {
        return instance[size];
    }
}

let x = new Collection();
console.log(Collection.sizeOf(x)); // 0

x.add('foooooo');
console.log(Collection.sizeOf(x)); // 1

console.log(Object.keys(x)); // [ '0' ]
console.log(Object.getOwnPropertyNames(x)); // [ '0' ]
console.log(Object.getOwnPropertySymbols(x)); // [ Symbol(size) ]
```
+ 对象`x`的`size`属性是一个`Symbol`值，所以`Object.keys(x)`、`Object.getOwnPropertyNames(x)`都无法获取它。这就造成了一种非私有的内部方法的效果
## 5. `Symbol.for()`，`Symbol.keyFor()`
有时，我们希望重新使用同一个`Symbol`值，`Symbol.for`方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的`Symbol`值。如果有，就返回这个`Symbol`值，否则就新建并返回一个以该字符串为名称的`Symbol`值
```javascript
let sen = Symbol.for('symbol flags');
let ken = Symbol.for('symbol flags');
console.log(sen === ken); // true
```
`sen`和`ken`都是`Symbol`值，但是它们都是同样参数的`Symbol.for`方法生成的，所以实际上是同一个值
`Symbol.for()`与`Symbol()`这两种写法，都会生成新的 `Symbol`。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。`Symbol.for()不`会每次调用就返回一个新的`Symbol`类型的值，而是会先检查给定的`key`是否已经存在，如果不存在才会新建一个值
```javascript
console.log(Symbol.for('symbol flags') === Symbol.for('symbol flags')); // true
console.log(Symbol('symbol flags') === Symbol('symbol flags')); // false
```
+ 由于`Symbol()`写法没有登记机制，所以每次调用都会返回一个不同的值
+ `Symbol.keyFor`方法返回一个已登记的`Symbol`类型值的`key`
```javascript
let sen = Symbol.for('symbol flags');
console.log(Symbol.keyFor(sen)); // symbol flags

let ken = Symbol('symbol flags');
console.log(Symbol.keyFor(ken)); // undefined
```
变量`ken`属于未登记的`Symbol`值，所以返回`undefined`
+ `Symbol.for`为`Symbol`值登记的名字，是全局环境的，可以在不同的`iframe`或`service worker `中取到同一个值
```javascript
let iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);
console.log(iframe.contentWindow.Symbol.for('one') === Symbol.for('one'));
```
`iframe`窗口生成的`Symbol`值，可以在主页面得到