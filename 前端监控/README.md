# 1. 监控分类
+ 性能监控
+ 数据监控
+ 异常监控

# 2. 为什么需要前端监控
+ 获取用户行为以及跟踪产品在用户端的使用情况，并以监控数据为基础，指明产品优化的方向。

# 3. 前端性能监控和错误监控
+ 前端衡量性能的指标(时间监控)，实际上就是计算时间差
	+ Resource timing Performance API
![浏览器加载顺序](./images/performance.png)

+ 前端资源监控
	+ performance.getEntriesByType('resource');
+ ajax 请求监控
	+ 拦截 open 和 send 方法
+ 前端代码异常
	+ window.onerror
+ 监控用户的行为
