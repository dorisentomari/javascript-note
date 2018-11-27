[TOC]

# 事件
# 1. 题目
+ 编写一个通用的事件监听函数
    + 通用事件绑定
+ 描述事件冒泡流程
    + DOM树形结构
    + 事件冒泡
    + 阻止冒泡(preventDefault())
    + 冒泡的应用
+ 对于一个无限下拉加载图片的页面,如何给每一个图片添加事件
    + 使用代理
    + 知道代理的两个优点

# 2. 知识点
+ 通用事件绑定
+ 事件冒泡
+ 代理

# 3. 通用事件绑定
+ addEventListener第三个参数为true，表示在捕获阶段触发
+ addEventListener第三个参数为false，表示在冒泡阶段触发，默认值

```javascript
var btn = document.getElementById("btn");
btn.addEventListener('click', function (event) {
  console.log("clicked");
});

function bindEvent(elem, type, fn) {
  elem.addEventListener(type, fn)
}

var a = document.getElementById("link");
bindEvent(a, "click", function (e) {
  e.preventDefault();//阻止默认行为
  console.log("clicked")
});
```

# 4. 关于IE低版本的兼容性问题

+ IE低版本使用`attachEvent`绑定事件,和W3C标准不一样。
+ IE低版本使用量非常少,很多网站都已经不支持了。
+ 建议对IE低版本的兼容性:了解即可,无需深究。

# 5. 事件冒泡
```html
<body>
    <div id="div1">
        <p id="p1">激活</p>
        <p id="p2">取消</p>
        <p id="p3">取消</p>
        <p id="p4">取消</p>
    </div>
    <div id="div2">
        <p id="p5">取消</p>
        <p id="p6">取消</p>
    </div>
</body>
```

```javascript
var p1 = document.getElementById("P1");
var body = document.body;
bindEvent(p1, 'click', function (e) {
  e.stopPropagation();
  console.log("激活");
});
bindEvent(body, 'click', function (e) {
  console.log("取消");
});
```

# 6. 代理
```html 
<div id="div1">
    <a href="#">a1</a>
    <a href="#">a2</a>
    <a href="#">a3</a>
    <a href="#">a4</a>
</div>
```

```javascript
var div1 = document.getElementById("div1");
div1.addEventListener("click", function () {
  var target = e.target;
  if (target.nodeName === "A") {
    alert(target.innerHTML);
  }
});
```

# 7. 完善通过绑定事件的函数
+ 给elem元素绑定事件，但是代理到selector元素上
```javascript
function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector;
    selector = null;
  }
  elem.addEventListener(type, function (e) {
    var target;
    if (selector) {
      target = e.target;
      if (target.matches(selector)) {
        fn.call(target, e)
      }
    } else {
      fn(e)
    }
  })
}

//使用代理，传四个值
var div1 = document.getElementById("div1");
bindEvent(div1, "click", 'a', function (e) {
  console.log(this.innerHTML)
});

//不使用代理，传三个值
var a = document.getElementById("a1");
bindEvent(div1, "click", function (e) {
  console.log(a.innerHTML);
});
```

# 8. 代理的好处
+ 代码简洁
+ 减少浏览器的内存占用
