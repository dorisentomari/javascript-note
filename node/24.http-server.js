const http = require('http');
const url = require('url');
const querystring = require('querystring');

// http 解析的过程，默认情况下，会连接 tcp 服务， tcp 接收的是全部的请求内容。
// tcp 是没有标识的，会根据请求的格式

let server = http.createServer();

server.on('request', (req, res) => {
    // 请求行相关的内容
    let method = req.method;
    let {pathname, query} = url.parse(req.url, true);
    let httpVersion = req.httpVersion;
    // 请求头相关的内容，所有头的 key 都是小写
    let headers = req.headers;
    // 接收请求体，如果请求体不存在，会直接触发 end 事件
    let arr = [];
    req.on('data', data => {
        arr.push(data);
    });
    req.on('end', () => {
        let contentType = req.headers['content-type'];
        let obj;
        if (contentType === 'urlencoded/x-www-form-urlencoded') {
            let formData = Buffer.concat(arr).toString();
            let reg = /([^&=]+)=([^&=]+)/g;
            obj = querystring.parse(formData);
            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            res.statusCode = 200;
        }
        if (contentType === 'application/json') {
            console.log('aaaaaa');
            let jsonData = Buffer.concat(arr).toString();
            obj = JSON.parse(jsonData);
            console.log(obj);
            res.setHeader('Content-Type', 'text/plain;charset=utf-8');
            res.statusCode = 200;
        }
        return res.end(JSON.stringify(obj));
    });
});

let PORT = 3000;

server.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});

server.on('error', (error) => {
    console.log(error);
    if (error.code === 'EADDRINUSE') {
        server.listen(++PORT);
    }
});
