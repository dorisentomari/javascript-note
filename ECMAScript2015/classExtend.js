// ES6的继承机制，先创造父类的实例对象this，所以必须先调用super方法，然后再用子类的构造函数修改this
// constructor方法和toString方法之中，都出现了super关键字，它在这里表示父类的构造函数，用来新建父类的this对象
// 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;// 放在super之后
    }
    
    toString() {
        return this.color + ' ' + super.toString();
    }
}

let cp = new ColorPoint(6, 8, 'orange');
console.log(cp instanceof ColorPoint); //  true
console.log(cp instanceof Point); //  true

/** Object.getPrototypeOf() **/
console.log(Object.getPrototypeOf(ColorPoint) === Point); //  true

/** super关键字 **/
// 可以当做函数使用，也可以当做对象使用，但是用法完全不同
// 当做函数调用，代表父类的构造函数，ES6要求，子类的构造函数必须执行一次super函数
class AAA {
    constructor() {
        console.log(new.target.name);
    }
}

class BBB extends AAA {
    constructor() {
        super();
    }
}

// super虽然代表了父类A的构造函数，但是返回的是子类B的实例
// 也就是说，super内部的this指的是B
// 所以super()相当于 AAA.prototype.constructor.call(this)

// 子类DDD当中的super.use(),就是将super当做一个对象使用
// 这时，super在普通方法之中，指向CCC.prototype
// 所以，super.use()就相当于CCC.prototype.use()
// 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，无法通过super调用
class CCC {
    constructor() {
        this.use = 'constructor use...';
    }
    
    /****
     use() {
        return 'use';
    }
     *****/
}

class DDD extends CCC {
    /*****
     constructor() {
        super();
        console.log(super.use());
    }
     ****/
    get men() {
        return super.use;
    }
}

let ddd = new DDD(); // use
console.log(ddd.men);// use
console.log(ddd.men);// undefined
// use 是CCC实例的属性，super.use引用不到它

console.log('======line=====');

// 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象
// super在静态方法之中指向父类，在普通方法之中指向父类的原型对象
// 使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错
class EEE extends Object {
    static use(msg) {
        console.log('static', msg);
    }
    
    use(msg) {
        console.log('instance', msg);
    }
}

class FFF extends EEE {
    static use(msg) {
        super.use(msg);
    }
    
    use(msg) {
        super.use(msg);
    }
}

FFF.use('nice'); // static nice
let fff = new FFF();
fff.use('good'); // instance good
console.log(FFF.prototype.__proto__ === EEE.prototype); // true
/** 类的 prototype 属性和__proto__属性 **/
// Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链
// 1. 子类的__proto__属性，表示构造函数的继承，总是指向父类
// 2. 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性

// FFF的实例继承EEE的实例
Object.setPrototypeOf(FFF.prototype, EEE.prototype);
// FFF的实例继承EEE的静态属性
Object.setPrototypeOf(FFF, EEE);

// 作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例

/** extends的继承目标 **/
// 1. 子类继承Object类
console.log(EEE.__proto__ === Object); // true

// 2. 不存在任何继承
class GGG {

}

console.log(GGG.__proto__ === Function.prototype);  // true
console.log(GGG.prototype.__proto__ === Object.prototype);  // true

// 3.子类继承null
class HHH extends null {
}

console.log(HHH.__proto__ === Function.prototype); // true
console.log(HHH.prototype.__proto__ === undefined); // true

/** Mixin模式**/
// Mixin指的是多个对象合并成一个新的对象，新独享具有各个组成成员的接口。
let usernameO = {
    username: 'Mark'
};

let ageO = {
    age: 18
};

let flagO = {
    flag: true
};
let Mark = {usernameO, ageO, flagO};
console.log(Mark);

/***
 * { usernameO: { username: 'Mark' },
 * ageO: { age: 18 },
 * flagO: { flag: true } }
 */