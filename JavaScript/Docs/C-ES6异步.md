# 异步
+ 什么是单线程，和异步有什么关系
+ 什么是`event-loop`事件轮询
+ 是否用过jQuery的`Deferred`
+ `Promise`的基本使用和原理
+ `async/await`和`Promise`的区别，联系
+ 当前JS解决异步的方案

## 1. 单线程和异步
+ 单线程，只有一个线程，同一时间只能做一件事
+ 原因是避免DOM渲染的冲突
+ 解决方案是采用异步

## 2. 避免DOM渲染冲突
+ 浏览器需要渲染DOM
+ JS可以修改DOM结构
+ JS执行的时候，浏览器DOM渲染会暂停
+ 两段JS不能同时执行(同时修改DOM会冲突)
+ `webworker`支持多线程，但是不能访问DOM

## 3. 解决方案--异步
+ 异步之`setTimeout`
```javascript
console.log(100);
setTimeout(() => {
	console.log(200);
}, 1000);
console.log(300);
console.log(400);
/****
 * 100
 * 300
 * 400
 * 200
 ****/
```
+ 异步之`ajax`
```javascript
console.log(100);
$.ajax({
    url: './data.json',
    success(result) {
    	console.log(result);
    }
});
console.log(300);
console.log(400);
```

## 4. 异步的问题
+ 没有按照书写的顺序执行，可读性比较差
+ `callback`中不容易模块化

## 5. 单线程
+ 单线程就是同时只能做一件事，两句js不能同时执行
+ 原因是为了避免DOM渲染的冲突
+ 异步是一种无奈的解决方法，有很多问题