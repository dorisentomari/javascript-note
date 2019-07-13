//  这个类是整个路由系统
const Route = require('./route');
const Layer = require('./layer');

function Router() {
    this.stack = [];
}

// 创建 route 和 layer 的关系
Router.prototype.route = function (path) {
    let route = new Route();
    // 如果 layer 的路径匹配到了就交给 route 来处理
    let layer = new Layer(path, route.dispatch.bind(route));
    // 把 route 放到 layer 上
    layer.route = route;
    this.stack.push(layer);
    return route;
};

// 调用 get，需要创造一个个 layer，每个 layer 上应该有一个 route
// 还要将 get 方法中的 handle 传入到 route 中，route 中将 handle 存起来
Router.prototype.get = function (path, handler) {
    let route = this.route(path);
    // 把 handler 传递给自身
    route.get(handler);
};

Router.prototype.handle = function (req, res, out) {

};

module.exports = Router;
