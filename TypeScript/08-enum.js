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
