# 6. 函数的扩展

## 6.1 函数参数的默认值
```javascript
function ken(name, age = 18) {
    console.log(`name:${name} age:${age}`);
}

ken('Mark', 16);// name:Mark age:16
ken('Mark');// name:Mark age:18
ken();// name:undefined age:18
```
> ES6 的写法还有两个好处:首先,阅读代码的人,可以立刻意识到哪些参数是可以省略的,不用查看函数体或文档;其次,有利于将来的代码优化,即使未来的版本在对外接口中,彻底拿掉这个参数,也不会导致以前的代码无法运行
> 参数变量是默认声明的,所以不能用let或const再次声明
> 有默认值的情况下,不能使用同名参数
> 参数默认值是惰性求值的,如果默认值是一个表达式,那么该参数的值就是表达式,而不是该表达式当前的结果

## 6.2 与解构赋值默认值结合使用
```javascript
function one({x, y = 10}) {
    console.log(x, y);
}

one({});// undefined 10
one({x: 1});// 1 10
one({x: 1, y: 4});// 1 4
one();// TypeError
```
> 只使用了对象的解构赋值默认值,没有使用函数参数的默认值.只有当函数`one`的参数是一个对象时,变量`x`和`y`才会通过解构赋值生成.如果函数`one`调用时没提供参数,变量`x`和`y`就不会生成,从而报错.通过提供函数参数的默认值,就可以避免这种情况
```javascript
function one({x, y = 10} = {}) {
    console.log(x, y);
}

one({});// undefined 10
one({x: 1});// 1 10
one({x: 1, y: 4});// 1 4
one();// undefined 10
```
+ 一个解构赋值的例子
```javascript
function fetch(url, {user = '', age = 18, info = {}}) {
    console.log(age);
}

fetch('http://www.baidu.com', {});// 18
fetch('http://www.baidu.com');// TypeError
```
> 如果函数`fetch`的第二个参数是一个对象,就可以为它的三个属性设置默认值.这种写法不能省略第二个参数,如果结合函数参数的默认值,就可以省略第二个参数.这时,就出现了双重默认值
```javascript
function fetch(url, {user = '', age = 18, info = {}} = {}) {
    console.log(age);
}

fetch('http://www.baidu.com');// 18
```
> 函数`fetch`没有第二个参数时,函数参数的默认值就会生效,然后才是解构赋值的默认值生效,变量`age`才会取到默认值`18`
```javascript
function one({x = 0, y = 0} = {}) {
    console.log([x, y]);
}

function two({x, y} = {x: 1, y: 2}) {
    console.log([x, y]);
}

one(); //  [ 0, 0 ]
two(); //  [ 1, 2 ]

one({}); //  [ 0, 0 ]
two({}); //  [ undefined, undefined ]

one({x: 3}); //  [ 3, 0 ]
two({x: 3}); //  [ 3, undefined ]

one({x: 3, y: 5}); //  [ 3, 5 ]
two({x: 3, y: 5}); //  [ 3, 5 ]

one({z: 5}); //  [ 0, 0 ]
two({z: 5}); //  [ undefined, undefined ]
```
## 6.3 参数默认值的位置
> 通常情况下,定义了默认值的参数,应该是函数的尾参数.因为这样比较容易看出来,到底省略了哪些参数.如果非尾部的参数设置默认值,实际上这个参数是没法省略的
```javascript
function one(x = 1, y) {
    console.log([x, y]);
}

one(); // [ 1, undefined ]
one(3); // [ 3, undefined ]
one(3, 4); // [ 3, 4 ]
one(undefined, 4); // [ 1, 4 ]
//one(, 4);// SyntaxError
```
## 6.4 函数的`length`属性
> 指定了默认值之后,函数的`length`属性将返回没有指定默认值的参数个数,也就是说,指定了默认值,`length`属性将失真
```javascript
console.log((function (key) {
}).length); // 1
console.log((function (key, val) {
}).length); // 2
console.log((function (key = 'name', val) {
}).length); // 0
console.log((function (key, val = 'Mark') {
}).length); // 1
console.log((function (key = 'name', val = 'Mark') {
}).length); // 0
```
> `length`属性的含义是,该函数预期传入的参数个数.某个参数指定默认值以后,预期传入的参数个数就不包括这个参数了.`rest` 参数也不会计入`length`属性
> 如果设置了默认值的参数不是尾参数,那么`length`属性也不再计入后面的参数了

