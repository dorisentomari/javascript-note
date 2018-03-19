/***
 * 构造函数
 */

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

/****
 * 继承
 */
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