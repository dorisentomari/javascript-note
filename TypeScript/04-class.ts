/** 类 **/

class Greeter {
    greeting: string;
    toWho: string;

    constructor(msg: string) {
        this.greeting = this.toWho + msg;
    }

}

let greeter = new Greeter(' this is greeter....');
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
class Person {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getValue() {
        return `hello, this is ${this.name} and live in ${this.department}`;
    }
}

let howard = new Employee('Howard', 'bridge hotel');
console.log(howard.getValue()); // hello, this is Howard and live in bridge hotel
console.log(howard); // Employee { name: 'Howard', department: 'bridge hotel' }

class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 10;

    constructor(theName: string) {
        this.name = theName;
    }
}

let ken = new Octopus('the octopus has 10 strong legs');