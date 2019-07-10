const http = require('http');
const fs = require('mz/fs');
const url = require('url');
const path = require('path');
const mime = require('mime');
const crypto = require('crypto');

let server = http.createServer(async (req, res) => {
    let {pathname} = url.parse(req.url);
    let filePath = path.join(__dirname, pathname);
    // 设置文件强制缓存，缓存是指 html 引用的文件被缓存
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Expires', new Date(Date.now() + 10000).toGMTString());

    try {
        let statObj = await fs.stat(filePath);
        if (statObj.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
            await fs.access(filePath);
        }
        let ctime = stat.ctime.toGMTString();
        res.setHeader('Last-Modified', ctime);
        // 用 Etag 方式来判断文件是否需要修改更新
        // 如果文件体积比较小，可以使用 etag
        // 这种方式太耗费性能，一般都用文件大小 stat.size 来代替指纹，辅助以 if-modified-since 一起验证
        let tag = fs.readFileSync(filePath, 'utf8');
        let hash = crypto.createHash('md5').update(tag).digest('base64');
        res.setHeader('Etag', hash);
        if (req.headers['if-none-match'] === tag) {
            res.statusCode = 304;
            return res.end();
        }
        // 缺陷是修改时间变了，但是文件内容并没有发生改变
        // 频繁改动可能无法监控到，cdn 部署的时候，也会出现一些问题
        if (req.headers['if-modified-since'] === ctime) {
            res.statusCode(304);
            return res.end();
        }
        res.setHeader('Content-Type', `${mime.getType(filePath)};charset=utf8`);
        fs.createReadStream(filePath).pipe(res);
    } catch (e) {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

const PORT = 3000;

server.listen(PORT, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server is running at http://localhost:${PORT}`);
    }
});
