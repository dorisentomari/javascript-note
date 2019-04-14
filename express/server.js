const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  console.log('11');
  next();
});

app.use('/', (req, res, next) => {
  console.log('22');
  next();
});

app.use('/', (req, res, next) => {
  console.log('33');
  next();
});

app.use('/', (req, res, next) => {
  console.log('44');
  next();
});

app.listen(3000);
