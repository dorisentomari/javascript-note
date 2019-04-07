const fs = require('fs');
const express = require('express');
const VueServerRenderer = require('vue-server-renderer');

let app = express();
const PORT = 3000;

let serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf8');
let template = fs.readFileSync('./dist/index.ssr.html', 'utf8');

let render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template
});

app.get('/', (req, res) => {
  // 把渲染成功的字符串，交给客户端
  render.renderToString((err, html) => {
    res.send(html);
  });
});

app.listen(PORT);
