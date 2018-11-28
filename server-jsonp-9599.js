const express = require('express');
const path = require('path');

const app = express();
const PORT = 9599;

app.use(express.json());

app.get('/list', (req, res) => {
  let callback = req.query.callback;
  let data = {
    key: Math.random().toString(32).slice(-8).toUpperCase(),
    time: new Date().getTime()
  }
  if (callback) {
    res.send(callback + '(' + JSON.stringify(data) + ')')
  } else {
    res.send(data)
  }
});

app.get('/callback', function (req, res) {
  let callback = req.query.callback;
  let data = Math.random().toString(32).slice(-8).toUpperCase();

  if (callback) {
    res.send(callback + '(' + JSON.stringify(data) + ')')
  } else {
    res.send(data)
  }

});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`the server is running at localhost:${PORT}`);
  }
});
