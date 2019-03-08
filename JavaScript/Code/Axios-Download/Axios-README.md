# 1. [Axios Start](https://www.jianshu.com/p/7a9fbcbb1114)

+ Axios 是一个基于 Promise 管理的一个 Ajax 库
+ 使用 dir(axios) 可以发现 axios 的很多方法， axios 本质上就是一个函数，不是一个类
+ axios 提供了对应 HTTP 请求的方法，包括 get、post、put、delete、head、options 
+ post 请求中传递的内容都相当于基于请求主体传递给服务器，但是传递给服务器的内容格式是 RAW，JSON 格式的子字符串，不是 X-WWW-FORM-URLENCODED 格式

# 2. Axios 的基本使用

```javascript
axios.get(url, { params: { name: 'mark' } });

axios.post(url, { name: 'mark' }, { headers: { xxx: 'xxx' } });
```
+ 响应的结果
	+ config 基于 axios 发送请求时做的配置项
	+ data 是从服务器获取的响应主体内容
	+ headers 是从服务器获取的响应头信息
	+ request 是创建的 AJAX 实例
	+ status 是状态码
	+ statusText 是状态码的描述

+ 一次性并发多个请求
```javascript
let send = [
	axios.get('https://www.easy-mock.com/mock/5c7fc8606498b753ed1f9e5e/example/school'),
	axios.get('https://easy-mock.com/mock/5c7fc8606498b753ed1f9e5e/example/user'),
	axios.get('https://www.easy-mock.com/mock/5c7fc8606498b753ed1f9e5e/example/student')
];

axios.all(send).then(res => {
	console.log('方法一');
	console.log(res);
});

function getSchool(){
	return axios.get('https://www.easy-mock.com/mock/5c7fc8606498b753ed1f9e5e/example/school')
}

function getUser(){
	return axios.get('https://easy-mock.com/mock/5c7fc8606498b753ed1f9e5e/example/user')
}

function getStudent () {
	return axios.get('https://www.easy-mock.com/mock/5c7fc8606498b753ed1f9e5e/example/student')
}

// spread 是函数的柯里化原理
axios.all([getSchool(), getUser(), getStudent()]).then(axios.spread((...res) => {
	console.log('方法二');
	console.log(res);
}));
```
+ axios.spread 的源码，本质上是 axios 的柯里化
```javascript
// axios.spread 的源码
module.exports = function spread(callback) {
	return function wrap(arr) {
		return callback.apply(null, arr);
	};
};
```
+ axios.all 本质上是 Promise.all

# 3. Axios 的 API
## 3.1 配置项 config
+ 类似 jQuery 的方式发请求，默认请求方式为 get
```javascript
axios({
	url: 'https://easy-mock.com/mock/5c7fc8606498b753ed1f9e5e/example/user',
	data: {
		user: 'sherry'
	}
}).then(res => {
	console.log(res);
});
```
+ axios 直接写 url
```javascript
axios('https://www.easy-mock.com/mock/5c7fc8606498b753ed1f9e5e/example/student').then(res => {
	console.log(res);
});
```

## 3.2 config 信息
### 3.2.1 axios.defaults.baseURL
+ 公用的 url 的前缀，写相对 url 的时候，会自动加上 baseURL 作为前缀
```javascript
axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5c7fc8606498b753ed1f9e5e/example';
```

### 3.2.2 adapter 适配器
+ adapter: function (config) {}
+ 适配器选项允许自定义处理请求，这会使得测试更加方便
+ 返回一个 Promise ，并提供验证返回

### 3.2.3 auth
+ 表明 HTTP 基础的认证应该被使用，并且提供证书
+ 这会设置一个 authorization 头 header， 并覆盖在 header 中设置的 Authorization 信息
```javascript
auth: {
  username: '*****',
  password: '*****'
}
```

### 3.2.4 responseType
+ 返回数据的格式，默认是 JSON
+ 可选项是 arrayBuffer，blob，document，JSON，text，stream

### 3.2.5 XSRF，默认配置
+ xsrfCookieName: 'XSRF-TOKEN'
+ xsrfHeaderName: 'X-XSRF-TOKEN'

### 3.2.6 onUploadProgress 和 onDownloadProgress
+ 上传进度事件和下载进度事件
```javascript
onUploadProgress: function (progressEvent) { }
onDownloadProgress: function (progressEvent) { }
```

### 3.2.7 maxContentLength
+ 内容最大值: 2000

### 3.2.8 validateStatus
+ 自定义后端返回的状态码哪些可以成功，哪些可以失败，成功的 resolve，失败的 reject
+ 如果 validateStatus 返回 true，null，undefined，那么 promise 的状态将会是 resolve
+ 默认以 2 开头的是成功
```javascript
validateStatus: function (status) {
  return status >= 200 && status < 300;
}
```

### 3.2.9 maxRedirects
+ 在 Node.js 中重定向的最大数量，默认为 5

### 3.2.10 代理
+ 定义了当发送 http/https 请求要用到的自定义代理
+ keepAlive 在选项中没有被默认激活
+ proxy 定义了代理的主机端口
+ auth 表明 http 基本认证应该与 proxy 代理链接，并提供证书
+ 这将会设置一个 proxy-Authorization 的 header，并且会覆盖已经存在的 Proxy-Authorization 的 header

```javascript
httpAgent: new http.Agent({keepAlive: true}),
httpsAgent: new https.Agent({keepAlive: true}),
proxy: {
	host: '',
	port: '',
	auth: {
		username: '*****',
		password: '*****'
	}
}
```

### 3.2.11 cancelToken
+ 定义一个用于取消的 cancel token
```javascript
cancelToken: new cancelToken(function (cancel) { })
```

### 3.2.12 timeout
+ 超时时间

### 3.2.13 headers
+ 自定义请求头
```javascript
axios.defaults.headers = {
  name: 'test axios'
}
```
### 3.2.14 params
+ get 请求的公共参数
```javascript
axios.defaults.params = {};
```

### 3.2.14 data
+ post 请求的公共参数
```javascript
axios.defaults.data = {};
```
### 3.2.15 headers.post
+ `axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'`
+ 设置在 POST 请求中基于请求主体向服务器发送内容的格式，默认是 RAW ，项目中常用的 urlencoded 格式


# 4. 拦截器
+ 在请求和响应达到 then / catch 之前拦截
+ 在执行成功后设定的方法之前，会先执行拦截器中的方法

## 4.1 请求拦截器
```javascript
axios.interceptors.request.use(config => {
  return config;
}, err => {
  return Promise.reject(err);
});

// 处理请求的参数
axios.defaults.transformRequest = data => {
	console.log(data);
}
```


## 4.2 响应拦截器
```javascript
axios.interceptors.response.use(res => {
  return res;
}, err => {
  return Promise.reject(err);
})
```

