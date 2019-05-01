const express = require('express');
const chalk = require('chalk');
const config = require('../common/config');
let app = express();

const PORT = config.port;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  next();
});
let user = [
  {id: 1, name: 'hello, react'},
  {id: 2, name: 'hello, angular'}
];

app.get('/api/users', (req, res) => {
  console.log(chalk['bgGreen']('request http://localhost:4000/api/users'));
  return res.json(user);
});

app.get('/api/one', (req, res) => {
  return res.json({name: 'one'});
});

app.get('/api/two', (req, res) => {
  return res.json({name: 'two'});
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(chalk['yellow'](`the server is running at localhost:${PORT}`));
  }
});
