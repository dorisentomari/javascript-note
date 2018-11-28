const express = require('express');
const HOST = 'localhost';
const PORT = 8599;

const app = express();

app.get('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  if (req.method.toUpperCase() === "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send("hello, express");
});

app.get('/user', (req, res) => {
  res.json({name: 'sherry', time: new Date().toLocaleString()});
});

app.listen(3000, 'localhost', err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`THE SERVER IS RUNNING AT ${HOST}:${PORT}`);
  }
});
