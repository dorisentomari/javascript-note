const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
let app = express();

app.use(bodyParser.json());

let Vue = require('vue');
let VueServerRenderer = require('vue-server-renderer');

let vm = new Vue({
  template:'<div>hello, vue ssr</div>'
});

let template = fs.readFileSync('./index.html', 'utf8');
let render = VueServerRenderer.createRenderer({template});

app.get('/', (req, res) => {
  render.renderToString(vm, (err, html) => {
    res.send(html);
  });
});

app.listen(3000);


