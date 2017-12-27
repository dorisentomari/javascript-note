var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
var FileAccess;
(function (FileAccess) {
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
    FileAccess[FileAccess["G"] = 'files'.length] = "G";
})(FileAccess || (FileAccess = {}));
var R = FileAccess.Read;
console.log(R); // 2
var RR = FileAccess[R];
console.log(RR); // Read
// 常数枚举只能使用常数枚举表达式并且不同于常规的枚举的是它们在编译阶段会被删除。
// 常数枚举成员在使用的地方被内联进来。
// 这是因为常数枚举不可能有计算成员
var till = [1 /* A */, 2 /* B */, 4 /* C */, 8 /* D */, 16 /* E */];
console.log(till);
/** 外部枚举 **/
// 在正常的枚举里，没有初始化方法的成员被当成常数成员。 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。
function extend(first, second) {
    var result = {};
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in second) {
        result[id] = second[id];
    }
    return result;
}
var LILL = /** @class */ (function () {
    function LILL(name) {
        this.name = name;
    }
    return LILL;
}());
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function () {
        console.log("ConsoleLogger log");
    };
    return ConsoleLogger;
}());
var Pink = extend(new LILL('Mark'), new ConsoleLogger());
var Sark = Pink.name;
console.log(Sark); // Mark
// 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。
// 装饰器使用 @expression这种形式，expression求值后必须为一个函数，
// 它会在运行时被调用，被装饰的声明信息做为参数传入
function color(value) {
    return function (target) {
        var type = typeof target;
        return target + "'type is " + type + " ";
    };
}
function m() {
    console.log("f(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("f(): called");
    };
}
function n() {
    console.log("g(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("g(): called");
    };
}
var K = /** @class */ (function () {
    function K() {
    }
    K.prototype.method = function () {
        console.log('method......');
    };
    __decorate([
        m(),
        n()
    ], K.prototype, "method", null);
    return K;
}());
var k = new K();
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
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
var Kaiser = /** @class */ (function () {
    function Kaiser(msg) {
        this.name = msg;
    }
    return Kaiser;
}());
