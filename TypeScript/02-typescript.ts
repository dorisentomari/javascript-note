/******* learning typescript********/
let str: string[] | string;
str = ['a', 'b'];
str = 'k';

let sen: any = {};
if (typeof sen === 'string') {
    //console.log(sen.splice(3, 5));
}
// sen.getName();

let fen = (name: string): string => {
    return 'hi';
};

let gen: (name: string) => string = function (name: string): string {
    return 'hi';
};

function sum(a: number, b: number, callback: (result: number) => void) {
    console.log(callback(a + b)); // 6
}

sum(1, 3, result => 6);

class Character {
    fullname: string;

    constructor(firstname: string, lastname: string) {
        this.fullname = firstname + ' ' + lastname;
    }

    sayHi(name?: string) {
        if (name) {
            return 'Hi ' + name + '! my name is ' + this.fullname;
        } else {
            return 'Hi! my name is ' + this.fullname;
        }
    }
}

let spark = new Character('Mark', 'John');
let msg = spark.sayHi();
console.log(msg); // Hi! my name is Mark John
let info = spark.sayHi('Dr. Hanks');
console.log(info); // Hi Dr. Hanks! my name is Mark John

interface Logger {
    log(arg: any): void;
}

class LoggerClass implements Logger {
    log(arg) {
        if (typeof console.log === 'function') {
            console.log(arg);
        } else {
            console.log('console.log is not a function..');
        }
    }
}

let logger = new LoggerClass();
logger.log('hello'); // hello

interface UserInterface {
    name: string;
    password: string;
}

let user: UserInterface = {
    name: 'carl',
    password: 'www'
};

/** 命名空间 **/
// 命名空间，又称为内部模块，被用于组织一些具有某些内在联系的特性和对象。
// 命名空间能够使代码结构更清晰，可以使用namespace和export关键字，在ts中声明命名空间
// 注意：命名空间内的第一个接口声明前并没有export关键字，所以在命名空间的外部，我们访问不到它
/***************************
 namespace Geometry {
    interface VectorInterface {}

    export interface Vector2dInterface {}

    export interface Vector3dInterface {}

    export class Vector2d implements VectorInterface, Vector2dInterface {}

    export class Vector3d implements VectorInterface, Vector3dInterface {}
}

 let vector2dInstance: Geometry.Vector2dInterface = new Geometry.Vector2d();
 let vector3dInstance: Geometry.Vector2dInterface = new Geometry.Vector3d();
 ***************************/
module Geometry {
    export interface Vector2dInterface {
        toArray(callback: (x: number[]) => void): void;

        length(): number;

        normalize();
    }

    export class Vector2d implements Vector2dInterface {
        private _x: number;
        private _y: number;

        constructor(x: number, y: number) {
            this._x = x;
            this._y = y;
        }

        toArray(callback: (x: number[]) => void): void {
            callback([this._x, this._y])
        }

        length(): number {
            return Math.sqrt(this._x * this._x + this._y * this._y);
        }

        normalize() {
            let len = 1;
            this._x *= len;
            this._y *= len;
        }
    }
}

let vector: Geometry.Vector2dInterface = new Geometry.Vector2d(10, 15);
vector.normalize();
vector.toArray(function (vectorAsArray: number[]) {
    console.log(`x: ${vectorAsArray[0]} y: ${vectorAsArray[1]}`); // x: 10 y: 15
});