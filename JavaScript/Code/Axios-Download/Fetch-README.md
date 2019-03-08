# 1. fetch
+ fetch 不是 ajax，目的是为了取代 ajax，是 js 内置的 API ，基于 fetch 可以实现客户端和服务端的信息通信
+ fetch 是 ES2018 中新增的 API，浏览器支持度不是很好，可以基于 babel 进行语法解析，解析后的还是 ajax
+ 如果想要提高兼容性，需要使用 fetch-polyfill
+ get 请求不能设置 body 参数，只能设置 url 传参
+ post 请求的 body 属性只支持字符串，不支持 object
+ 基本使用
```javascript
fetch('https://easy-mock.com/mock/5c7fc8606498b753ed1f9e5e/example/student', {
	method: 'get',
	headers: {
		// 设置请求头
		'Content-Type': 'x-www-form-urlencoded'
	},
	credentials: 'include'
}).then(result => {
	console.log(result);
}).catch(msg => {
	console.log(msg);
});
```

# 2. 响应的 result 的属性
+ headers，包含响应头信息
+ redirected，是否重定向
+ status，状态码
+ type，请求类型，是否跨域
+ url，请求的地址
+ `__proto__`，指向 response 类，这些方法可以快速把从服务器获取的结果找到
	+ arrayBuffer
	+ blob
	+ clone
	+ formData
	+ json
	+ ok
	+ redirected
	+ status
	+ statusText
	+ text()
	+ type
	+ url

# 3. 解决错误请求的问题
+ 不管服务器返回的状态是多少，fetch 都不认为是失败的请求，不管是 4xx 或 5xx，都执行的是 then 方法，都需要我们进行异常处理
```javascript
fetch('https://easy-mock.com/mock/5c7fc8606498b753ed1f9e5e/example/student').then(result => {
	let {status} = result;
	if (/^(4|5)\d{2}$/.test(status)) {
		throw new Error('请求失败');
	}
	return result.json();
}).then(data => {
	console.log(data);
}).catch(msg => {
	console.log(msg);
});
```
