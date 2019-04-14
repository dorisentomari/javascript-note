const http = require('http');
const url = require('url');
let methods = require('methods');

function application() {
  let app = (req, res) => {
    // 获取用户请求的方法和路径
    let method = req.method.toLowerCase();
    let {pathname} = url.parse(req.url);
    for (let i = 0; i < app.routes.length; i++) {
      let currentLayer = app.routes[i];
      // 存在路径参数
      if (currentLayer.path.params) {
        // currentLayer.path 是正则
        // pathname 是真实的url路径
        if (method === currentLayer.method && currentLayer.path.test(pathname)) {
          let [, ...args] = pathname.match(currentLayer.path);
          req.params = currentLayer.path.params.reduce((a, b, index) => (a[b] = args[index], a), {});
          return currentLayer.callback(req, res);
        }
      }

      if ((method === currentLayer.method || currentLayer.method === 'all') && (pathname === currentLayer.path || currentLayer.path === '*')) {
        return currentLayer.callback(req, res);
      }
    }
    res.end(`Cannot ${method} ${pathname}`);
    res.end('Cannot found /');
  };

  app.listen = (...args) => {
    let server = http.createServer(app);
    server.listen(...args);
  };

  app.routes = [];

  [...methods, 'all'].forEach(method => {
    app[method] = function (path, callback) {
      // path 如果有冒号，那么就是路由参数
      if (path.includes(':')) {
        let params = [];
        path = path.replace(/:([^\/]+)/g, function () {
          params.push(arguments[1]);
          return '([^\/]+)';
        });
        path = new RegExp(path);
        path.params = params;
      }
      let layer = {
        method,
        path,
        callback
      };
      app.routes.push(layer);
    };
  });


  return app;
}

module.exports = application;
