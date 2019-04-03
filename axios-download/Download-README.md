# 1. 下载
+ 传统的下载方式是后端存储或者即时生成一个文件来提供下载，这样做的优势是可以做到权限控制，数据二次数理，但是缺点就是需要额外发起请求，增大服务端压力，下载速度慢。

# 2. 后端响应式下载
+ 在常规的 HTTP 响应中，Content-Disposition 消息头指示回复的内容该以何种形式展示，是以内联的形式(即网页或页面的一部分)，还是以附件的形式下载并存储到本地。
+ 在 HTTP 场景中，第一个参数默认是 inline ，表示回复的消息会以页面的一部分货整个页面的形式展示，或者是 attachment ，意味着消息体应该被下载到本地，大多数浏览器会呈现一个 **另存为** 的对话框，将 filename 的值预填为下载后的文件名。
+ 这种方式可以下载成功，但是这并不意味着下载是通过 AJAX 下载的，以下边的前端代码为例，我们使用 Axios 发送 GET 请求，获取到响应的结果，在控制台中输出的是乱码。创建一个 iframe 标签，iframe 的 src 属性的值为 GET 请求的 URL，把 iframe 添加到 body 上，然后调用 iframe 的 onload 方法，加载完后把 iframe 移除。
+ 这种下载方式，实际上给服务器发送了两次请求，一次是 AJAX 获取 URL 的请求，另外一次是 iframe 加载的请求。所以我们可以直接采用创建 iframe 的方式下载，看前端示例2

+ 前端示例1

```javascript
const downloadGet = config => {
	let params = '';
	for (const item in config.params) {
		if (config.params.hasOwnProperty(item)) {
			params += `${item}=${config.params[item]}&`;
		}
	}
	params.substring(0, params.length - 1);
	const url = params.length ? `${config.url}?${params}` : `${config.url}`;
	let iframe = document.createElement('iframe');
	iframe.style.display = 'none';
	iframe.src = url;
	iframe.onload = function () {
		document.body.removeChild(iframe);
	}
	document.body.appendChild(iframe);
}

document.getElementById('download-get').addEventListener('click', function (e) {
	axios.get('/download/excel', {
		params: {
			startTime: '2019-03-01',
			endTime: '2019-03-31'
		}
	}).then(res => {
		let config = res.config;
		if (config.method.toUpperCase() === 'GET') {
			downloadGet(config);
		} else if (config.method.toUpperCase() === 'POST') {
			downloadPost(config);
		}
		console.log(res);
		return res;
	});
});
```

+ 前端示例2

```javascript
document.getElementById('download-get').addEventListener('click', function (e) {
	let url = '/download/excel?';
	let params = {
		startTime: '2019-03-01',
		endTime: '2019-03-31'
	};
	for (const item in params) {
		if (params.hasOwnProperty(item)) {
			url += `${item}=${params[item]}&`;
		}
	}
	url.substring(0, url.length - 1);

	let iframe = document.createElement('iframe');
	iframe.style.display = 'none';
	iframe.src = url;
	iframe.onload = function () {
		document.body.removeChild(iframe);
	}
	document.body.appendChild(iframe);
});
```

+ 后端示例，express 设置下载 excel 文件

```javascript
router.get('/excel', (req, res) => {
  console.log(+new Date());
  let file = fs.readFileSync(path.resolve(__dirname, '../file/chart-01.xlsx'), 'binary');
  res.setHeader('Content-Length', file.length);
  res.setHeader('Content-Disposition', 'attachment; filename=chart-01.xlsx');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.write(file, 'binary');
  res.end();
});
```

# 3. 使用 a 的 download 属性

+ a 标签的 download 属性指的是浏览器下载的 URL，而不是导航的 URL，所以可以提示用户将其保存为本地文件。如果一个属性有值，那么将它作为下载的文件名使用。此属性对允许的值没有限制，但是 / 和 \ 会被转换为下划线。
+ 尽管 HTTP URL 需要位于同源，但是可以使用 blob:URL 和 data: URL ，以方便用户下载 JavaScript 方式生成的内容。

```html
<a href="#" download="http://static.ikite.top/video/fei-chi-ren-sheng.mp4">download</a>
```

