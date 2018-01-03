# 1. let
+ 类似于`var`,所声明的变量,只在`let`命令所在的代码块内部有效
+ 不存在变量提升,`let`所声明的变量一定要在声明后使用,否则报错
+ 在代码块内,使用let命令声明变量之前,该变量都是不可用的.这在语法上,称为“暂时性死区`temporal dead zone`,简称`TDZ`
> ES6明确规定,如果区块中存在let和const命令,这个区块对这些命令声明的变量,从一开始就形成了封闭作用域.凡是在声明之前就使用这些变量,就会报错.
> `暂时性死区`也意味着`typeof`不再是一个百分之百安全的操作
```javascript
/** 隐蔽的死区 */
function bar(x = y, y = 2) {
    return [x, y];
}

console.log(bar());
// ReferenceError: y is not defined
// 原因是参数x的默认值是y,而此时y还没有声明,属于死区

/** 修改之后 */
function bar(x = 2, y = x) {
    return [x, y];
}

console.log(bar());
// [ 2, 2 ]
```
> 暂时性死区的本质就是,只要一进入当前作用域,所要使用的变量就已经存在了,但是不可获取,只有等到声明变量的那一行代码出现,才可以获取和使用该变量.
+ `let`不允许在相同作用域内重复声明同一个变量

# 块级作用域
+ `let`实际上为JavaScript新增了块级作用域
+ ES6 允许块级作用域的任意嵌套,外层作用域无法读取内层作用域的变量,内层作用域可以定义外层作用域的同名变量
+ 块级作用域的出现,实际上使得获得广泛应用的立即执行函数表达式`IIFE`不再必要了
```javascript
// IIFE 写法
(function(){
    console.log('IIFE Function');
})();
```

# `const`命令
+ `const`声明一个只读的常量,一旦声明,常量的值就不能改变
+ `const`一旦声明变量,就必须立即初始化,不能留到以后赋值
+ 本质
> `const`实际上保证的,并不是变量的值不得改动,而是变量指向的那个内存地址不得改动.对于简单类型的数据（数值、字符串、布尔值）,值就保存在变量指向的那个内存地址,因此等同于常量.但对于复合类型的数据(主要是对象和数组),变量指向的内存地址,保存的只是一个指针,const只能保证这个指针是固定的,至于它指向的数据结构是不是可变的,就完全不能控制了.因此,将一个对象声明为常量必须非常小心.
+ 将对象冻结,使用`Object.freeze()`方法
```javascript
const foo = Object.freeze({name: 'Make', age: 18});

//常规模式下,下边一行不起作用;
//严格模式下,下边一行会报错;
foo.color = 'red';
```
+ 除了将对象本身冻结,对象的属性也应该冻结.
```javascript
/** 下面是一个将对象彻底冻结的函数 */
let constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach((key, value) => {
        if (typeof obj[key] === 'object') {
            constantize(obj[key]);
        }
    })
};

const user = {
    name: 'Mark',
    age: 18,
    color: 'red'
};
console.log(user);
// { name: 'Mark', age: 18, color: 'red' }
constantize(user);
user.type = 'object';
console.log(user);
// { name: 'Mark', age: 18, color: 'red' }
```
# 顶层对象的属性
> ES6 为了改变`顶层对象的属性与全局变量挂钩`这个问题.一方面规定.为了保持兼容性.var命令和function命令声明的全局变量.依旧是顶层对象的属性；另一方面规定.let命令、const命令、class命令声明的全局变量.不属于顶层对象的属性.也就是说.从 ES6 开始.全局变量将逐步与顶层对象的属性脱钩.
+ global 对象
    * 浏览器里面,顶层对象是`window`.但Node和Web Worker没有window.
    * 浏览器和Web Worker里面.`self`也指向顶层对象.但是Node没有`self`.
    * Node里面.顶层对象是`global`.但其他环境都不支持.
+ 注意：浏览器端的顶层对象和Node.js端的顶层对象是不一样的，注意区分。
