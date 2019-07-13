const http = require('http');
const url = require('url');
const methods = require('methods');

function application() {
    const app = (req, res) => {
        const {pathname} = url.URL(req.url, true);
        const method = req.method.toLowerCase();
        // 遍历数组，如果方法和路径都匹配到了，那么就执行函数
        for (let i = 0; i < app.routes.length; i++) {
            const {method: m, path: p, handler: h} = app.routes[i];
            if (p instanceof RegExp) {
                // 如果路径是一个正则，那么需要匹配pathname
                if (p.test(pathname)) {
                    const [, ...values] = pathname.match(p);
                    req.params = p.keys.reduce((prev, curr, index) => (prev[curr] = values[index], prev), {})
                    h(req, res);
                }
            } else {
                if ((method === m || m === 'all') && (pathname === p || p === '*')) {
                    return h(req, res);
                }
            }
        }
        // 如果没有找到，就返回 not found
        res.end(`Cannot ${method.toUpperCase()} ${pathname}`);
    }
    app.routes = [];
    app.listen = function () {
        const server = http.createServer(app);
        server.listen(...arguments);
    }

    ;[...methods, 'all'].forEach(method => {
        app[method] = function (p, callback) {
            // 调用 get 方法的时候，可能会有冒号，说明是一个路径参数
            if (p.include(':')) {
                const keys = [];
                p = p.replace(/:([^\/]+)/g, function () {
                    keys.push(arguments[1]);
                    return '/([^\/]+)';
                });
                p = new RegExp(p);
                p.keys = keys;
            }
            app.routes.push({
                method,
                path: p,
                handler: callback
            });
        }
    });
    return app;
}

module.exports = application;
