[TOC]

###CSS盒模型

#### *对盒模型的理解
+ 基本概念：标准模型 + IE模型
    + 标准模型：
        + 宽度和高度只有content的内容，不包括padding和border;
        + Width = contentWidth 
        + Height = contentHeight
        
    + IE模型
        + 宽度和高度包括content + padding + border
        + Width = borderLeft + paddingLeft + contentWidth + paddingRight + borderRight
        + Height = borderTop + paddingTop + contentHeight + paddingBottom + borderBottom

#### *标准模型和IE模型的区别
+ 计算宽度和高度的不同
+ 高度和宽度具体是如何计算的

#### **CSS如何设置这两种模型
+ box-sizing:content-box;标准模型(浏览器默认)
+ box-sizing:border-box;IE模型

+ box-sizing:content-box;
    + **content宽度是:100px;**
    + 举例：<\section id="box-sizing"><\/section>
    + width:100px;
    + height:100px;
    + padding:10px;
    + border:2px solid blue;(如果不设置颜色与样式，只设置宽度，那么宽度是不显示的。)
    + margin:20px; 
    + background-color: orange;

+ box-sizeing:border-box;
    + **content宽度是:76px;**
    + 举例：<\section id="border-sizing"><\/section>
    + width:100px;
    + height:100px;
    + padding:10px;
    + border:2px solid blue;(如果不设置颜色与样式，只设置宽度，那么宽度是不显示的。)
    + margin:20px; 
    + background-color: orange;


#### ***JS如何设置获取盒模型对应的宽度和高度

+ element.style.width/height
    + 局限性
    + 不能取到所有的宽度和高度
    + 只能取内联样式的宽和高
+ element.currentStyle.width/height
    + 得到的是渲染后的宽高
    + 只有IE支持
+ window.getComputedStyle(element).width/height
    + 得到的是渲染后的宽高
    + chrome和firefox浏览器支持
+ element.getBoundingClientRect().width/height
    + 能够拿到元素及时的宽和高
    + 场合：计算元素的绝对位置，根据是浏览器的视窗，得到的是top,left,bottom,right四个值

#### ****实例题(根据盒模型解释边距重叠)
    + 块级元素，内嵌一个块级元素
    + 子元素的高度是100px
    + 子元素与父元素的上边距是10px
    + 计算父元素的实际高度

+ 父元素的高度是100px，或者是110px
    + overflow:hidden;
    + 兄弟元素边距重叠

#### ****BFC(边距重叠解决方案)，还有一个IFC(内联元素格式化上下文)

+ 基本概念：快速解决边距重叠问题，块级格式化上下文。

+ BFC的原理，即渲染规则
    + BFC元素的垂直方向的边距发生重叠
    + BFC的区域不会与浮动元素的box重叠，清除浮动
    + BFC在页面上是一个独立的容器，外边的元素不会和内部元素互相影响
    + 计算BFC高度，浮动元素也会参与计算。

+ 如何创建BFC？
    + float不为none;只要设置了浮动，就创建了一个BFC。
    + position的值不为static或者relative，就创建了BFC。
    + display属性是与table相关的。
    + overflow不为visiablity，也可以创建BFC。