## 6.5 作用域
> 一旦设置了参数的默认值,函数进行声明初始化时,参数会形成一个单独的作用域`context`.等到初始化结束,这个作用域就会消失.这种语法行为,在不设置参数默认值时,是不会出现的
```javascript
let x = 1;

function one(x, y = x) {
    console.log('x:', x, 'y:', y);
}
one();// x: undefined y: undefinedd
one(2);// x: 2 y: 2
```
> 参数`y`的默认值等于变量`x`.调用函数`one`时,参数形成一个单独的作用域.在这个作用域里面,默认值变量`x`指向第一个参数x,而不是全局变量`x`,所以输出是2
```javascript
let x = 1;

function one(y = x) {
    let x = 2;
    console.log('x:', x, 'y:', y);
}

one();// x: 2 y: 1
one(2);// x: 2 y: 2
```
> 函数`one`调用时,参数`y = x`形成一个单独的作用域.这个作用域里面,变量`x`本身没有定义,所以指向外层的全局变量`x`.函数调用时,函数体内部的局部变量`x`影响不到默认值变量`x`
```javascript
let one = 'one function';

function two(ken = () => one) {
    let one = 'one arguments';
    console.log(ken());
}

two();// one function
```
```javascript
var x = 1;

function one(x, y = () => {
    x = 2
}) {
    var x = 3;
    y();
    console.log(x);// 3
    console.log(y());// undefined
}

one();
```
## 6.6 应用
+ 利用参数默认值,可以指定某一个参数不得省略,如果省略就抛出一个错误
+ 将参数默认值设为`undefined`,表明这个参数是可以省略的

## 6.7 `rest`参数
> `rest`参数,形式为`...变量名`,用于获取函数的多余参数,这样就不需要使用`arguments`对象了.`rest`参数搭配的变量是一个数组,该变量将多余的参数放入数组中
```javascript
function one(...values) {
    let sum = 0;
    for (let value of values) {
        sum += value;
    }
    return sum;
}

console.log(one(2,5,8,9,6,3)); // 33
console.log(one[2,5,8,9,6,3]); // undefined
```
+ `rest`参数代替`arguments`变量的例子
```javascript
function ES5SortNumbers() {
    return Array.prototype.slice.call(arguments).sort();
}
console.log(ES5SortNumbers(8,5,2,1,4,7)); // [ 1, 2, 4, 5, 7, 8 ]

const sortNumbers = (...numbers) => numbers.sort();
console.log(sortNumbers(2,5,9,6,3)); // [ 2, 3, 5, 6, 9 ]
```
> `arguments`对象不是数组,而是一个类似数组的对象。所以为了使用数组的方法,必须使用`Array.prototype.slice.call`先将其转为数组。`rest`参数就不存在这个问题,它就是一个真正的数组,数组特有的方法都可以使用。
```javascript
function one(array, ...values) {
    values.forEach(value => {
        array.push(value);
        console.log(value);
    })
}

console.log(one([], 8,5,6,2));

/****
 * 8
 * 5
 * 6
 * 2
 * undefined
 */
```
+ `rest`参数之后不允许再有其他的参数,也就是说(`rest`只能是最后一个参数),否则会报错
+ 函数`length`属性不包括`rest`参数

## 6.8 严格模式
> ES6规定只要函数参数使用了默认值,解构赋值,或者扩展运算符,那么函数内部就不能显式设定为严格模式,否则会报错

> 函数内部的严格模式,同时适用于函数体和函数参数。但是,函数执行的时候,先执行函数参数,然后再执行函数体。这样就有一个不合理的地方,只有从函数体之中,才能知道参数是否应该以严格模式执行,但是参数却应该先于函数体执行

> 两种方法可以规避这种限制。
+ 第一种是设定全局性的严格模式,这是合法的
```javascript
'use strict';
function one(a, b= a){  }
```
+ 第二种是把函数包在一个无参数的立即执行函数里面
```javascript
const one = (function () {
    'use strict';
    return function (value = 1) {
        return value
    }
});
```
## 6.9 `name`属性
函数的`name`属性,返回该函数的函数名
```javascript
function one(){   }
console.log(one.name); //one
```
+ ES6对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量,ES5 的`name`属性,会返回空字符串,而ES6的`name`属性会返回实际的函数名
```javascript
let one = function(){  };
// ES5
console.log(one.name); // ''

// ES6
console.log(one.name); //one
```
+ 如果将一个具名函数赋值给一个变量,则ES5和ES6的`name`属性都返回这个具名函数原本的名字
```javascript
const one = function two(){   }

console.log(one.name); // one
console.log(two.name); // ReferenceError: two is not defined
```
+ `Function`构造函数返回的函数实例,`name`属性的值为`anonymous`
```javascript
(new Function).name; // anonymous
```
+ `bind`返回的函数,`name`属性值会加上`bound`前缀

