enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

enum FileAccess {
    None,
    Read = 1 << 1,  // 2
    Write = 1 << 2, // 4
    ReadWrite = Read | Write,
    G = 'files'.length
}

let R = FileAccess.Read;
console.log(R); // 2
let RR = FileAccess[R];
console.log(RR); // Read

// 生成的代码中，枚举类型被编译成一个对象，它包含双向映射（name -> value）和（value -> name）。
// 引用枚举成员总会生成一次属性访问并且永远不会内联。
// 在大多数情况下这是很好的并且正确的解决方案。
// 然而有时候需求却比较严格。
// 当访问枚举值时，为了避免生成多余的代码和间接引用，可以使用常数枚举。
// 常数枚举是在 enum关键字前使用const修饰符

const enum Lit {
    A = 1,
    B = A * 2,
    C = B * 2,
    D = C * 2,
    E = D * 2,
}

// 常数枚举只能使用常数枚举表达式并且不同于常规的枚举的是它们在编译阶段会被删除。
// 常数枚举成员在使用的地方被内联进来。
// 这是因为常数枚举不可能有计算成员

let till = [Lit.A, Lit.B, Lit.C, Lit.D, Lit.E];
console.log(till);

/** 外部枚举 **/
// 在正常的枚举里，没有初始化方法的成员被当成常数成员。 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。

function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }

    for (let id in second) {
        (<any>result)[id] = (<any>second)[id];
    }

    return result;
}

class LILL {
    constructor(public name: string) {
    }
}

interface Loggable {
    log(): void;
}

class ConsoleLogger implements Loggable {
    log() {
        console.log(`ConsoleLogger log`)
    }
}

let Pink = extend(new LILL('Mark'), new ConsoleLogger());
let Sark = Pink.name;
console.log(Sark); // Mark

// 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。
// 装饰器使用 @expression这种形式，expression求值后必须为一个函数，
// 它会在运行时被调用，被装饰的声明信息做为参数传入

function color(value: string) { // 装饰器工厂
    return function (target) {  // 装饰器
        let type = typeof target;
        return `${target}'type is ${type} `;
    }
}


function m() {
    console.log(`f(): evaluated`);
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`f(): called`);
    }
}

function n() {
    console.log(`g(): evaluated`);
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`g(): called`);
    }
}

class K {
    @m()
    @n()
    method() {
        console.log('method......');
    }
}

let k = new K();
k.method();
/***
 * f(): evaluated
 * g(): evaluated
 * g(): called
 * f(): called
 * method......
 */

/***
 * 类中不同声明上的装饰器将按以下规定的顺序应用
 * 1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
 * 2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
 * 3. 参数装饰器应用到构造函数。
 * 4. 类装饰器应用到类。
 */

/** 类装饰器**/
// 类装饰器在类声明之前被声明（紧靠着类声明）
// 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。 类装饰器不能用在声明文件中( .d.ts)，也不能用在任何外部上下文中（比如declare的类）
// 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
// 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
// 如果要返回一个新的构造函数，你必须注意处理好原来的原型链。

function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

class Kaiser {
    name: string;

    constructor(msg: string) {
        this.name = msg;
    }
}