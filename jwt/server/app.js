const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const {secret} = require('./config');

let app = express();
const PORT = 3000;

app.use(bodyParser.json());
let User = require('./model/user');

const __filter = {
  password: 0,
  __v: 0
};

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') {
    res.end();
  } else {
    next();
  }
});

app.post('/reg', async (req, res) => {
  let user = req.body;
  console.log(user);
  try {
    user = await User.create(user);
    res.json({
      code: 0,
      data: {
        user: {
          id: user._id,
          username: user.username
        }
      }
    });
  } catch (e) {
    res.json({
      code: 1,
      data: '注册失败'
    })
  }
});

app.post('/login', async (req, res) => {
  let user = req.body;
  try {
    user = await User.findOne(user, __filter);
    console.log('findOne: ', user);
    if (user) {
      let token = jwt.encode({
        id: user._id,
        username: user.username
      }, secret);
      res.json({
        code: 0,
        data: {
          token
        }
      });
    } else {
      res.json({
        code: 1,
        data: '用户不存在'
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      code: 1,
      data: '用户不存在'
    });
  }
});

let auth = function (req, res, next) {
  let authorization = req.headers['authorization'];
  if (authorization) {
    let token = authorization.split(' ')[1];
    try {
      req.user = jwt.decode(token, secret);
      next();
    } catch (e) {
      res.status(401).send('Not Allowed');
    }
  } else {
    res.status(401).send('Not Allowed');
  }
};

// authorization:Bearer token
app.get('/order', auth, (req, res, next) => {
  res.json({
    code: 0,
    data: {
      user: req.user,
      orderList: [1, 2, 3, 4, 5]
    }
  })
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running at localhost:${PORT}`);
  }
});