# 4. 生成并下载字符串文件
## 4.1 Blob 对象
+ Blob(Binary Large Object) 二进制类型的大对象，表示一个不可变的原始的类文件对象，上传文件时常用的 File 对象就是继承于 Blob ，并进行了扩展用于支持用户系统上的文件。
+ 通过 Blob() 构造函数来创建一个新的 blob() 对象。`Blob(blobParts, [options])`
+ json 示例创建 Blob 对象

```javascript
let debug = {type: 'Blob Large Object'};
let blob = new Blob([JSON.stringify(debug, null, 2)], {type: 'application/json'});
```
+ Blob 对象只有两个可读的属性
	+ size，Blob 对象中所包含的数据的字节大小
	+ type，一个字符串，表明该 Blob 对象所包含的数据的 MIME 类型，如果类型未知，更则该值为空字符串

## 4.2 URL 对象
+ URL 接口是一个用来创建 URLs 的对象，有两个静态方法
+ 创建 URL(DOMString) url = window.URL.createObjectURL(blob)
+ 包含一个唯一的 blob 链接，该链接协议为 blob: 后边跟唯一标识浏览器中的对象的掩码。这个 URL 的声明周期和创建它的窗口中的 document 绑定
+ 销毁 URL ，URL.revokeObjectURL(objectURL)
+ 销毁之前使用 URL.createObjectURL() 方法创建的 URL 实例，浏览器会在文档退出的时候自动释放，但是为了获得最佳性能和内存使用状况，应该在安全的时机主动释放

```javascript
let url = URL.createObjectURL(blob);
// 此时 url 的值为 "blob:http://localhost:63342/d6bf0324-7ca5-4957-b42f-92622a987f1b"
```

+ 我们可以在页面上创建一个新的 a 标签，直接下载这个文件

```html
<a href="blob:http://localhost:63342/d6bf0324-7ca5-4957-b42f-92622a987f1b" download="blob.json">download</a>
```

## 4.3 FileReader 读取 Blob 数据
+ 想要读取 Blob 数据的唯一方法是 FileReader
+ FileReader 对象允许 Web 应用程序异步读取存储在用户计算机上的数据或者是原始数据缓冲区的内容，使用 File 或 Blob 对象指定要读取的文件或数据
+ 其中 File 对象可以是来自一个用户在一个 input 元素上选择文件后返回 FileList 对象，也可以来自拖放操作生成的 DataTransfer 对象，还可以是来自一个 HTMLCanvasElement 上执行 mozGetAsFile() 方法后返回结果。

### 4.3.1 FileReader的 3 个属性
+ FileReader.error 一个 DOMException ，表示在读取文件时发生的错误
+ FileReader.readyState 表示 FileReader 状态的数字
	+ EMPTY 0 表示还没有加载任何数据
	+ LOADING 1 表示数据正在加载
	+ DONE 2 已完成全部的读取请求
+ FileReader.result 文件的内容，该属性仅在读取操作完成后才有效，数据的格式取决于使用哪个方法来启动读取操作

### 4.3.2 FileReader的 5 个方法
+ FileReader.abort() 中止读取操作，在返回时，readyState 属性为 DONE
+ FileReader.readAsArrayBuffer() 开始读取指定的 Blob 中的内容，一旦完成， result 属性中保存的将是被读取文件的 ArrayBuffer 数据对象
+ FileReader.readAsBinaryString() 开始读取指定的 Blob 中的内容，一旦完成， result 属性中将包含所读取文件的原始二进制数据
+ FileReader.readAsDataURL() 开始读取指定的 Blob 中的内容，一旦完成，result 属性中将包含一个 data:URL格式 的字符串以表示所读取的文件的内容
+ FileReader.readAsText() 开始读取指定的 Blob 中的内容，一旦完成， result 属性中将把汗一个字符串以表示所读取的文件内容

### 4.3.3 FileReader的 6 个事件
+ FileReader.onabort 处理 abort 事件，该事件在读取操作被中断时触发
+ FileReader.onerror 处理 error 事件，该事件在读取操作发生错误时触发
+ FileReader.onload 处理 load 事件，该事件在读取操作完成时触发
+ FileReader.onloadstart 处理 loadstart 事件，该事件在读取操作开始时触发
+ FileReader.onloadend 处理 loadend 事件，该事件在读取操作结束时触发
+ FileReader.onprogress 处理 progress 事件，该事件在读取 Blob 时触发

