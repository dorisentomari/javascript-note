const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.static(__dirname));

app.listen(PORT, error => {
  if (error) {
    console.log(error);
  } else {
    console.log(`the server is running at localhost:${PORT}`);
  }
});
