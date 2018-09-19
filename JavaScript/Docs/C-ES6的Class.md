# Class
## 1. JS构造函数
```javascript
function MathAddHandle(x, y) {
	this.x = x;
	this.y = y;
}
MathAddHandle.prototype.add = function() {
	return this.x + this.y;
}

let sum = new MathAddHandle(1, 4);
console.log(sum.add());
```
## 2. Class基本语法
```javascript
class MathAddHandle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add() {
        return this.x + this.y;
    }
}

const sum = new MathAddHandle(3, 4);
console.log(sum.add());
```
## 3. 语法糖
+ 实际上`Class`是`function`，这种写法是普通构造函数的语法糖，写法不一样，但本质是一样的
+ `typeof MathAddHandle;` "function"
+ `MathAddHandle === MathAddHandle.prototype.constructor;` true
+ `sum.__proto__ === MathAddHandle.prototype;` true

## 4. 继承
+ 普通构造函数继承
```javascript
function Animal() {
	this.eat = function () {
		console.log('animal eat');
	}
}

function Dog() {
	this.bark = function () {
		console.log('dog bark');
	}
}

Dog.prototype = new Animal();

let hashiqi = new Dog();
hashiqi.bark();
hashiqi.eat();
```
+ Class继承
```javascript
class Animal {
	constructor(name) {
		this.name = name;
	}
	
	eat() {
		console.log(`${this.name} eat`);
	}
}

class Dog extends Animal {
	constructor(name) {
		super(name);
		this.name = name;
	}
	
	say() {
		console.log(`${this.name} say`);
	}
}

const dog = new Dog('哈士奇');
dog.say();
dog.eat();
```
## 5. 问题解答
+ Class在语法上更加贴合面向对象的写法
+ Class实现继承更加易读，易理解
+ 更易于写Java等后端语言的使用
+ 本质是语法糖，使用的是`prototype`