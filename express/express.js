const http = require('http');
const url = require('url');
const methods = require('methods');

function application() {
    const app = (req, res) => {
        const {pathname} = url.parse(req.url, true);
        const method = req.method.toLowerCase();
        let index = 0;

        function next(err) {
            if (index === app.routes.length) {
                return res.end();
            }
            const {method: m, path: p, handler: h} = app.routes[index++];
            if (err) {
                // 错误处理中间件，如果不是错误处理，就带着错误继续向下传递
                if (m === 'middleware' && h.length === 4) {
                    return h(err, req, res, next);
                } else {
                    next(err);
                }
            } else {
                if (m === 'middleware') {
                    // 判断路径
                    if (p === pathname || pathname.startsWith(p + '/') || p === '/') {
                        return h(req, res, next);
                    } else {
                        next();
                    }
                } else {
                    if (p instanceof RegExp) {
                        if (p.test(pathname)) {
                            const [, ...values] = pathname.match(p);
                            req.params = p.keys.reduce((prev, curr, index) => (prev[curr] = values[index], prev), {});
                            h(req, res);
                        }
                    } else {
                        if ((method === m || m === 'all') && (pathname === p || p === '*')) {
                            return h(req, res);
                        }
                    }
                    next();
                }
            }

        }

        next();

        res.end(`Cannot ${method.toUpperCase()} ${pathname}`);
    };
    app.routes = [];
    app.listen = function () {
        const server = http.createServer(app);
        server.listen(...arguments);
    }

    ;[...methods, 'all'].forEach(method => {
        app[method] = function (p, callback) {
            // 调用 get 方法的时候，可能会有冒号，说明是一个路径参数
            if (p.includes(':')) {
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

    app.use = function (p, callback) {
        if (typeof callback !== 'function') {
            callback = p;
            p = '/';
        }
        app.routes.push({
            method: 'middleware',
            path: p,
            handler: callback
        });
    };

    return app;
}

module.exports = application;
