# 1. 性能优化
+ 优化高频率事件: onscroll，oninput，resize，onkeyup，keydown... 降低代码执行频率

# 2. 网页展示过程
+ JavaScript -> Style -> Layout -> Paint -> Composite
+ JavaScript 动画，往页面里添加一些 DOM 元素
+ Style 确定每个 DOM 应该用什么样式规则
+ Layout 布局，计算最终显示的位置和大小
+ Paint 绘制 DOM，在不同的层上绘制
+ Composite 渲染层合并 
+ 用户 scroll 和 resize 行为会导致页面不断的重新渲染，如果在绑定的回调函数中大量操作 DOM 会出现页面卡顿

# 3. 优化方案
+ throttle 节流，记录函数执行时的时间戳
+ debounce 防抖，记录每次点击的时间戳

## 3.1 函数节流
+ 节流就是保证一段时间内，核心代码只执行一次
+ 举例: 1 秒内的所有点击，都算做 1 次

## 3.2 防抖
+ 防抖就是一段时间结束后，才能触发一次事件，如果一段时间未结束再次触发事件，就会重新开始计算时间

# 4. requestAnimationFrame
+ 编写动画循环的关键是要知道延迟时间多久合适，如果时间过长会导致动画不流畅，时间过短会造成过度的绘制。requestAnimationFrame 采用系统时间间隔，保持最佳绘制效率
+ 这个方法是用来在页面重绘之前，通知浏览器调用一个指定的函数，被调用的频率约每秒 60 次，在运行时浏览器会自动优化方法的调用


