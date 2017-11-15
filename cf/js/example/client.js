var WebSocket = require('ws');
var ws;

function reconnect() {
  ws = null;
  console.log("[CLIENT] 3秒後に再接続します。");
  setTimeout(function() {
    connect();
  }, 3000);
}

function connect() {
  ws = new WebSocket('ws://localhost:3000/');
  console.log("[CLIENT] connect");

  ws.on('open', function() {
    console.log("[CLIENT] open");
    ws.send("Hello");
  }).on('error', function(err) {
    console.log(`[CLIENT] error: ${err}`);
  }).on('message', function(message) {
    console.log(`[CLIENT] message: ${message}`);
  }).on('close', function(code, reason) {
    console.log(`[CLIENT] close: code = ${code}, reason = ${reason}`);
    reconnect();
  });
}

connect();
