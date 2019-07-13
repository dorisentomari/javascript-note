const Application = require('./application');


let http = require('http');
let url = require('url');




let router = [
    {
        path: '*',
        method: '*',
        handler(req, res) {
            res.end(`Cannot ${req.url} ${req.method}`);
        }
    }
];

function createApplication() {
    return  new Application;
}

module.exports = createApplication;
