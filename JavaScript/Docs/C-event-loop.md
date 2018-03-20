# event loop 事件轮询
+ 事件轮询，JS实现异步的具体解决方案
+ 同步代码，直接执行
+ 异步函数先放在异步队列中
+ 待同步函数执行完毕，轮询执行异步队列的函数

## 1. 事件轮询示例
+ 顺序setTimeout
```javascript
setTimeout(() => {
    console.log(1);
}, 100);

setTimeout(() => {
    console.log(2);
}, 100);

setTimeout(() => {
    console.log(3);
});

console.log(4);
/***
 * 4
 * 3
 * 1
 * 2
 */
```
+ 嵌套setTimeout
```javascript
setTimeout(() => {
    console.log(1);
    setTimeout(() => {
        console.log(2);
    });
    console.log(3);
});

console.log(4);

/****
 * 4
 * 1
 * 3
 * 2
 */
```
+ ajax
一般来讲，ajax的反应速度是在几百毫秒，输出的结果应该在300之后，但是由于是本地文件，本地资源加载速度快，所以会在300之前输出。
```javascript
$(function () {
    console.log(100);
    $.ajax({
        url: './data.json',
        success(result) {
            console.log(200);
            console.log(result);
        }
    });
    
    setTimeout(() => {
        console.log(300);
    }, 100);
    
    setTimeout(() => {
        console.log(400);
    });
    
    console.log(500);
});
/****
 * 100
 * 500
 * 200
 * result
 * 400
 * 300
 */
```
