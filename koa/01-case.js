const Koa = require('./koa/application');

let app = new Koa();

const PORT = 4000;

// ctx.req, ctx.res 是原生的
// ctx.request, ctx.response 是 koa 自己封装的
// 尽量不要使用原生的 req 和 res
app.use(async (ctx, next) => {
  console.log(ctx.req.url);
  console.log(ctx.request.req.url);
  console.log(ctx.request.url);
  // console.log(ctx.url);
  ctx.body = 'hello, koa ctx';
});


app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running at http://localhost:${PORT}`);
  }
});
