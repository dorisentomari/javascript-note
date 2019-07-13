const http = require('http');
const url = require('url');

function application () {
  const app = (req, res) => {
    const { pathname } = url.parse(req.url, true);
    const method = req.method.toLowerCase();
    // 遍历数组，如果方法和路径都匹配到了，那么就执行函数
    for (let i = 0; i < app.routes.length; i++) {
      const { method: m, path: p, handler: h } = app.routes[i];
      if (method === m && pathname === p) {
        return h(req, res)
      }
    }
    // 如果没有找到，就返回 not found
    res.end(`Cannot ${method.toUpperCase()} ${pathname}`)
  }
  app.routes = [];
  app.listen = function () {
    const server = http.createServer(app);
    server.listen(...arguments);
  };

  app.get = function (p, callback) {
    app.routes.push({
      method: 'get',
      path: p,
      handler: callback
    });
  };

  return app;
}

module.exports = application;
