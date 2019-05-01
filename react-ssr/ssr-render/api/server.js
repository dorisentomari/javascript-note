const express = require('express');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('../common/config');

let app = express();
const loginFile = path.join(__dirname, './isLogin.json');
const PORT = config.port;

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(session({
  secret: 'hello',
  resave: true,
  cookie: {maxAge: 60000},
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  next();
});

let user1 = [
  {id: 1, name: 'hello, react'},
  {id: 2, name: 'hello, angular'},
  {id: 3, name: 'hello, vue'},
  {id: 4, name: 'hello, jquery'},
  {id: 5, name: 'hello, backbone'},
  {id: 6, name: 'hello, ext'},
];

app.get('/api/users', (req, res) => {
  console.log(chalk['bgGreen']('request http://localhost:4000/api/users'));
  return res.json(user1);
});

app.get('/api/user', (req, res) => {
  let data = JSON.parse(JSON.stringify(readFile(loginFile)));
  console.log('/api/user', data);
  if (data.login) {
    res.json({
      code: 0,
      data: {
        success: '获取用户信息成功',
        user: '123456'
      }
    });
  } else {
    res.json({
      code: 0,
      data: {
        success: '用户未登录'
      }
    });
  }
});

app.post('/api/login', (req, res) => {
  let isLogin = {
    code: 0,
    login: true,
    data: {
      user: '123456',
      success: '登录成功'
    }
  };
  isLogin = JSON.stringify(isLogin);
  writeFile(loginFile, isLogin);
  res.json(JSON.parse(isLogin));
});

app.post('/api/logout', (req, res) => {
  let isLogin = {
    code: 0,
    login: false,
    data: {
      success: '退出成功'
    }
  };
  isLogin = JSON.stringify(isLogin);
  writeFile(loginFile, isLogin);
  res.json(JSON.parse(isLogin));
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(chalk['yellow'](`the server is running at localhost:${PORT}`));
  }
});

function writeFile(fileName, content) {
  fs.writeFile(fileName, content, 'utf-8', err => {
    if (err) {
      console.log(err);
    } else {
      return true;
    }
  });
}

function readFile(fileName) {
  let data = fs.readFileSync(fileName, 'utf-8');
  return JSON.parse(data);
}

