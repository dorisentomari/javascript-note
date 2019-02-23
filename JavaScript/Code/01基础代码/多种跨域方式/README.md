# 为什么浏览器不支持跨域
+ cookie，localStorage
+ DOM元素也有同源策略，例如 iframe
+ ajax 不支持跨域

# 实现跨域
1. jsonp
    + 只能发送 get 请求
    + 不安全 xss 攻击，不采用
2. cors
3. postMessage
4. document.domain，域和父域
5. window.name
6. location.hash
7. http-proxy
8. nginx
9. websocket

