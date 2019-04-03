const koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');

let app = new koa();
const PORT = 3000;


app.use(koaStatic(path.join(__dirname, 'client')));
app.use(koaStatic(path.join(__dirname, 'node_modules')));

app.use(async (ctx, next) => {
  if (ctx.path === '/api/list') {
    ctx.body = {
      name: '前端性能监控之 AJAX',
      time: 'now'
    }
  } else {
    return next();
  }
});


app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running at localhost:${PORT}`);
  }
});

