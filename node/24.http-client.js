let http = require('http');

// 通过 node 请求另一个服务器

// http.get，只可以发 get 请求
// http.request，可以发其他请求，可以增加请求体

let client = http.request({
    // get 不能发送请求体
    method: 'post',
    hostname: 'localhost',
    port: '3000',
    headers: {
        'Content-Type': 'application/json'
    }
}, res => {
    let arr = [];

    res.on('data', data => {
        arr.push(data);
    });

    res.on('end', () => {
        let str = Buffer.concat(arr).toString();
        console.log('str: ', str);
    });

});

client.end('{"a": 1, "b": 2}');



