/** 1. 函数声明和函数表达式 **/
// 解释器会首先在代码解析阶段执行函数声明
// 除非函数表达式被赋值，否则就不会被执行
function greetNamed(name) {
    if (name) {
        return "Hi " + name;
    }
}
var greetUnnamed = function (name) {
    if (name) {
        return "Hi " + name;
    }
};
console.log("greetNamed:  " + greetNamed('Mark')); // greetNamed:  Hi Mark
console.log("greetUnnamed:  " + greetUnnamed('Mark')); // greetUnnamed:  Hi Mark
console.log("greetUnnamed:  " + greetUnnamed()); // greetUnnamed:  undefined
/** 2. 函数类型 **/
// 函数noName的类型是一个只包含一个名为name的string类型参数
// 在调用后会返回类型为string的函数
// 在声明了这个变量之后，一个完全符合变量类型的函数被赋值给了它
var noName;
noName = function (name) {
    if (name) {
        return "Hi " + name;
    }
};
// 简化上述代码
var noUser = function (name) {
    if (name) {
        return "Hi " + name;
    }
};
console.log("noUser: " + noUser('Jack'));
/** 3. 可选参数和有默认参数的函数 **/
function sum(a, b, c) {
    if (!c) {
        return a + b + c;
    }
    else {
        return a + b;
    }
}
console.log("sum: " + sum(1, 2, 3));
console.log("sum: " + sum(1, 2));
function minus(a, b, c) {
    if (c === void 0) { c = 10; }
    return a - b - c;
}
console.log("minus: " + minus(1, 2, 3)); // minus: -4
console.log("minus: " + minus(1, 2)); // minus: -11
// void 0 是TypeScript编译器检测一个变量是否为undefined的用法
// if (c === void 0) { c = 10; }
// 几乎所有的开发者都是用undefined变量
// 几乎所有的编译器都使用void 0
/** 4. 有剩余参数的函数 **/
// 如果认为使用扩展操作符会带来性能问题，那就使用一个数组作为函数参数
function moreArgu() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    var result = 0;
    for (var i = 0; i < nums.length; i++) {
        result += nums[i];
    }
    return result;
}
console.log("moreArgu: " + moreArgu(5, 8, 9, 3, 1, 7, 8, 0, 6)); // moreArgu: 47
// JavaScript函数有一个被称为arguments的內建对象，这个对象可以通过arguments局部变量取到
// arguments变量是一个非常像数组的对象，包含了调用函数时的所有参数
/** 5. 函数重载 **/
// 重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力
/********************
 function overload(username: string): string {
    return username;
}

 function overload(age: number): number {
    return age;
}

 function overload(clean: boolean): boolean {
    return clean;
}
 ********************/
function overload(value) {
    switch (typeof value) {
        case 'string':
            return "my name is " + value;
        case 'number':
            return "my age is " + value;
        case 'boolean':
            return value ? 'I am clean' : 'I am not clean';
        default:
            console.log('Invalid Operation!');
            break;
    }
}
console.log("overload: " + overload('Mark')); // overload: my name is Mark
console.log("overload: " + overload(18)); // overload: my age is 18
console.log("overload: " + overload(true)); // overload: I am clean
/** 7. 函数作用域 和 立即调用函数**/
// 在函数运行过程中，所有的变量声明都会在函数执行前移动到函数的顶端，称为变量提升
// let声明变量不会有变量提升
// IIFE(立即调用函数表达式)
/** 8. 泛型 **/
// don't repeat yourself(DRY原则)，旨在减少各种类型的信息重复
// 泛型编程是一种程序语言的风格，它允许程序员使用以后才会定义的类型，并且在实例化时作为参数指定这些类型
/*******************
 class User {
    name: string;
    age: number;
}

 let $ = {
    ajax: {}
};

 function ajax(callback) {
    $.ajax({
        url: '/users',
        method: 'POST',
        success(data) {
            callback(data)
        },
        error(error) {
            callback(null);
        }
    })
}

 function getUser(callback: (users: User[]) => void): void {
    ajax(callback);
}

 getUser(function (users: User[]) {
    for (let i = 0; i < users.length; i++) {
        console.log(users[i].name);
    }
});

 class Order {
    id: number;
    total: number;
    items: any[];
}

 function getOrders(callback: (orders: Order[]) => void): void {
    ajax(callback);
}

 getOrders(function (orders: Order[]) {
    for (let i = 0; i < orders.length; i++) {
        console.log(orders[i].id);
    }
});

 function getEntities<T>(url: string, callback: (list: T[]) => void): void {
    ajax(callback);
}

 getEntities<User>('/POST', function (users: User[]) {
    for (let i = 0; i < users.length; i++) {
        console.log(users[i].name);
    }
});


 getEntities<Order>('/POST', function (orders: Order[]) {
    for (let i = 0; i < orders.length; i++) {
        console.log(orders[i].id);
    }
});
 *******************/
