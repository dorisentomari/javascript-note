// const express = require('./lib/express');
const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res, next) => {
    console.log('1');
    next();
}, (req, res, next) => {
    console.log('2');
    next();
}, (req, res, next) => {
    console.log('3');
    next();
}, (req, res, next) => {
    console.log('4');
    next();
});

app.get('/', (req, res, next) => {
    console.log('5');
    next();
}, (req, res, next) => {
    console.log('6');
    next();
}, (req, res, next) => {
    console.log('7');
    next();
}, (req, res) => {
    console.log('8');
    res.end('hello');
});


app.listen(PORT, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server is running at http://localhost:${PORT}`)
    }
});

