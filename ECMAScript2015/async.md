# async 函数
## 含义
> async 函数,使得异步操作变得更加方便
```javascript
const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('./file/english');
  const f2 = yield readFile('./file/japanese');
  console.log(f1);
  console.log(f2);
};

let ken = gen();
console.log(ken.next());
console.log(ken.next());
console.log(ken.next());
console.log(ken.next());
/**
* { value: Promise { <pending> }, done: false }
* { value: Promise { <pending> }, done: false }
* undefined
* undefined
* { value: undefined, done: true }
* { value: undefined, done: true }
* */
```
> 改写成`async`函数
```javascript
const asyncReadFile = async function () {
  const f1 = yield readFile('./file/english');
  const f2 = yield readFile('./file/japanese');
  console.log(f1.toString());
  console.log(f2.toString());
};
```
> `async`函数对`Generator`函数的改进,体现在以下四点
+ 内置执行器
> `Generator`函数的执行必须靠执行器,所以才有了`co`模块,而`async`函数自带执行器.也就是说,`async`函数的执行,与普通函数一模一样,只要一行.
> 上面的代码调用了`asyncReadFile`函数,然后它就会自动执行,输出最后结果.这完全不像`Generator`函数,需要调用`next`方法,或者用`co`模块,才能真正执行,得到最后结果
+ 更好的语义
> `async`和`await`,比起星号和`yield`,语义更清楚了.`async`表示函数里有异步操作,`await`表示紧跟在后面的表达式需要等待结果.
+ 更广的适用性
> `co`模块约定,`yield`命令后面只能是`Thunk`函数或`Promise`对象,而`async`函数的`await`命令后面,可以是`Promise`对象和原始类型的值(数值、字符串和布尔值,但这时等同于同步操作)
+ 返回值是`Promise`
> `async`函数的返回值是`Promise`对象,这比`Generator`函数的返回值是`Iterator`对象方便多了.你可以用`then`方法指定下一步的操作
> `async`函数完全可以看作多个异步操作,包装成的一个`Promise`对象,而`await`命令就是内部`then`命令的语法糖

## 基本用法
> `async`函数返回一个`Promise`对象,可以使用`then`方法添加回调函数.当函数执行的时候,一旦遇到`await`就会先返回,等到异步操作完成,再接着执行函数体内后面的语句
```javascript
async function getName(name){
	const symbol = await getSymbol(name);
	const price = await getPrice(symbol);
	return price;
}

function getSymbol(symbol){
	return symbol;
}

function getPrice(name){
	return 100;
}

getName('carl').then( result => {
	console.log(result);
});
// 100
```
> 函数前面的`async`关键字,表明该函数内部有异步操作.调用该函数时,会立即返回一个`Promise`对象
```javascript
function timeout(ms){
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

async function print(value, ms){
	await timeout(ms);
	console.log(value);
}

print('async function promise', 1000);
// 1000ms后,输出
// async function promise
```
> `async`函数返回的是`Promise`对象,可以作为`await`命令的参数.
> 所以,上面的例子也可以写成下面的形式
```javascript
async function timeout(ms){
	await new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

async function print(value, ms){
	await timeout(ms);
	console.log(value);
}

print('this is an async function and return promise', 1000);
```
> `async`函数的其他使用形式

