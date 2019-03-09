const WebSocket = require('ws');
const redis = require('redis');

let wss = new WebSocket.Server({port: 3000});
let client = redis.createClient();

let clientsArr = [];
// 原生的 websocket 两个常用的方法，on('message')，send()
wss.on('connection', ws => {
  clientsArr.push(ws);
  client.lrange('barrages', 0, -1, (err, applies) => {
    applies = applies.map(item => JSON.parse(item));
    ws.send(JSON.stringify({type: 'INIT', data: applies}));
  });

  ws.on('message', data => {
    console.log(data);
    client.rpush('barrages', data, redis.print);
    console.log('data', data);
    clientsArr.forEach(w => {
      w.send(JSON.stringify({type: 'ADD', data: JSON.parse(data)}));
    })
  });

  ws.on('close', () => {
    clientsArr = clientsArr.filter(client => client !== ws);
  })
});
