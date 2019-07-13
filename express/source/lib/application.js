// 用来创建应用
const http = require('http');
const url = require('url');

const Router = require('./router/index');

// 将应用和路由系统区分开
function Application() {
    this._router = new Router();
}

Application.prototype.get = function (path, handler) {
    this._router.get(path, handler);
    // this._router.push({
    //     path,
    //     method: 'get',
    //     handler
    // });
    // [
    //     {
    //         path: '*',
    //         method: '*',
    //         handler(req, res) {
    //             res.end(`Cannot ${req.url} ${req.method}`);
    //         }
    //     }
    // ];
};

Application.prototype.listen = function () {
    let server = http.createServer((req, res) => {
        // 如果路由系统中处理不了这个请求，就让调用 done 方法
        function done() {
            res.end(`Cannot ${req.url} ${req.method}`);
        }

        this._router.handle(req, res, done);
        // let {pathname} = url.parse(req.url);
        // for (let i = 1; i < this._router.length; i++) {
        //     let {path, method, handler} = this._router[i];
        //     if (path === pathname && method === req.method.toLowerCase()) {
        //         return handler(req, res);
        //     }
        // }
        // return this._router[0].handler(req, res);
    });
    server.listen(...arguments);
};

module.exports = Application;
