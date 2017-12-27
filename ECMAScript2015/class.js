// 类不存在变量提升
class Point {
    
    constructor(x, y) {
        this.x = x + 1;
        this.y = y + 2;
    }
    
    toString() { // toString方法是Point类内部定义的方法，它是不可枚举的
        return `${this.x}, ${this.y}`;
    }
}

let point = new Point(3, 5);
let koint = new Point(2, 4);
Point.prototype.getName = function (name) {
    return `prototype ${name}`;
};
for (let ken in Point) {
    console.log(ken); // 遍历不到Point的属性
    
}

console.log(typeof Point); // function
console.log(point.toString()); // 4, 7
console.log(Point.prototype.constructor === Point); // true
console.log(point.getName('Jack'));  // prototype Jack
console.log(point.hasOwnProperty('x')); // true
console.log(point.hasOwnProperty('y')); // true
console.log(point.hasOwnProperty('toString')); // false
console.log(point.__proto__.hasOwnProperty('toString')); // true
console.log(point.__proto__ === koint.__proto__); // true, 类的所有实例共享一个原型对象
// 最好不要使用__proto__，使用Object.getPrototypeOf方法来获取实例对象的原型，
console.log(Object.getPrototypeOf(point)); // Point { getName: [Function] }
console.log(Object.getPrototypeOf(koint)); // Point { getName: [Function] }

/** class 表达式**/
// 这个类的名字是Cook，不是co，co只在Class内部有定义
let Cook = class co {
    constructor(name, age) {
        name += `hello, ${name}`;
        age += `my age is ${age}`;
    }
    
    getInfo() {
        return co.info;
    }
    
};

// 立即执行的类
let User = new class {
    constructor(name) {
        this.name = name;
    }
    
    sayName() {
        console.log(this.name);
    }
}('Mark');

User.sayName(); // Mark

/** 私有方法 **/
// 将私有方法移出模块
class Widget {
    one(num) {
        two.call(this, num);
    }
}

function two(num) {
    return this.conf = num;
}

// 利用Symbol值的唯一性
let cat = Symbol('cat');
let Pcat = Symbol('Pcat');

class Qcat {
    one(num) {
        this[cat](num);
    }
    
    [cat](num) {
        return this[Pcat] = num;
    }
}

/** this的指向 **/
class Logger {
    
    // 绑定this
    /*******
     constructor() {
        this.printName = this.printName.bind(this);
    }
     *******/
    
    constructor() {
        this.printName = (name = 'Jack') => {
            this.print(`Hello, ${name}`);
        }
    }
    
    printName(name = 'Mark') {
        this.print(`Hello, ${name}`); // Hello, Mark
    }
    
    print(text) {
        console.log(text);
    }
}

let logger = new Logger();
logger.printName();
let {printName} = logger;
printName();
// TypeError: Cannot read property 'print' of undefined
// 报错，在构造函数内部绑定this
// 输出正确结果：Hello, Mark
// 或者是在构造函数内部使用箭头函数
// 输出正确结果：Hello, Jack

/** Class的取值函数getter和存值函数setter **/

class Man {
    constructor() {
    
    }
    
    get book() {
        return 'get book name';
    }
    
    set book(name) {
        return `set book name ${name}`;
    }
}

let sen = new Man();
console.log(sen.book); // get book name
console.log(sen.book = 'how to learn node...'); // how to learn node...
// 存值函数和取值函数是设置在属性的 Descriptor 对象上的
class CustomHTMLElement {
    constructor(element) {
        this.element = element;
    }
    
    get html() {
        return this.element.innerHTML;
    }
    
    set html(value) {
        return this.element.innerHTML = value;
    }
}

let descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype, 'html');

console.log('get' in descriptor); // true
console.log('set' in descriptor); // true

/** class 的 Generator方法**/
class Gen {
    constructor(...args) {
        this.args = args;
    }
    
    * [Symbol.iterator]() {
        for (let arg of this.args) {
            yield arg;
        }
    }
}

let ken = new Gen('Jack', 'Mark', 'Nick');
for (let key of ken) {
    console.log(key);
}

/***
 * Jack
 * Mark
 * Nick
 */

/** Class的静态方法 **/
// 在一个方法前，加上static关键字，该方法不会被实例继承，而是直接通过类来调用
// 静态方法也是可以从super对象上调用的
// 静态方法也是可以从super对象上调用的
class Gill {
    static sum(a, b) {
        return a + b;
    }
    
    minus(a, b) {
        return a - b;
    }
}

let gill = new Gill();
console.log(Gill.sum(2, 4)); // 6
console.log(gill.minus(5, 3)); // 2

class Sill extends Gill {
    static mutil() {
        return super.minus;
    }
}

console.log(Sill.sum(4, 5)); // 9
console.log(Sill.mutil());// undefined

/** Class的静态属性和实例属性 **/
// 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性
class Rill {

}

Rill.username = 'Mark man';
console.log(Rill.username);

/** new.target属性**/
// new是从构造函数生成实例对象的命令
// ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的
// 在函数外部，使用new.target会报错
function Animal(name) {
    if (new.target !== undefined) {
        this.name = name;
    } else {
        throw new Error('必须使用new命令生成实例');
    }
}

function Book(name) {
    if (new.target === Person) {
        this.name = name;
    } else {
        throw new Error('必须使用new命令生成实例');
    }
}

let animal = new Animal('Mark');
console.log(animal.name); // Mark
// let notAnimal = Animal.call(person, 'Jack'); // ReferenceError: person is not defined

// Class 内部调用new.target，返回当前 Class

// 不能独立使用、必须继承后才能使用的类
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}

class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }
}

let shapeOne = new Rectangle(2, 4); // true
let shapeTwo = new Square(4); // false

//
class POLL {
    constructor() {
        if (new.target === POLL) {
            throw new Error('本类不能被实例化');
        }
    }
}

class TOLL extends POLL {
    constructor(length, width) {
        super();
    }
}

let ten = new TOLL(5, 2); // 正确
// let ren = new POLL(); // Error: 本类不能被实例化