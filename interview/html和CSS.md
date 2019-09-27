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
+ 利用 dispaly
  + `disaplay: none;` 页面不会渲染，可以减少首屏渲染的时间，但是会引起回流和重绘。
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
  + BFC的区域不会与 `float` 的元素区域重叠
+ 触发 BFC 的条件：
  + `<html>` 根元素
  + `float` 不为 `none`
  + `overflow` 为 `auto`，`scroll`，`hidden`
  + `display` 的值为 `table-cell`，`table-caption`，`inline-block` 中任何一个
  + `position` 的值不为 `static` 和 `relative`
+ 应用场景
  + 解决浮动子元素导致父元素，高度坍塌的问题。
  + 解决文字环绕在 `float` 四周的情况。
  + 解决边距重叠问题 （父子，兄弟，空元素等）。
  + 最常见的例子就是清除 `float` 的 `overflow: hidden;` 属性。`overflow: hidden;` 会触发元素的 BFC，因此其内部的 `float` 元素不会影响到外部元素的布局。
