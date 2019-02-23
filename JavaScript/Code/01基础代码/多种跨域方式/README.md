# 为什么浏览器不支持跨域
+ cookie，localStorage
+ DOM元素也有同源策略，例如 iframe
+ ajax 不支持跨域

# 实现跨域
1. jsonp
    + 只能发送 get 请求
    + 不安全 xss 攻击，不采用
2. cors
	+ 后端负责管理
3. postMessage
	+ iframe 页面发送信息
4. window.name
5. location.hash
6. document.domain，域和父域
7. websocket
8. nginx
9. http-proxy
