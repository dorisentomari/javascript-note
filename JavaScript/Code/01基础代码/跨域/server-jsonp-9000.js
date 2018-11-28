const express = require('express');

const app = express();
const PORT = 9000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello, express, port 9000');
});

app.get('/jsonpList', (req, res) => {
  let callback = req.query.callback;
  let data = {
    time: new Date().getTime(),
    key: Math.random().toString(32).slice(-8).toUpperCase()
  };
  
  if (callback) {
    res.send(callback + '(' + JSON.stringify(data) + ')');
  } else {
    res.send(data);
  }
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`the server is running at localhost:${PORT}`);
  }
});
