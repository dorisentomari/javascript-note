const fs = require('fs');
const path = require('path');
const express = require('express');
const VueServerRenderer = require('vue-server-renderer');

let app = express();
const PORT = 3000;

// serverBundle 和 index.ssr.html 一起生成了静态的页面，包括页面的 DOM 元素和 CSS 样式，但是没有事件交互
// 但是现在还需要客户端的事件，所以把客户端的代码通过静态资源加载的方式载入页面，就可以找到页面
let serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf8');
let template = fs.readFileSync('./dist/index.ssr.html', 'utf8');

// VueServerRenderer.createBundleRenderer 的目的是把 serverBundle 和 html 模板结合在一起，生成一个字符串的 HTML 模板
let render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template
});

app.get('/', (req, res) => {
  // 把渲染成功的字符串，交给客户端
  render.renderToString((err, html) => {
    res.send(html);
  });
});

// static 的配置必须放在 app.get('/') 的后边，不然的话走不到 app.get('/') 路由，那么就是客户端渲染
// 客户端载入 js 文件 <script src="/client.bundle.js"></script>
app.use(express.static(path.resolve(__dirname, 'dist')));

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running at http://localhost:${PORT}`);
  }
});
