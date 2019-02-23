const express = require('express');
const app = express();
const PORT = 3000;


app.get('/say', (req, res) => {
  let {wd, cb} = req.query;
  console.log(wd, cb);
  res.end(`${cb}('${wd}你好啊')`);
});

app.listen(PORT, error => {
  if (error) {
    console.log(error);
  } else {
    console.log(`the server is running at localhost:${PORT}`);
  }
});
