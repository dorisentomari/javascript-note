const express = require('express');
const app = express();
let json = require('./data');

app.use(express.static(__dirname));
app.get('/api/img', (req, res) => {
  let start = Math.round(Math.random() * (json.length - 20));
  res.json(json.slice(start, start + 20));
});

app.listen(3000);
