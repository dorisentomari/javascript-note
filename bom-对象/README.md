# 1. 浏览器的 History 对象

## 1.1 属性

+ length，表示会话历史中元素的数目，包括当前加载的页
    + 比如我们在一个新的标签窗口打开 https://ant.design/docs/react/introduce-cn 页面，此时我们打开控制台，输入 history.length，得到的结果就是 1
    + 然后我们在这个页面，点击快速上手，在控制台再次输入 history.length，得到的结果就是 2
    + 然后我们在这个页面，点击项目实战，在控制台再次输入 history.length，得到的结果就是 3
+ scrollRestoration，允许Web应用程序在历史导航上显式地设置默认滚动恢复行为。此属性可以是自动的（auto）或者手动的（manual）
    + 默认是 auto
    + IE 和 safari 不支持该属性
+ state，只读，返回代表会话历史堆栈顶部记录的任意可序列化类型数据值，我们可以以此来区别不同会话历史纪录
    + 比如在刚才的页面里，state 的值在不断的改变 `state: {key: "cjcaoa"}`，`state: {key: "fwo7as"}`
    + 如果 pushState 的第一个参数传递了值，那么 state 的值就是所传递的值

## 1.2 方法

+ back()，返回历史记录中的上一个页面，等价于 go(-1) 或点击浏览器后退按钮
+ forward()，进入历史记录中的下一个页面，等价于 go(1) 或点击浏览器前进按钮
+ go()，加载历史记录中的某一个页面，当整数参数超出界限时或没有参数时，没有效果
+ pushState()，向历史会话堆栈顶部添加一条记录，主要有三个参数，第一个就是传送参数，第二个是页面的标题，第三个就是跳转URL
    + 示例是 history/history-router.html
+ replaceState()，更新历史会话堆栈顶部信息
+ 注意: 无论是replaceState()方法还是pushState()方法，其更新或添加会话历史记录后，改变的只是浏览器关于当前页面的标题和URL的记录情况，并不会刷新或改变页面展示。

# 2. window.history

## 2.1 popstate()

+ 每次会话记录变换激活都会在window上触发popstate事件，如果激活的会话记录是通过replaceState()更新的或使用pushState()方法创建的，popstate事件对象的state属性值就是该会话记录状态对象的一个副本。
+ 示例是 history/history-router.html

# 3. location

## 3.1 location.assign(URL)

+ 加载给定 URL 的内容资源到这个 location 对象所关联的对象上，替换当前的 URL 资源，类似于 pushState(URL)

## 3.2 location.reload()

+ 重新加载来自当前 URL 的资源，如果参数为 true，表示要从服务器获取资源，如果参数为 false，则读取本地的缓存资源
+ 不添加历史记录

## 3.3 location.replace(URL)

+ 用给定的URL替换掉当前的资源，不添加历史记录
