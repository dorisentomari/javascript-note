const express = require('express');
const app = express();
const PORT = 3000;


app.get('/user', (req, res) => {
  res.json({
    name: 'EXPRESS'
  })
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running at localhost:${PORT}`);
  }
});

