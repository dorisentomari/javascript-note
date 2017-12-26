# generator
> 执行 Generator 函数会返回一个遍历器对象,也就是说,Generator 函数除了状态机,还是一个遍历器对象生成函数.返回的遍历器对象,可以依次遍历 Generator 函数内部的每一个状态.
  
> 形式上,Generator 函数是一个普通函数,但是有两个特征.一是,function关键字与函数名之间有一个星号；二是,函数体内部使用yield表达式,定义不同的内部状态（yield在英语里的意思就是“产出”）.

```ecmascript 6
function* hi() {
    yield 'hello';
    yield 'how are you?';
    return 'ending'
}

let sayHi = hi();

console.log(sayHi.next());
console.log(sayHi.next());
console.log(sayHi.next());
console.log(sayHi.next());

/**
 * { value: 'hello', done: false }
 * { value: 'how are you?', done: false }
 * { value: 'ending', done: true }
 * { value: undefined, done: true }
 * */
```
> 总结一下,调用 Generator 函数,返回一个遍历器对象,代表 Generator 函数的内部指针.以后,每次调用遍历器对象的next方法,就会返回一个有着`value`和`done`两个属性的对象.`value`属性表示当前的内部状态的值,是`yield`表达式后面那个表达式的值；`done`属性是一个布尔值,表示是否遍历结束.

# yield
> 由于 Generator 函数返回的遍历器对象,只有调用`next`方法才会遍历下一个内部状态,所以其实提供了一种可以暂停执行的函数.`yield`表达式就是暂停标志.
  
> yield表达式后面的表达式,只有当调用`next`方法、内部指针指向该语句时才会执行,因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能.

> Generator 函数可以不用`yield`表达式,这时就变成了一个单纯的暂缓执行函数.

```ecmascript 6
function* f() {
    console.log('e....')
}

let generator = f();

setTimeout(function () {
    generator.next();
}, 2000);
/**
 * //2000毫秒之后
 * e....
 * */
```

# yield的错误
+ 会报错,因为`forEach`方法的参数是一个普通函数,但是使用了`yield item`
```ecmascript 6
let arr = [1, [[2, 3], 4], [5, 6]];

let flat = function* (a) {
    a.forEach(function (item) {
        if (typeof item !== 'number') {
            yield* flat(item);
        } else {
            yield item;
        }
    });
};

for (let f of flat(arr)) {
    console.log(f);
}
```
+ 改用`for`循环
```ecmascript 6
// 循环遍历数组以及数组里的数组元素
let arr = [1, [[2, 8], 4, [3, 5, [8, 0]]], [5, 6]];
let data = [];
let flat = function* (a) {
    let length = a.length;
    for (let i = 0; i < length; i++) {
        let item = a[i];
        if (typeof item !== 'number') {
            yield* flat(item);
        } else {
            yield item;
            data.push(item);
        }
    }
};

for (let f of flat(arr)) {
    console.log(f);
}
//增加排序功能
data.sort(function (x, y) {
    if (x > y) {
        return 1;
    } else {
        return -1;
    }
});
console.log(data);
/**
 * 1
 * 2
 * 8
 * 4
 * 3
 * 5
 * 8
 * 0
 * 5
 * 6
 * [ 0, 1, 2, 3, 4, 5, 5, 6, 8, 8 ]
 */
```

+ `yield`如果用在表达式中,必须放在圆括号里边
```ecmascript 6
function* kaiser() {
    console.log('kaiser brand ' + (yield 568));
    console.log('kaiser orange ' + (yield 798));
}

let store = kaiser();
console.log(store.next());
console.log(store.next());
console.log(store.next());

/***
 * 先执行yield,再执行console.log()
 * { value: undefined, done: false }
 * kaiser brand undefined
 * { value: 798, done: false }
 * kaiser orange undefined
 * { value: undefined, done: true }
 */
```

