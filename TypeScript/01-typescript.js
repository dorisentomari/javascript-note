/******* learning typescript********/
var str;
str = ['a', 'b'];
str = 'k';
var sen = {};
if (typeof sen === 'string') {
    //console.log(sen.splice(3, 5));
}
// sen.getName();
var fen = function (name) {
    return 'hi';
};
var gen = function (name) {
    return 'hi';
};
function sum(a, b, callback) {
    console.log(callback(a + b)); // 6
}
sum(1, 3, function (result) { return 6; });
var Character = /** @class */ (function () {
    function Character(firstname, lastname) {
        this.fullname = firstname + ' ' + lastname;
    }
    Character.prototype.sayHi = function (name) {
        if (name) {
            return 'Hi ' + name + '! my name is ' + this.fullname;
        }
        else {
            return 'Hi! my name is ' + this.fullname;
        }
    };
    return Character;
}());
var spark = new Character('Mark', 'John');
var msg = spark.sayHi();
console.log(msg); // Hi! my name is Mark John
var info = spark.sayHi('Dr. Hanks');
console.log(info); // Hi Dr. Hanks! my name is Mark John
var LoggerClass = /** @class */ (function () {
    function LoggerClass() {
    }
    LoggerClass.prototype.log = function (arg) {
        if (typeof console.log === 'function') {
            console.log(arg);
        }
        else {
            console.log('console.log is not a function..');
        }
    };
    return LoggerClass;
}());
var logger = new LoggerClass();
logger.log('hello'); // hello
var user = {
    name: 'carl',
    password: 'www'
};
/** 命名空间 **/
// 命名空间，又称为内部模块，被用于组织一些具有某些内在联系的特性和对象。
// 命名空间能够使代码结构更清晰，可以使用namespace和export关键字，在ts中声明命名空间
// 注意：命名空间内的第一个接口声明前并没有export关键字，所以在命名空间的外部，我们访问不到它
/***************************
 namespace Geometry {
    interface VectorInterface {

    }

    export interface Vector2dInterface {

    }

    export interface Vector3dInterface {

    }

    export class Vector2d implements VectorInterface, Vector2dInterface {

    }

    export class Vector3d implements VectorInterface, Vector3dInterface {

    }
}

 let vector2dInstance: Geometry.Vector2dInterface = new Geometry.Vector2d();
 let vector3dInstance: Geometry.Vector2dInterface = new Geometry.Vector3d();
 ***************************/
var Geometry;
(function (Geometry) {
    var Vector2d = /** @class */ (function () {
        function Vector2d(x, y) {
            this._x = x;
            this._y = y;
        }
        Vector2d.prototype.toArray = function (callback) {
            callback([this._x, this._y]);
        };
        Vector2d.prototype.length = function () {
            return Math.sqrt(this._x * this._x + this._y * this._y);
        };
        Vector2d.prototype.normalize = function () {
            var len = 1;
            this._x *= len;
            this._y *= len;
        };
        return Vector2d;
    }());
    Geometry.Vector2d = Vector2d;
})(Geometry || (Geometry = {}));
var vector = new Geometry.Vector2d(10, 15);
vector.normalize();
vector.toArray(function (vectorAsArray) {
    console.log("x: " + vectorAsArray[0] + " y: " + vectorAsArray[1]); // x: 10 y: 15
});