/** 9. tag函数和标签模板 **/
// 一个标签模板必须返回一个字符串，并接受以下参数
// 第一个参数是一个数组，包含了模板字符串中所有的静态字面量
// 剩余的参数是模板字符串中所有的变量
function tag(literals) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    return;
}
// 逐字迭代字符串和值来确保所有的HTML代码被正确转义，防止代码注入攻击
function htmlEscape(literals) {
    var placeholders = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        placeholders[_i - 1] = arguments[_i];
    }
    var result = '';
    for (var i = 0; i < placeholders.length; i++) {
        result += literals[i];
        result += placeholders[i]
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        result += literals[literals.length - 1];
        return result;
    }
}
var html = "<p>hello<a href=\"02-function.ts\"></a></p>";
console.log(htmlEscape('ABCD', html));
/** 10. 回调和高阶函数 **/
// 接收函数为参数(回调)或返回另一个函数的函数称为高阶函数
var one = function () {
    console.log('one function');
};
function two(callback) {
    console.log('two function');
    callback();
}
/** 11. 箭头函数 **/
// 箭头函数时function表达式的缩写，并且这种词法会在其他作用域内绑定this操作符
// 在TypeScript中定义一个类的时候，可以使用this指向这个类自身的属性
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = 'Mark';
        this.name = name;
    }
    Person.prototype.sayHi = function () {
        console.log("Hi, my name is " + this.name);
    };
    Person.prototype.sayHiDelay = function (time) {
        var _this = this;
        setTimeout(function () {
            console.log("Hi, my name is " + _this.name + " delay");
        }, time);
    };
    /** this 作用域的问题 **/
    Person.prototype.sayHiDelayWrong = function (time) {
        setTimeout(function () {
            console.log("Hi, my name is " + this.name + " delay wrong");
        }, 1000);
    };
    return Person;
}());
var Jack = new Person('Jack');
Jack.sayHi(); // Hi, my name is Jack
Jack.sayHiDelay(1000); // Hi, my name is Jack delay
Jack.sayHiDelayWrong(1000); // Hi, my name is undefined delay wrong
/** 12. 生成器 Generator yield **/
// 生成器函数可能会在函数执行的过程中将这两个函数暂停一次或多次，并在随后恢复它的运行
// 而且可以让其他代码在暂停的过程中运行
// 无限循环而不会导致栈溢出
// 可能以同步的方式编写异步代码
/******************************
function* gen() {
    yield 'first';
    yield 'second';
    yield 'third';
    yield 'fourth';
}

let genYield = gen();
console.log(genYield.next()); // { value: 'first', done: false }
console.log(genYield.next()); // { value: 'second', done: false }
console.log(genYield.next()); // { value: 'third', done: false }
console.log(genYield.next()); // { value: 'fourth', done: false }
console.log(genYield.next()); // { value: undefined, done: true }
 ******************************/
/** 13. 异步函数 async, await **/
// 一个异步函数是在异步操作中被调用的函数
// 可以使用await关键字等待异步结果的到来而不会阻塞程序的执行
/******************
let promise: Promise<number>;

async function fn(): Promise<number> {
    let i = await promise;
    return 1 + i;
}
******************/ 
