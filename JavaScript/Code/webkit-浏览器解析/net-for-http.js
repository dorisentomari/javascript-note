const net = require('net');
const fs = require('fs');
const path = require('path');

const desPort = 8080;
const desHost = '127.0.0.1';
let allBuffer = null;

const client = net.createConnection(desPort, desHost, () => {
  console.log('connected to server');
  client.write(`
  	GET / HTTP/1.0\r\n
  	Host: localhost:80\r\n
  	User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36\r\n
  	Accept: text/html\r\n
  	Accept-Language: zh-CN,zh;q=0.9\r\n\r\n
  `);
});

client.on('data', data => {
  console.log('---------receive data--------');
  if (!allBuffer) {
    allBuffer = data;
  } else {
    allBuffer = Buffer.concat([allBuffer, data]);
  }
});

client.on('error', error => {
  console.log(error);
});

client.on('end', () => {
  console.log('connected end');
  const htmlContent = allBuffer.toString();
  const ws = fs.createWriteStream(path.join(__dirname, `${desHost}.html`));
  ws.write(htmlContent);
});
