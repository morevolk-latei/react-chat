var express = require("express");
var app = express();
var socket = require("socket.io");
// cjs - commonJS code

var server = app.listen(9090, function () {
  console.log("Listening on port 9090");
});

//app.use(express.static("public"));

app.get('/', (req, res) => {
  res.json({ status: 200, message: 'Server is running' })
})

var io = socket(server);

io.on("connection", function (socket) {
  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data)
  });
});



// client (websocket client) (JS) (WebSocket) (socket.io) <-> server + (websocket server) (NodeJs) (ws) (socket.io)

