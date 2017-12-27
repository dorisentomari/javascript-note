/** 泛型 **/
// 使返回值的类型与传入参数的类型是相同的
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
function identity(arg) {
    return arg;
}
var identityOne = identity('identity one string');
var identityTwo = identity(100);
function arrayType(arg) {
    console.log(arg.length);
    return arg;
}
function TypeArray(arg) {
    console.log(arg.length);
    return arg;
}
/** 泛型类型**/
var identityT = identity;
console.log(identity(100));
console.log(identity(true));
console.log(identity('file'));
console.log(identity({ user: 'Mark' }));
// 可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以
var identityM = identity;
console.log(identityM(['', 2, true, {}]));
console.log(identityM('tips'));
function genIdentity(arg) {
    return arg;
}
var identityTips = genIdentity;
/** 泛型类 **/
var GenNumber = /** @class */ (function () {
    function GenNumber() {
    }
    return GenNumber;
}());
var genNum = new GenNumber();
genNum.value = 9;
genNum.add = function (x, y) {
    return x + y;
};
function logIdentity(arg) {
    console.log(arg.length);
    return arg;
}
logIdentity('eee');
logIdentity([]);
// 在泛型约束中使用类型参数
/****************
 function getProperty(obj: T, key: K) {
    return obj[key];
}

 let men = {a: 1, b: 2, c: 3, d: 4};
 console.log(getProperty(men, 'a'));
 ******************/
// 在泛型里使用类类型
function create(c) {
    return new c();
}
// 使用原型属性推断并约束构造函数与类实例的关系
var BeeKeeper = /** @class */ (function () {
    function BeeKeeper() {
    }
    return BeeKeeper;
}());
var ZooKeeper = /** @class */ (function () {
    function ZooKeeper() {
    }
    return ZooKeeper;
}());
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Bee = /** @class */ (function (_super) {
    __extends(Bee, _super);
    function Bee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bee;
}(Animal));
var Lion = /** @class */ (function (_super) {
    __extends(Lion, _super);
    function Lion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Lion;
}(Animal));
function createInstance(c) {
    return new c();
}
console.log(createInstance(Lion).keeper.nametag);
console.log(createInstance(Bee).keeper.hasMask);
//# sourceMappingURL=07-generics.js.map