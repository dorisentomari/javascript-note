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