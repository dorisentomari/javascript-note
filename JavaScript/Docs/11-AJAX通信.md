[TOC]

### AJAX

#### 题目
+ 手动编写一个`AJAX`,不依赖第三方库
+ 跨域的几种实现方式
    + `JSONP`
    + 服务器端设置`http`和`header`

#### 知识点
+ `XMLHttpRequest`
+ 状态码说明
+ 跨域

#### XMLHttpRequest
```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET", "/data", false);
xhr.onreadystatechange = function () {
  //这里的函数是异步执行
  if (xhr.readyState == 4) {
    if (xhr.status === 200) {
      alert(xhr.responseText);
    }
  }
};
xhr.send(null);
```

#### IE兼容性问题

+ IE低版本使用`ActiveXObject`

#### `readyState`状态码说明

+ `0`-(未初始化)还没有调用`send()`方法
+ `1`-(载入)已调用`send()`方法,正在发送请求
+ `2`-(载入完成)`send()`方法执行完成,已经接收到全部相应内容
+ `3`-(交互)正在解析相应内容
+ `4`-(完成)相应内容解析完成,可以在客户端调用了

#### status

+ `2xx`-表示成功处理请求,如200
+ `3xx`-表示需要重定向,浏览器直接跳转
+ `4xx`-表示客户端请求错误,如404
+ `5xx`-服务器端错误

#### 跨域
+ 什么是跨域？
    + 浏览器有同源策略,不允许ajax访问其他域的接口
    + 跨域条件:协议,域名,端口,只要有一个不同就算跨域

+ 可以跨域的三个标签
    + `img`标签`<img src="xxxx"/>`
        + 用于打点统计，统计网站可能是其他域
        + 老标签，兼容任何浏览器
    + `link`标签`<link href="xxx">`
        + `link`和`script`可以使用CDN,CDN的网站也是其他域
    + `script`标签`<script src="xxx">`
        + `script`可以用于`JSONP`

+ 跨域注意使用
    + 所有的跨域都必须经过信息提供方的允许
    + 如果未经允许即可获取，那是浏览器同源策略出现漏洞

+ `JSONP`实现原理
    + 加载`http://xxxx.com/xxx.html`
    + 服务器不一定真正有一个`xxx.html`文件
    + 服务器可以根据请求，动态生成一个文件，返回
    + 同理`script`标签的`src`属性

```html
<script>
window.callback=function(data) {
	console.log(data);
}
</script>
<script src="http://192.168.0.116:8080/data.js"></script>

```

+ 服务器端设置 `http`和`header`
    + 另外一个解决跨域的简洁方法，需要服务器端来做
    + 但是作为交互方，我们必须回到这个方法
    + 未来的发展趋势