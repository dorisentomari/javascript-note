[TOC]

### 通信类

#### 什么是同源策略及限制
+ 参考：http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html
+ 同源策略限制是从一个源加载的文档或脚本如何与来自另外一个源的资源进行交互。
这是一个用于隔离潜在的恶意文件的关键的安全机制
    + 源：协议，域名，端口。默认端口是80。
    + 限制：不是源的文档没有权利访问
    -----------------
    + Cookie,LocalStorage,IndexDB无法读取
    + DOM无法获得
    + AJAX请求不能发送(只适合同源请求资源)

#### 前后端如何通信(对前端与后端通信的了解，主动学习)
+ AJAX(要求：必须同源)
+ WebSocket(不受同源策略的限制)
+ CORS(支持跨域通信，也支持同源通信)

#### 如何创建AJAX?
+ XMLHttpRequest对象的工作流程
+ 兼容性处理
+ 事件的触发条件
+ 事件的触发顺序
```javascript
    var xhr;
    if(window.XMLHttpRequest){
        xhr=new window.XMLHttpRequest;
    }else{
        xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4 && xhr.status===200){
            console.log(responseText);
        }
    }
    //GET
    xhr.open("GET","./data.json",true);
    xhr.send();
    //POST
    xhr.open("POST","./data.json",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send(data);

```

#### 跨域通信的几种方式?
##### JSONP
+ 原理:
    + 在HTML页面中利用script标签的异步加载实现
+ 如何实现：
    + 在标签中，利用src属性传递链接的地址，eg: http://www.abc.com/data=name&callback=jsonp
    + 服务器在HTML页面内返回一个script标签，里边的内容是，data为传递的参数，callback为回调函数
    + 在HTML页面内，需要有一个jsonp的全局函数，才能接受传递回来的值
    + 监听脚本的加载时间，判断onload是否成功
    + 最后删除函数或变量
```javascript
    jsonp({
        data:{}    
    })
```
        
##### Hash
+ "#"改变，页面不刷新，所以可以做跨域通信
+ ?查询后面的内容改变，页面刷新，不可以做跨域通信
    + 利用hash，场景是当前页面A通过iframe或frame嵌入了跨域的页面B
    + 先拿到B的地址，在B的地址栏添加#并且加入数据。
```javascript
    //在A中的伪代码如下
    var B=document.getElementByTagName("iframe");
    B.src=B.src+"#"+ "data";
    //在B中的伪代码如下
    window.onhashchange=function(){
        var data=window.location.hash;//得到的结果需要特殊处理
    }
```
    
##### postMessage
+ HTML5中的新方式
```javascript
    //窗口A(http:A.com)向跨域的窗口B(http://B.com)发送信息
    Bwindow.postMessage("data","http://B.com")
    //这里的第二个参数就是第一个源，可以为url地址，也可以为*，
    //为了安全，一般都用url地址
    //在窗口B中监听
    Awindow.addEventListener("message",function(event){
        console.log(event.origin);//http://A.com
        console.log(event.source);//Bwindow
        console.log(event.data);//data
    },false)
```

##### WebSocket
+ 参考:http://www.ruanyifeng.com/blog/2017/05/websocket.html
+ 不受同源策略的限制    
```javascript 
    var ws=new WebSocket("wss://echo.websorket.org");

    ws.onopen=function(event){
        console.log("Connection open...");
        ws.send("Hello WebSocket!");
    }

    ws.onmessage=function(event){
        console.log("Received Message:"+ event.data);
        ws.close();
    }

    ws.onclose=function(event){
        console.log("Connection closed!");
    }

```

##### CORS
+ 参考:http://www.ruanyifeng.com/blog/2016/04/cors.html
+ 可以理解为跨域通信的AJAX
```javascript
    //url(必须),options(可选)
    fetch("some/url",{
        method:"get"    
    }).then(function(response){

    },function(error){

    })
```