# 1. PWA
+ webapp 用户体验差，不能离线访问，用户粘性低，pwa 就是为了解决这一系列的问题(Progressive Web Apps)，让 webapp 具有快速可靠安全等特点
+ pwa 一系列用到的技术
	+ Web App Manifest
	+ service worker
	+ push api & notification api
	+ app shell & app skeleton

# 2. Web App Manifest
+ 将网站添加到桌面，类似 native 的体验

```html
<link rel="manifest" href="/manifest.json">
{
  // 应用名称
  "name": "珠峰课堂",
  // 桌面应用的名称
  "short_name": "课堂",
  // fullScreen(standalone) miniamal-ui browser
  "display": "standalone",
  // 打开时的网址
  "start_url": "",
  // 设置桌面图片 icon 图标，修改图标需要重新添加到桌面icons: [{src, sizes, type}]
  "icons": [],
  // 启用画面颜色
  "background_color": "#aaa",
  // 状态栏的颜色
  "theme_color": "#aaa"
}
```

+ iso meta/link 私有属性设置

```
图标 icon
<link ref="apple-touch-icon" href="apple-touch-icon-iphone.png" />
添加到主屏后的标题，和 short_name 一致
<meta name="apple-mobile-web-app-title" content="标题" />
隐藏 safari 地址栏，standalone 模式下默认隐藏
<meta name="apple-mobile-web-app-capable" content="yes" />
设置状态栏颜色
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

# 3. service worker
+ 为了提升用户体验
+ 特点
	+ 不能访问/操作 DOM
	+ 会自动休眠，不会随浏览器关闭所失效(必须手动卸载)
	+ 离线缓存内容开发者可控
	+ 必须在 https 或者 localhost 下使用
	+ 所有的 API 都是基于 Promise
+ 生命周期
	+ 安装(install)这个状态发生在 service worker 注册之后，表示开始安装，触发 install 事件回调指定一些
	+ 安装后(installed)service worker 已经完成了安装，并且等待其他的 service worker 线程被关闭
	+ 激活(activating)在这个状态下没有被其他的 service worker 控制的客户端，允许当前的 worker 完成安装， 清理 worker 以及关联缓存的的久缓存资源，等待新的 service worker 线程被激活
	+ 激活后(activated)在这个状态会处理 activate 事件回调(提供了更新缓存策略的机会)，并可以处理功能性的 sync(后台同步)，push(推送)
	+ 废弃状态(redundant)这个状态表示一个 service worker 的生命周期结束

+ service worker 中的方法
	+ self.skipWaiting()表示强制当前处在 waiting 状态的 service worker 进入 activate 状态
	+ event.waitUntil()传入一个 Promise 作为参数，等到该 Promise 为 resolve 状态为止
	+ self.client.claim()在activate事件回调中执行该方法表示取得页面的控制权，这样之后打开页面都会使用版本 service worker 脚本不再控制页面，之后会被停止
	
	
