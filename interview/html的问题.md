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
