const express = require('./express');

const app = express();

// app.all('/', (req, res) => {
//   res.end('allallall');
// });
//
// app.get('/a', (req, res) => {
//   res.end('aaaa');
// });

app.get('/username/:id/:name', (req, res) => {
  console.log(req.params);
  res.end('ok');
});

// let server = '/username/:id/:name';
// let client = '/username/1/2';
// let arr = [];
// let regExpStr = server.replace(/:([^\/]+)/g, function () {
//   arr.push(arguments[1]);
//   return '([^\/]+)'
// });
// let reg = new RegExp(regExpStr);
// let [, ...args] = client.match(reg);
//
// let params = arr.reduce((a, b, index) => (a[b] = args[index], a), {});
// console.log(params);

app.listen(3000);
