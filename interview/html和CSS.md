# 1. 页面导入样式时，使用 `link` 和 `@import` 有什么区别？

+ 参考链接: [link和@import的区别](https://www.cnblogs.com/my--sunshine/p/6872224.html)

## 1.1 结论
+ 建议使用 `link` 标签，慎用 `@import` 方式
+ 可以避免考虑 `@import` 的语法规则和注意事项，避免产生资源文件下载顺序混乱和 http 请求过多的烦恼

## 2.2 区别
+ **从属关系**， `@import` 是 CSS 提供的语法规则，只有导入样式表的作用， `link` 是 HTML 提供的标签，不仅可以加载 CSS，还可以定义 RSS、rel 等属性
+ **加载顺序**，加载页面时，`link` 标签引入的 CSS 被同时加载。`@import` 引入的 CSS 样式在页面加载完毕后被加载。
+ **兼容性**，`link` 标签是 HTML 元素，不存在兼容性问题。`@import` 是 CSS2.1 才有的语法，只有在 IE5+ 才能识别。
+ **DOM可控性**，`link` 标签可以通过 JS 操作 DOM，通过插入 `link` 标签改变样式。无法使用 `@import` 的方式改变样式。
+ **权重**，`link` 引入的样式权重大于 `@import` 引入的样式。

# 2. 在页面上隐藏元素的方法有哪些？
+ 利用 display
  + `display: none;` 页面不会渲染，可以减少首屏渲染的时间，但是会引起回流和重绘。
  + `visibility: hidden;` 页面会渲染只是不显示。
  + `opacity: 0;` 看不见，但是会占据空间，会引起重绘。
+ 利用 position （absolute 的情况下）
  + `left/right/top/bottom: 9999px/-9999px` 让元素在视区外
  + `z-index: -9999` 放到最底层，同一位置可以让其他元素把这个给遮掉

# 3. 使用 CSS 绘制三角形
+ 参考链接: [CSS绘制三角形—border法](https://www.jianshu.com/p/9a463d50e441)

```css
.rect {
  width: 0;
  height: 0;
  margin: 100px auto;
  border-top: 50px solid transparent;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 50px solid red;
}
```

# 4. BFC 规范的理解
+ BFC 全称块级格式化上下文(Block Formatting Context)，对应的还有 IFC。BFC 类似一个结界，如果一个 DOM 元素具有 BFC，那么它内部的子元素不会影响外面的元素；外面的元素也不会影响到其内部元素。
+ 特性:
  + 计算BFC的高度时，浮动子元素也参与计算
  + BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
  + BFC的区域不会与 float 的元素区域重叠
+ 触发 BFC 的条件：
  + `<html>` 根元素
  + float 不为 none
  + overflow 为 auto，scroll，hidden
  + display 的值为 table-cell，table-caption，inline-block 中任何一个
  + position 的值不为 static 和 relative
+ 应用场景
  + 解决浮动子元素导致父元素，高度坍塌的问题。
  + 解决文字环绕在 float 四周的情况。
  + 解决边距重叠问题 （父子，兄弟，空元素等）。
  + 最常见的例子就是清除 float 的 overflow: hidden; 属性。overflow: hidden; 会触发元素的 BFC，因此其内部的 float 元素不会影响到外部元素的布局。

# 5. 清除浮动
+ 浮动带来的问题是盒子塌陷问题

## 5.1 什么是盒子塌陷

外部盒子本来是应该包裹住内部的浮动盒子，结果却没有。

## 5.2 盒子塌陷出现的原因

父元素只包含浮动元素，那么它的高度就会塔缩为 0，（前提是没有设置高度 height 或者 height 设置为 auto）就会出现这种情况。如果父元素不包含任何的可见背景，这个问题就会很难被注意到。因为子元素设置了 float 
属性，而 float 属性会把元素都标准文档流中抽离，结果就是外部盒子丢了两个盒子，因为内部没有其他的盒子，所以外部盒子只包裹了文本节点内容，却把两个内部盒子丢在外面。

# 6. px, em, rem, %, vw, vh 的区别
## 6.1 介绍
+ px 是一个绝对固定的值，无论页面放大或缩小都不会发生改变
+ em 参考物是父元素的 font-size，如果自身定义了 font-size，那么就按照自身的大小来计算。
+ rem 是相对于根元素 html 页面的 font-size，浏览器页面默认是 16px
+ % 宽泛的讲就是相对于父元素，但是并不是十分准确
    + 对于普通定位元素，就是普通的父元素
    + 对于 position: absolute; 的元素，就是相对于已经定位的父元素
    + 对于 position: fixed; 的元素是相对于 ViewPort 视窗
+ vw 是 viewport width 的缩写，1vw 等于视窗宽度的 1%
+ vh 是 viewport height的缩写，1vh 等于视窗高度的 1%

## 6.2 问题
+ 为什么一开始在 CSS 样式中给 body 设置 font-size: 62.5%?

font-size 为 62.5% ，也就是 16px * 62.5% = 10px，这样 1em = 10px，1.2em = 12px，有利于我们进行换算。

+ 谷歌浏览器运行以下代码，1em 显示多大的字体?

```css
body {
    width: 62.5%;
}

p {
    font-size: 1em;
}
```

谷歌浏览器强制最小字体为 12px，即使设置成 10px 最终都会显示成 12px，当把 html 的 font-size 设置成 10px，子节点 rem 的计算还是以 12 px 为基准。

# 7. viewport常见设置都有哪些？
## 7.1 viewport 简介
viewport 的意思是视窗，放在 PC 上，就是显示器显示网页大小的区域，手机端就是手机屏幕显示网页大小的区域。视窗区域实际上是跟网页显示内容大小没关系的，比如视窗宽度为 1000px，但是网页内容是可以为 2000px 或 500px，也可以是 1000px，但是我们为了让视窗区域能够更友好的显示内容，所以需要考虑视窗。

一般来说，视窗区域和显示网页的区域，在 PC 上不需要多考虑，一般显示器像素宽度都大于 1300px，而 PC 网页设计的宽度也会在 1000px 左右，所以视窗问题在 PC 上不明显。但是在手机上，就会有很大的问题，一般在手机上，视窗的区域都是要大于浏览器可视区域，因为手机上的分辨率太小，所以手机浏览器为了能够显示页面，就会自动把视窗的区域调整为默认的 980px 或者 1024px，结果就是出现了横条滚动。

## 7.2 DPR(device pixel ratio)
一般我们都会认为 css 中的 1px，对应的就是显示器屏幕的物理像素 1px，在 PC 上，我们可以这么理解。但是在手机上，不能这么理解，因为不同手机屏幕的物理像素不一样。

DPR 就是设备物理像素和独立像素的比例。设备物理像素就是手机的物理像素，独立像素就是 CSS 样式的像素，如果一款手机的 DPR 是 1，那么设备物理像素和独立像素的比例就是1，也就是说，1px 的设备物理像素，等于 1px 的独立像素。如果一款手机的 DPR 是 2，那么设备物理像素和独立像素的比例就是2，也就是说，2px 的设备物理像素，等于 1px 的独立像素。在苹果的 Retina 屏上，DPR 就是 2。所以为了对移动端屏幕更友好的适配，我们需要设置 viewport。

## 7.3 设置 viewport

通过 meta 标签进行设置 `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>`

具体配置的含义就是表格中的介绍

| 属性名 |	取值 | 描述 |
|------|-------|-------|
| width |	正整数 | device-width	定义视口的宽度，单位为像素 |
| height |	正整数 | device-height	定义视口的高度，单位为像素，一般不用 |
| initial-scale |	[0.0-10.0] |	定义初始缩放值 |
| minimum-scale |	[0.0-10.0] |	定义缩小最小比例，它必须小于或等于maximum-scale设置 |
| maximum-scale |	[0.0-10.0] |	定义放大最大比例，它必须大于或等于minimum-scale设置 |
| user-scalable |	yes | no	定义是否允许用户手动缩放页面，默认值yes |

# 8. 常见的布局方式
+ 流式布局：最基本的布局
+ 绝对定位：利用 position: absolute; 进行绝对定位的布局
+ float 布局：解决多栏布局问题
+ 栅格布局：Bootstrap 的布局
+ flex 布局：弹性布局
+ grid 布局：网格布局


