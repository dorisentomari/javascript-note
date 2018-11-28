# 1. async/await
+ then只是将callback拆分了
+ async/await是最直接的同步写法

# 2. promise的写法
```javascript
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

# 3. async/await写法
```javascript
let src1 = 'https://cn.vuejs.org/images/logo.png';
let src2 = 'https://www.baidu.com/img/bd_logo1.png';
let src3 = 'https://www.imooc.com/static/img/index/logo.png';
const load = async function () {
    const result1 = await loadImg(src1);
    console.log('result1');
    console.log(result1);
    const result2 = await loadImg(src2);
    console.log('result2');
    console.log(result2);
    const result3 = await loadImg(src3);
    console.log('result3');
    console.log(result3);
};
load();
```

# 4. 用法
+ 使用await，函数必须用async标识
+ await后面跟的是一个Promise对象
+ 可以使用babel编译

# 5. 问题解答
+ 基本语法使用
+ async/await使用了Promise，但是不和Promise冲突
+ 完全是同步的写法，再也没有回调函数
+ 没有取代Promise
+ 任何写法的改变，都改变不了JS单线程，异步的本质