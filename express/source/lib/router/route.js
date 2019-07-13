const Layer = require('./layer');

function Route() {
    this.stack = [];
}

Route.prototype.get = function (handler) {
    // 给 route 中添加层，这个层中需要存放方法名和 handler
    let layer = new Layer('/', handler);
    layer.method = 'get';
    this.stack.push(layer);
};

Route.prototype.dispatch = function () {

};

module.exports = Route;
