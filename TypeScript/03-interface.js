var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/** 接口 **/
function person(user) {
    // 传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配
    console.log(user); // { name: 'Mark', age: 18 }
    console.log(user.age); // 18
}
var Mark = {
    name: 'Mark',
    age: 18
};
person(Mark);
// 类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以
function Jack(JackInfo) {
    console.log(JackInfo);
}
var JackUser = {
    name: 'Jack',
    age: 18,
    grade: {
        Chinese: 95,
        English: 96
    },
    birthday: new Date('1995-05-09'),
    id: 2596
};
Jack(JackUser);
// TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改
var id = [2148, 3256, 4852, 1452, 9635];
var user = id;
console.log(user); // [2148, 3256, 4852, 1452, 9635]
/***
 * user[0] = 8541; // Error
 * user.push(6539); // Error
 * user.length; // Error
 * id = user; // Error
 */
// 把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但可以用类型断言重写
id = user;
// id = user as string[]; // Error
id[0] = 5896;
console.log(id); // [ 5896, 3256, 4852, 1452, 9635 ]
function SquareCalc(config) {
    return;
}
var SquareOne = SquareCalc({ color: 'orange', width: 16 });
var SquareTwo = SquareCalc({ color: 'orange', width: 16 });
console.log(SquareOne);
console.log(SquareTwo);
//  对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，会得到一个错误
// 使用类型断言绕开这些检查
var SquareThree = SquareCalc({ color: 'red', width: 18 });
var SquareOptions = { colour: 'red', width: 12 };
var SquareFour = SquareCalc(SquareOptions);
var SearchOne;
SearchOne = function (source, subString) {
    var result = source.search(subString);
    return result > -1;
};
// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配
var SearchTwo;
SearchTwo = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
// 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的
//  如果你不想指定类型，TypeScript的类型系统会推断出参数类型，因为函数直接赋值给了SearchFn类型变量。 函数的返回值类型是通过其返回值推断出来的,此例是 false和true。 如果让这个函数返回数字或字符串，类型检查器会警告我们函数的返回值类型与SearchFn接口中的定义不匹配
var SearchThree;
SearchThree = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
var ArrayOne;
ArrayOne = ['CARL', 'FRED'];
var stringOne = ArrayOne[0];
console.log(stringOne);
// 定义了StringArray接口，它具有索引签名。 这个索引签名表示了当用 number去索引StringArray时会得到string类型的返回值
// 共有支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
var arrayOne = ['ALICE', 'JOHN'];
console.log(arrayOne); // [ 'ALICE', 'JOHN' ]
var Clock = /** @class */ (function () {
    function Clock(hour, minute) {
    }
    return Clock;
}());
var Cocacola = /** @class */ (function () {
    function Cocacola(hour, minute) {
    }
    Cocacola.prototype.setTime = function (day) {
        this.currentTime = day;
    };
    return Cocacola;
}());
var square = {};
square.color = 'orangered';
square.sideLength = 10;
square.penWidth = 3;
console.log(square); //  { color: 'orangered', sideLength: 10, penWidth: 3 }
function getCounter() {
    var counter = function (start) {
    };
    counter.interval = 100;
    counter.reset = function () {
        console.log('counter rest function ....');
    };
    return counter;
}
var CNumber = getCounter();
console.log(CNumber);
console.log(CNumber(10));
console.log(CNumber.reset());
console.log(CNumber.interval = 8.0);
