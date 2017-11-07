import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as WebSocket from 'ws';
import { RootRouter } from './router';
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT");
  next();
});

app.use(bodyParser.json());
app.use('/v1', RootRouter.getRouter());

app.get('/', function (req, res) {
  // APIでどのクライアントに投げるかを判定する
  wss.clients.forEach(v => {
    v.send("Express!!");
  });
  res.send('Hello World!');
});

const server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
const wss = new WebSocket.Server({server: server});

// ===============================================
// Websocketのサーバー側の実装
// ===============================================

var connections = [];
wss.on('connection', (ws) => {
  console.log("[SERVER] connection: ");
  connections.push(ws);
  ws.on('message', function(message) {
    console.log('[SERVER] received: %s', message);
    // クライアントからのアクションを基に、操作を行う
    connections.forEach(function(c) {
      c.send("Parrot: " + message);
    });
  }).on('close', function () {
    console.log('[SERVER] closed');
    connections = connections.filter(function (conn, i) {
      return (conn === ws) ? false : true;
    });
  });
});
