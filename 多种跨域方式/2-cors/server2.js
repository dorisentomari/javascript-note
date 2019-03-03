const express = require('express');
const app = express();
const PORT = 4000;

const whiteList = ['http://localhost:3000'];

app.use((req, res, next) => {
  let origin = req.headers.origin;
  if (whiteList.includes(origin)) {
    // 设置哪个源可以访问
    res.setHeader('Access-Control-Allow-Origin', origin);
    // 设置携带的请求头
    res.setHeader('Access-Control-Allow-Headers', 'name');
    // 设置前端可以访问的请求方式
    res.setHeader('Access-Control-Allow-Methods', 'PUT,DELETE,OPTIONS');
    // 预检的存活时间，两次发送 options 请求的间隔
    res.setHeader('Access-Control-Allow-Max-Age', 6000);
    // 请求带的凭证，允许携带 cookie
    res.setHeader('Access-Control-Allow-Credentials', true);
    // 允许前端获取的头部字段
    res.setHeader('Access-Control-Expose-Headers', 'name');
    if (req.method === 'OPTIONS') {
      // OPTIONS 请求直接过滤掉，没有意义
      res.end();
    }
  }
  next();
});


app.get('/user', (req, res) => {
  console.log(req.headers);
  return res.json({
    name: 'Sherry',
    age: 18
  });
});


app.put('/user', (req, res) => {
  console.log(req.headers);
  res.setHeader('name', 'markmanmanmanman');
  return res.json({
    name: 'Sherry',
    age: 18,
    method: 'PUT'
  });
});

app.listen(PORT, error => {
  if (error) {
    console.log(error);
  } else {
    console.log(`the server is running at localhost:${PORT}`);
  }
});
