import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as WebSocket from 'ws';
const app = express();

import { RootRouter } from './router';
import { WebSocketManager } from './websocket/websocket-manager';

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT");
  next();
});

app.use(bodyParser.json());
app.use('/v1', RootRouter.getRouter());

app.get('/', (req, res) => {
  // APIでどのクライアントに投げるかを判定する
  wss.clients.forEach(v => {
    v.send("Express!!");
  });
  res.send('Hello World!');
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!');
});
const wss = new WebSocket.Server({server: server});

// ===============================================
// Websocketのサーバー側の実装
// ===============================================

wss.on('connection', (ws: WebSocket) => {
  console.log("[SERVER] connection: ");
  WebSocketManager.instance.add(Date.now().toString(), ws);
  WebSocketManager.instance.debug();
  ws.on('message', (message) => {
    console.log(`[SERVER] received: ${message}`);
    // クライアントからのアクションを基に、操作を行う
    WebSocketManager.instance.getAll().forEach(c => c.send(`Parrot: ${message}`));
  }).on('close', (code: string, reason: string) => {
    console.log(`[SERVER] close = ${code}, reason = ${reason}`);
    WebSocketManager.instance.deleteByWS(ws);
    WebSocketManager.instance.debug();
  });
}).on('error', (err) => {
  console.log(`[SERVER] error ${err}`);
});
