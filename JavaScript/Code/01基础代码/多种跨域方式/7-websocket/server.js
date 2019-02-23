const WebSocket = require('ws');
const PORT = 3000;

let wss = new WebSocket.Server({port: PORT});

wss.on('connection', ws => {
  ws.on('message', e => {
    console.log(e);
    ws.send('Thanks♪(･ω･)ﾉ');
  });
});