```javascript
// 函数声明
async function one() {}

// 函数表达式
const two = async function() {}

// 对象的方法
let obj = {
	async one(){}
};
obj.one().then();

// Class的方法
class Person {
	constructor() {
		this.avatar = 'avatar';
	}

	async getAvatar(name){
		const cache = await this.avatar;
		return cache.match(`/avatar/${name}.jpg`)
	}
}

const user = Person();
user.getAvatar('Mark').then();

// 箭头函数
const three = async () => {}
```
## 语法
> `async`函数的语法规则总体上比较简单,难点是错误处理机制
+ 返回`Promise`对象
> `async`函数返回一个`Promise`对象
> `async`函数内部`return`语句返回的值,成为`then`方法回调函数的参数
```javascript
async function one(name){
	return name;
}

one('Mark').then((value) => {
	console.log('value:', value);
	// value: Mark
})
```
> `async`函数内部抛出错误,会导致返回的`Promise`对象变为`reject`状态,抛出的错误对象会被`catch`方法回调函数接收到.
```javascript
async function one(name){
	if(!name){
		throw new Error('no arguments');
	}
}

one().then((value) => {
	console.log('value:', value);
}, (err) => {
	console.log(err);
});

// Error: no arguments
```
+ `Promise`对象的状态变化
> `async`函数返回的`Promise`对象,必须等到内部所有`await`命令后面的`Promise`对象执行完,才会发生状态改变,除非遇到`return`语句或者抛出错误.也就是说,只有`async`函数内部的异步操作执行完,才会执行`then`方法指定的回调函数.
```javascript
async function getTitle(url){
	let response = await fetch(url);
	let html = await response.text();
	return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://github.com/').then( value => {
	console.log(value);
});
// 目前对于fetch函数支持的不够友好
```
+ `await`命令
> 正常情况下,await命令后面是一个 Promise 对象.如果不是,会被转成一个立即resolve的 Promise 对象
```javascript
async function one(){
	return await 'async and await';
}

one().then(value => {
	console.log(value)
});
// async and await
```
> `await`命令的参数是数值`async and await`,它被转成`Promise`对象,并立即`resolve`
> `await`命令后面的`Promise`对象如果变为`reject`状态,则`reject`的参数会被`catch`方法的回调函数接收到
```javascript
async function one(){
	await Promise.reject('there are some wrong...');
}

one().then(value => {
	console.log(value);
}).catch( err => {
	console.log(err);
});
// there are some wrong...
```
> `await`语句前面没有`return`,但是`reject`方法的参数依然传入了`catch`方法的回调函数.这里如果在`await`前面加上`return`,效果是一样的
> 只要一个`await`语句后面的 Promise 变为`reject`,那么整个`async`函数都会中断执行
```javascript
async function one(){
	await Promise.reject('there are some wrong...');
	await Promise.resolve('print some thing....');
}
```
> 第二个`await`语句是不会执行的,因为第一个`await`语句状态变成了`reject`
> 我们希望即使前一个异步操作失败,也不要中断后面的异步操作.这时可以将第一个`await`放在`try...catch`结构里面,这样不管这个异步操作是否成功,第二个`await`都会执行
```javascript
async function one(){
	try{
		await Promise.reject('there are some wrong...');
	}catch(e){
		console.log(e);
	}
	return await Promise.resolve('async function await');
}

one().then(value => console.log(value));
// there are some wrong...
// async function await
```
> 另一种方法是`await`后面的`Promise`对象再跟一个`catch`方法,处理前面可能出现的错误
```javascript
async function one(){
	await Promise.reject('there are some wrong....').catch(e => {console.log(e)})	
	return await Promise.resolve('async function await');
}

one().then(value => {console.log(value)});

// there are some wrong....
// async function await
```
+ 错误处理
> 如果`await`后面的异步操作出错,那么等同于`async`函数返回的`Promise`对象被`reject`
```javascript
async function one(){
	await new Promise((resolve, reject) => {
		throw new Error('there are some wrong...');
	})
}

one().then(value => {
	console.log(value);
}).catch(err => {
	console.log(err);
});
// Error: there are some wrong...
//      at Promise (/async.js:3:9)
```
> `async`函数f执行后,`await`后面的`Promise`对象会抛出一个错误对象,导致`catch`方法的回调函数被调用,它的参数就是抛出的错误对象.具体的执行机制,可以参考后文的`async函数的实现原理`
> 防止出错的方法,也是将其放在`try...catch`代码块之中
```javascript
async function one(){
	try{
		await new Promise((resolve, reject) => {
			throw new Error('there are some wrong...');
		});
	}catch(err){
		console.log(err);
	}
	return await('async function await');
}

one();
// Error: there are some wrong...
//     at Promise (/async.js:4:10)
```
> 如果有多个`await`命令,可以统一放在`try...catch`结构中

```javascript
async function main(){
	try{
		const one = await function(){
			return 111;
		};
		const two = await function(ken){
			return ken;
		};
		const three = await function(men, gen){
			return men * gen;
		};
	}catch(err){
		console.log(err);
	}
}
main();
```
> 如果`await`操作成功,就会使用`break`语句退出循环；如果失败,会被`catch`语句捕捉,然后进入下一轮循环
