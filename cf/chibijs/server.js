var http = require("http");

var server = http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("hello, Node.js world!");
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
