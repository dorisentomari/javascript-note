const express = require('express');
const chalk = require('chalk');
const session = require('express-session');
const bodyParser = require('body-parser');

const config = require('../common/config');
let app = express();

const PORT = config.port;

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(session({
  secret: 'sessiontest',
  resave: true,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  next();
});
let user = [
  {id: 1, name: 'hello, react'},
  {id: 2, name: 'hello, angular'},
  {id: 3, name: 'hello, vue'},
  {id: 4, name: 'hello, jquery'},
  {id: 5, name: 'hello, backbone'},
  {id: 6, name: 'hello, ext'},
];

app.get('/api/users', (req, res) => {
  console.log(chalk['bgGreen']('request http://localhost:4000/api/users'));
  return res.json(user);
});

app.get('/api/user', (req, res) => {
  let user = req.session.user;
  if (user) {
    res.json({
      code: 0,
      data: {
        user,
        success: '获取用户信息成功'
      }
    });
  } else {
    res.json({
      code: 1,
      data: {
        user,
        error: '用户未登录'
      }
    });
  }
});

app.post('/api/login', (req, res) => {
  let user = req.body;
  req.session.user = user;
  res.json({
    code: 0,
    data: {
      user,
      success: '登录成功'
    }
  });
});

app.post('/api/logout', (req, res) => {
  req.session.user = null;
  res.json({
    code: 0,
    data: {
      success: '退出成功'
    }
  });
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(chalk['yellow'](`the server is running at localhost:${PORT}`));
  }
});
