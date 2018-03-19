/***
 * 构造函数
 */

function MathAddHandle(x, y) {
	this.x = x;
	this.y = y;
}

MathAddHandle.prototype.add = function () {
	return this.x + this.y;
}

let sum = new MathAddHandle(1, 4);
console.log(sum);
console.log(sum.add());

/****
 * 继承
 */

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