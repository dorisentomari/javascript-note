# Promise的基本使用
# 1. 回调地狱(Callback Hell)
```javascript
function loadImg(src, callback, fail) {
	let img = document.createElement('img');
	img.onload = function() {
	    callback(img);
	}
	img.onerror = function() {
	    fail();
	}
	img.src = src;
}
const src = 'https://www.baidu.com/img/bd_logo1.png';
loadImg(src, function(img) {
	console.log(img.width);
}, function() {
	console.log('failed');
});
```
# 2. `Promise`语法改造
```javascript
function loadImg(src) {
	const promise = new Promise(function(resolve, reject) {
		let img = document.createElement('img');
		img.onload = function () {
			resolve(img);
		};
		img.onerror = function () {
			reject(img);
		};
		img.src = src;
	});
    return promise;
}
const src = 'https://www.baidu.com/img/bd_logo1.png';
let result = loadImg(src);
result.then(img => {
	console.log(img.width);
}, () => {
    console.log('failed');	
});
result.then(img => {
	console.log(img.height);
});
```
# 3. 问题解答
+ `new Promise`实例，而且要`return`
+ `new Promise`时要传入函数，函数要有`resolve`和`reject`两个参数
+ 成功时执行`resolve()`，失败时执行`reject()`
+ `then`监听结果