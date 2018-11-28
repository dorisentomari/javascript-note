const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/', (req, res) => {
  res.send('hello, express, port 8000');
});

app.get('/getList', (req, res) => {
  res.json({
    time: new Date().getTime(),
    key: Math.random().toString(32).slice(-8).toUpperCase()
  });
});

app.post('/postList', (req, res) => {
  res.json({
    time: new Date().getTime(),
    key: Math.random().toString(32).slice(-8).toUpperCase()
  });
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`the server is running at localhost:${PORT}`);
  }
});
