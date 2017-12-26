[TOC]

### DOM事件类

#### *基本概念:DOM事件级别
+ DOM0  element.onclick=function(){}
+ DOM1  在设置的时候，没有涉及到事件，但是依然存在DOM1级标准
+ DOM2  element.addEventListener("click",function(){},false)默认是false,即冒泡阶段触发
+ DOM3  element.addEVentListener("keyup",function(){},false)
    + 鼠标事件，键盘事件等

#### *DOM事件模型(冒泡与捕获)
+ 捕获：从上往下
+ 冒泡：从下往上，从元素身上到容器

#### **DOM事件流
    + 浏览器在与用户交互的过程
+ 第1阶段是捕获
+ 第2阶段是到达目标元素
+ 第3阶段是从目标元素上传到window对象，即冒泡过程

#### ***描述DOM事件捕获的具体流程(类比冒泡过程)

+ window-->document-->html标签-->body-->下边的普通的容器结构-->目标元素
+ 在js中如何获取html标签？即document.documentElement

#### ****Event对象的常见应用

+ event.preventDefault();阻止默认行为
+ event.stopPropagation();阻止冒泡行为
+ event.stopImmediatePropagation();事件响应优先级，对统一元素注册两个事件，可以通过第一个事件，采用这个方法，阻止第二个事件
+ event.currentTarget;事件委托代理，把子元素都代理给父元素，获取当前的目标元素，早期IE不支持，IE采用的是sourceElement
+ event.target 指的就是上边的那个父元素

#### ****自定义事件(custome,CustomEvent())
```javascript
    var eve = new Event("custome");
    ev.addEventListener("custome",function(){
        console.log("custome");    
    });
    ev.dispatchEvent(eve);//dispatch触发这个事件.
    // 也可以使用CustomEvent
```