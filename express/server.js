// const express = require('express');
const express = require('./express');

// 返回的是一个监听函数
const app = express();

// 默认先注册一个中间件，扩展 req res 的属性
app.use((req, res, next) => {
    const url = require('url');
    const {pathname} = url.parse(req.url);
    req.path = pathname;
    res.send = function (value) {
        if (Buffer.isBuffer(value) || typeof value === 'string') {
            res.setHeader('Content-Type', 'text/plain;charset=utf8');
        } else if (typeof value === 'object') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(value));
        } else if (typeof value === 'number') {
            res.statusCode = value;
            res.end(require('__http__request').STATUS_CODE[value]);
        } else {
            next('res.send 的参数必须是 Buffer 或 字符串');
        }
    };
    res.sendFile = function (filePath, options) {
        let defaultOptions = {};
        options = Object.assign(options, defaultOptions);
        filePath = path.join(options.root, p);
        require('fs').createReadStream(filePath).pipe(res);
    };
    next();
});

app.get('/user', (req, res) => {
    res.end('get hello, user');
});

app.get('/user/:name/:age', (req, res) => {
    const params = req.params;
    res.end(params);
});

app.post('/user', (req, res) => {
    res.end('post hello, user');
});

// 只能放在页面最后边
app.all('*', (req, res) => {
    res.end('all');
});

app.use((req, res, next) => {
    console.log(1);
    next();
    console.log(4);
});

app.use((req, res, next) => {
    console.log(2);
    next();
    console.log(5);
});

app.use((req, res, next) => {
    console.log(3);
    next();
    console.log(6);
});

const PORT = 3000;

app.listen(PORT, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running at http://localhost:${PORT}`);
    }
});
