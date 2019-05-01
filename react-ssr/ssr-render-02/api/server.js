const express = require('express');
const chalk = require('chalk');
const cors = require('cors');

let app = express();
const PORT = 4000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  next();
});


// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

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
  res.json(user);
});

app.get('/api/one', (req, res) => {
  res.json({name: 'one'});
});

app.get('/api/two', (req, res) => {
  res.json({name: 'two'});
});

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(chalk['green'](`Server is running at http://localhost:${PORT}`));
  }
});