```javascript
function one() {
}

console.log(one.bind({}).name);// bound one
console.log((function () {
}).bind({}).name);// bound
```
## 6.10 箭头函数
```javascript
let one = arg => arg * arg;
console.log(one(10)); // 100

//等同于
let one = function(arg){
    return arg * arg;
}
console.log(one(10)); // 100 
```
+ 如果箭头函数不需要参数或需要多个参数,就使用一个圆括号代表参数部分
```javascript
let one = () => 5;
//等同于
let one = function(){
    return 5;
}

let sum = (num1, num2) => num1 + num2;
//等同于
let sum = function (num1, num2) {
    return num1 + num2;
}
```
+ 如果箭头函数的代码块部分多于一条语句,就要使用大括号将它们括起来,并且使用`return`语句返回
```javascript
let sum = (num1, num2) => {
    return num1 + num2
};
```
+ 由于大括号被解释为代码块,所以如果箭头函数直接返回一个对象,必须在对象外面加上括号,否则会报错
```javascript
let one = id=>{id:id, name:'Mark'}// 报错

let one = id => ({id: id, name: 'Mark'});// 正确使用
```
+ 如果箭头函数只有一行语句,且不需要返回值,可以采用下面的写法,就不用写大括号了
```javascript
let one = value => void value *value;// 不需要返回值
```
+ 箭头函数可以与变量解构结合使用
```javascript
const oen = ({firstName, lastName}) => firstName + ' ' + lastName;

let person = {
    firstName: 'Mark',
    lastName: 'Jin'
};

function one(person) {
    return person.firstName + ' ' + person.lastName;
}
```
+ 箭头函数使得表达式更加简洁
```javascript
const num = n => n % 2 === 0;
const square = n => n * n;
```
+ 箭头函数的一个用处是简化回调函数
```javascript
let arr = [3, 2, 4, 6, 3];
console.log(arr.map(val => val * val)); // [ 9, 4, 16, 36, 9 ]

arr.sort((a, b) => a-b);
console.log(arr.sort((a, b) => a-b)); // [ 2, 3, 3, 4, 6 ]
```
+  `rest`参数与箭头函数结合
````javascript
const numbers = (...nums) => nums;
console.log(numbers(2, 5, 6, 3, 1, 4));// [ 2, 5, 6, 3, 1, 4 ]

const one = (head, middle, ...tail) => [head, '--', middle, '--', tail];
console.log(one(1, 5, 6, 9, 3));// [ 1, '--', 5, '--', [ 6, 9, 3 ] ]
````
## 6.11 箭头函数使用注意
+ 函数体内的`this`对象,就是定义时所在的对象(相当于`this`指向固定),而不是使用时所在的对象
+ 不可以当做构造函数使用,不可以使用`new`操作符命令,否则会抛出错误
+ 不可使用`arguments`对象,该对象在函数体内不存在,如果要用,可以使用`rest`参数代替
+ 不可以使用`yield`命令,因此箭头函数不能用作`Generator`函数
```javascript
function one() {
    setTimeout(() => {
        console.log('id:', this.id); // id: 42
    }, 1000);
}

let id = 10;
one.call({id: 42});
```
> 箭头函数可以让`setTimeout`里面的`this`,绑定定义时所在的作用域,而不是指向运行时所在的作用域
```javascript
function Timer() {
    this.num1 = 0;
    this.num2 = 0;
    setInterval(() => {
        this.num1++
    }, 100);

    setInterval(function () {
        this.num2++;
    }, 100);
}

let timer = new Timer();
setTimeout(() => {
    console.log('num1:', timer.num1)
}, 3100);

setTimeout(() => {
    console.log('num2:', timer.num2)
}, 3000);
// num2: 0
// num1: 30
```
+ 箭头函数可以让`this`指向固定化,这种特性很有利于封装回调函数
```javascript
let handler = {
    id: 1234,
    init: function () {
        document.addEventListener('click', event => this.say(event.type), false)// 此时this指向document对象
    },
    say: function (type) {
        console.log('handling' + type + 'for' + this.id);
    }
};
```
> `this`指向的固定化,并不是因为箭头函数内部有绑定`this`的机制,实际原因是箭头函数根本没有自己的`this`,导致内部的`this`就是外层代码块的`this`。正是因为它没有`this`,所以也就不能用作构造函数
```javascript
function one() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100)
}

function two() {
    var _this = this;
    setTimeout(function () {
        console.log('id:', _this.id);
    }, 100)
}
```
> 除了`this`,以下三个变量在箭头函数之中也是不存在的,指向外层函数的对应变量：`arguments`、`super`、`new.target`
+ 由于箭头函数没有自己的`this`,所以当然也就不能用`call()`、`apply()`、`bind()`这些方法去改变`this`的指向

**2017/12/23 暂停**
## 6.12 尾调用

## 6.13 递归函数的优化

## 6.14 尾调用优化的实现