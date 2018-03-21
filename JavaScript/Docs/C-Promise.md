# Promise
+ 基本语法回顾
+ 异常捕获(Error和reject都要考虑)
+ 多个串联(链式执行)
+ Promise.all和Promise.race
+ Promise的标准(状态变化，then函数)

## 1. Promise语法回顾
```javascript
function loadImg(src) {
    const promise = new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function () {
            reject();
        };
        img.src = src;
    });
    return promise;
}

const src = 'https://cn.vuejs.org/images/logo.png';
let result = loadImg(src);
result.then(function (img) {
    console.log(img.width);
    return img;
}, function () {
    console.log('img.width failed');
}).then(function (img) {
    console.log(img.height);
}, function () {
    console.log('img.height failed');
});
```

## 2. 异常捕获
+ 规定： then只能接受一个参数，最后统一用catch捕获异常
+ `loadImg`函数不变
```javascript
const src = 'https://cn.vuejs.org/images/logo1.png';
let result = loadImg(src);
result.then(function (img) {
    console.log(img.width);
    return img;
}).then(function (img) {
    console.log(img.height);
}).catch(function (err) {
    console.error(err);
});
```

## 3. 多个串联
+ `loadImg`函数不变
```javascript
let src1 = 'https://cn.vuejs.org/images/logo.png';
let result1 = loadImg(src1);
let src2 = 'https://www.baidu.com/img/bd_logo1.png';
let result2 = loadImg(src2);
let src3 = 'https://www.imooc.com/static/img/index/logo.png';
let result3 = loadImg(src3);
result1.then(function (img) {
    console.log('第一个图片加载完成');
    console.log(img);
    return result2;
}).then(function (img) {
    console.log('第二个图片加载完成');
    console.log(img);
    return result3;
}).then(function (img) {
    console.log('第三个图片加载完成');
    console.log(img);
}).catch(function (error) {
    console.error(error);
});
```

## 4. Promise.all & Promise.race
+ `loadImg`函数不变
```javascript
let src1 = 'https://cn.vuejs.org/images/logo.png';
let result1 = loadImg(src1);
let src2 = 'https://www.baidu.com/img/bd_logo1.png';
let result2 = loadImg(src2);
let src3 = 'https://www.imooc.com/static/img/index/logo.png';
let result3 = loadImg(src3);
Promise.all([result1, result2, result3]).then(function (datas) {
    console.log('Promise.all');
    console.log(datas[0]);
    console.log('Promise.all');
    console.log(datas[1]);
    console.log('Promise.all');
    console.log(datas[2]);
});

Promise.race([result1, result2, result3]).then(function (data) {
    console.log('Promise.race');
    console.log(data);
});
```

## 5. 标准
+ 任何技术推广使用都需要一套标准来支撑
+ 任何不符合标准的东西，终将会被用户抛弃
+ 不要挑战标准，不要自造标准

## 6. Promise标准 - 状态变化
+ 三种状态：pending, fulfilled, rejected
+ 初始状态是pending
+ pending变为fulfilled，或者pending变为rejected

## 7. Promise标准 - then
+ Promise实例必须实现then这个方法
+ then()必须可以接收两个函数作为参数
+ then()返回的必须是一个Promise实例