# next方法的参数
> yield表达式本身没有返回值,或者说总是返回`undefined`.`next`方法可以带一个参数,该参数就会被当作上一个`yield`表达式的返回值.
```ecmascript 6
function* f() {
    for (let i = 0; true; i++) {
        console.log('i:', i);
        let reset = yield i;
        console.log('Boolean(reset):', Boolean(reset));
        if (reset) {
            i = -1;
        }
    }
}

let g = f();
console.log(g.next());// i: 0, { value: 0, done: false }, Boolean(reset): false 
console.log(g.next());// i: 1, { value: 1, done: false }, Boolean(reset): false 
console.log(g.next());// i: 2, { value: 2, done: false }, Boolean(reset): false 
console.log(g.next());// i: 3, { value: 3, done: false }, Boolean(reset): false 
console.log(g.next());// i: 4, { value: 4, done: false }, Boolean(reset): false 
console.log(g.next('kaiser'));// i: 0, { value: 0, done: false }, 
```
> 上面代码先定义了一个可以无限运行的 Generator 函数`f`,如果`next`方法没有参数,每次运行到`yield`表达式,变量`reset`的值总是`undefined`.当`next`方法带一个参数`true`时,变量`reset`就被重置为这个参数即(true),因此i会等于-1,下一轮循环就会从-1开始递增.

> 这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过`next`方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

+ next有参数与无参数的区别
```ecmascript 6
function* foo(x) {
    let y = 2 * (yield (x + 1));
    console.log('y:', y);
    let z = yield (y / 3);
    console.log('z:', z);
    return (x + y + z);
}

let ken = foo(5);
console.log(ken.next());// {value: 6, done: false} // y: NaN
console.log(ken.next());// { value: NaN, done: true } // z: undefined
console.log(ken.next());// { value: undefined, done: true }
console.log(ken.next());// { value: undefined, done: true }

let gen = foo(5);
console.log(gen.next());// { value: 6, done: false } // y: 36
console.log(gen.next(18));// { value: 12, done: false }, yield的值为12,=>y的值是36,=>(yield (x + 1)) = 18,实际上,next的参数18就是上一步yield的值, // z: 10
console.log(gen.next(10));// { value: 51, done: true },这一步是return所得到的值
console.log(gen.next(24));// { value: undefined, done: true }
```
> 由于`next`方法的参数表示上一个`yield`表达式的返回值，所以在第一次使用`next`方法时，传递参数是无效的。V8 引擎直接忽略第一次使用`next`方法时的参数，只有从第二次使用`next`方法开始，参数才是有效的。从语义上讲，第一个`next`方法用来启动遍历器对象，所以不用带有参数。

+ 通过`next`方法向Generator函数输入值
```ecmascript 6
function* genFn() {
    console.log(`Started`);
    console.log(`1.${yield}`);
    console.log(`2.${yield}`);
    return `result`;
}

let genObj = genFn();

/** 没有参数 */
genObj.next();// Started
genObj.next();// 1.undefined
genObj.next();// 2.undefined
genObj.next();// **空行**

/** 有参数 */
genObj.next();// Started
genObj.next('one');// 1.one
genObj.next('two');// 2.two
genObj.next('three');// **空行**
```

# `for...of`循环 
> `for...of`循环可以自动遍历 Generator 函数时生成的`Iterator`对象，且此时不再需要调用next方法,一旦`next`方法返回对象的属性为`true`,`for...of`循环就会中止,且不包含该返回对象
```ecmascript 6
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    yield 6;
    return 7;
}

for (let k of foo()) {
    console.log(k);
}

let baz = foo();
console.log(baz.next());// { value: 1, done: false }
console.log(baz.next());// { value: 2, done: false }
console.log(baz.next());// { value: 3, done: false }
console.log(baz.next());// { value: 4, done: false }
console.log(baz.next());// { value: 5, done: false }
console.log(baz.next());// { value: 6, done: false }
console.log(baz.next());// { value: 7, done: true }
```

