var WebSocket = require('ws');
var ws;

connect();

function connect() {
  ws = new WebSocket('ws://localhost:3000/');
  console.log("foo");

  ws.on('open', function open() {
    console.log("OPEN!");
    ws.send("Hello");
  }).on('error', function open(err) {
    console.log("ERROR!: " + err);
    connect();
  }).on('message', function(message) {
    console.log("CLIENT received: %s", message);
  }).on('close', function() {
    console.log("CLIENT close");
  });
}
