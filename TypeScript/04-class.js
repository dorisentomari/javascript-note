/** 类 **/
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
var Greeter = /** @class */ (function () {
    function Greeter(msg) {
        this.greeting = this.toWho + msg;
    }
    return Greeter;
}());
var greeter = new Greeter(' this is greeter....');
console.log(greeter); // Greeter { greeting: 'undefined this is greeter....' }
/*******************************
 class Animal {
    name: string;

    constructor(theName: string) {
        this.name = theName;
    }

    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}`);
    }
}

 class Monkey extends Animal {
    constructor(name: string) {
        super(name);
    }

    move(distanceInMeters = 10) {
        console.log('monkey is running....'); // monkey is running....
        super.move(distanceInMeters); // I am monkey moved 10
    }
}

 class Horse extends Animal {
    constructor(name: string) {
        super(name);
    }

    move(distanceInMeters = 45) {
        console.log('the horse is running....'); // the horse is running....
        super.move(distanceInMeters); // tom new Horse moved 99
    }
}

 let sam = new Monkey('I am monkey');
 let tom: Animal = new Horse('tom new Horse');

 sam.move();
 tom.move(99);
 *******************************/
// 派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。 这个是TypeScript强制执行的一条重要规则。
// 当我们比较带有 private或 protected成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个 private成员，那么只有当另外一个类型中也存在这样一个 private成员， 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 protected成员也使用这个规则。
/****************************
class Animal {
****************************/
/** 公共，私有与受保护的修饰符 **/
/****************************
    public name: string;
    private age: number; // 当成员被标记成 private时，它就不能在声明它的类的外部访问

    public constructor(theName: string, theAge: number) {
        this.name = theName;
        this.age = theAge;
    }

    public move(distanceInMeters: number) {
        console.log(`${this.name} movedddddd ${distanceInMeters}`);
    }
}

class Rhino extends Animal {
    constructor() {
        super("Rhino", 18);
    }
}

class Employee {
    private name: string;

    constructor(theName: string) {
        this.name = theName;
    }
}

let animal = new Animal('witch', 16);
let rhino = new Rhino();
let employee = new Employee('ALICE');
console.log(animal); // Animal { name: 'witch', age: 16 }
console.log(rhino); // Rhino { name: 'Rhino', age: 18 }
console.log(employee); // Employee { name: 'ALICE' }
****************************/
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee.prototype.getValue = function () {
        return "hello, this is " + this.name + " and live in " + this.department;
    };
    return Employee;
}(Person));
var howard = new Employee('Howard', 'bridge hotel');
console.log(howard.getValue()); // hello, this is Howard and live in bridge hotel
console.log(howard); // Employee { name: 'Howard', department: 'bridge hotel' }
var Octopus = /** @class */ (function () {
    function Octopus(theName) {
        this.numberOfLegs = 10;
        this.name = theName;
    }
    return Octopus;
}());
var ken = new Octopus('the octopus has 10 strong legs');
var Grid = /** @class */ (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistance = function (point) {
        var xDist = (point.x - Grid.origin.x);
        var yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    };
    Grid.origin = {
        x: 0,
        y: 0
    };
    return Grid;
}());
var grid1 = new Grid(2);
var grid2 = new Grid(5);
console.log(Number.parseInt(grid1.calculateDistance({ x: 10, y: 10 }))); // 7
console.log(Number.parseInt(grid2.calculateDistance({ x: 20, y: 20 }))); // 5
/** abstract **/
// 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。
// 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法
var Cool = /** @class */ (function () {
    function Cool() {
    }
    Cool.prototype.eat = function () {
        console.log('eat food....');
    };
    return Cool;
}());
// 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
// 抽象方法的语法与接口方法相似。
// 两者都是定义方法签名但不包含方法体。
// 然而，抽象方法必须包含 abstract关键字并且可以包含访问修饰符
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log("Department name: " + this.name);
    };
    return Department;
}());
var House = /** @class */ (function (_super) {
    __extends(House, _super);
    function House() {
        return _super.call(this, '在派生类的构造函数中必须调用super()') || this;
    }
    House.prototype.printMeeting = function () {
        console.log('实现基类的printMeeting方法');
    };
    House.prototype.genFn = function () {
        console.log('generator function ');
    };
    return House;
}(Department));
var smallDepartment; // 创建一个对抽象类型的引用
smallDepartment = new House(); // 允许对一个抽象子类进行实例化和赋值，但是不能创建一个抽象类的实例
smallDepartment.printName(); // Department name: 在派生类的构造函数中必须调用super()
smallDepartment.printMeeting(); // 实现基类的printMeeting方法
//# sourceMappingURL=04-class.js.map