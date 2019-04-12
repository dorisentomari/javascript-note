const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');


class Koa {
  constructor() {
    this.middleware;
    // 防止用户直接修改 context 对象
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  use(fn) {
    this.middleware = fn;
  }

  // 产生 ctx 上下文
  createContext(req, res) {
    let ctx = this.context;
    ctx.request = this.request;
    ctx.response = this.response;
    ctx.request.req = ctx.req = req;
    ctx.response.res = ctx.res = res;
    return ctx;
  }

  handleRequest(req, res) {
    let ctx = this.createContext(req, res);
    this.middleware(ctx);
    res.statusCode = 404;
    if (ctx.body) {
      res.end(ctx.body);
    } else {
      res.end(`Not Found`);
    }
  }

  listen(...args) {
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

module.exports = Koa;