+ 利用Generator函数和`for...of`循环实现斐波那契数列
```ecmascript 6
function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (; ;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

for (let key of fibonacci()) {
    if (key > 1000) {
        break;
    }
    console.log(key);
}

/***
 * 1
 * 2
 * 3
 * 5
 * 8
 * 13
 * 21
 * 34
 * 55 
 * 89
 * 144
 * 233
 * 377
 * 610
 * 987
 */
```

# `Generator.prototype.throw()`
> Generator函数返回的遍历器对象,都有一个`throw`方法,可以在函数体外抛出错误,然后在Generator函数体内捕获错误
```ecmascript 6
let genFn = function* () {
    try {
        yield;
    } catch (e) {
        console.log('内部捕获错误:', e);
    }
}

let ken = genFn();
ken.next();

try {
    ken.throw('one');
    ken.throw('two');
} catch (e) {
    console.log('外部捕获错误:', e);
}
```
> 遍历器对象`ken`连续抛出了两个错误,第一个错误被Generator函数体内的`catch`语句捕获,`ken`第二次抛出错误,由于Generator函数内部的`catch`语句已经执行过了,不会再捕捉到这个错误,所以这个错误就被抛出了Generator函数体,被函数体外的`catch`语句捕获

> 如果Generator函数内部没有部署`try...catch`代码块,那么`throw`方法抛出的错误,将被外部的`try...catch`代码捕获

> 如果Generator函数内部和外部,都没有部署`try...catch`代码块,那么程序将报错,直接中断执行

> `throw`方法被捕获之后,会附带执行下一条`yield`表达式,也就是说,会附带执行一次`next`方法

# `Generator.prototype.return()`
+ Generator 函数返回的遍历器对象，还有一个`return`方法，可以返回给定的值，并且终结遍历 Generator 函数。
```ecmascript 6
function* gen(){
    yield 1;
    yield 2;
    yield 3;
}

/** return传递参数,返回的value值就是参数 */
let ken = gen();// { value: 1, done: false }
console.log(ken.next());
console.log(ken.return('generator retuen'));// { value: 'generator retuen', done: true }
console.log(ken.next());// { value: undefined, done: true }
console.log(ken.next());// { value: undefined, done: true }

/** return不传递参数,返回的value值就是undefined */
let den = gen();
console.log(den.next());// { value: 1, done: true }
console.log(den.return());// { value: undefined, done: true }
console.log(den.next());// { value: undefined, done: true }
console.log(den.next());// { value: undefined, done: true }
```
+ 如果Generator函数内部有`try...finally`代码块,那么`return`方法会推迟到`finally`代码块执行完再执行
```ecmascript 6
function* gen() {
    yield 1;
    try {
        yield 2;
        yield 3;
    } catch (e) {
        console.log('gen Generator 内部捕获错误');
    } finally {
        yield 4;
        yield 5;
    }
    yield 6;
}

/** return传递参数,返回的value值就是参数 */
let ken = gen();// { value: 1, done: false }
console.log(ken.next());    // { value: 1, done: false }
console.log(ken.next());    // { value: 2, done: false }
console.log(ken.return());  // { value: 4, done: false }
console.log(ken.next());    // { value: 5, done: false }
console.log(ken.next());    // { value: undefined, done: true }
```

# `next()`,`throw()`,`return()`的共同点
> `next()`,`throw()`,`return()`这三个方法本质上是同一件事,可以放在一起理解.它们的作用都是让 Generator 函数恢复执行,并且使用不同的语句替换yield表达式.
+ `next()`是将`yield`表达式替换成一个值
+ `throw()`是将`yield`表达式替换成一个throw语句
+ `return()`是将`yield`表达式替换成一个return语句

=======
**pay attention**
还有`yield*`表达式,作为对象属性的`Generator`函数,`Generator`函数的`this`,含义,应用,没有记录学习
