var express = require("express");
var app = express();
var socket = require("socket.io");
const cors = require("cors")
const chatData = require('./utils/datastore')
// cjs - commonJS code

// https://www.codingdeft.com/posts/nodejs-react-cors-error/
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))


var server = app.listen(9090, function () {
  console.log("Listening on port 9090");
});

//app.use(express.static("public"));

app.get('/', (req, res) => {
  res.json({ status: 200, message: 'Server is running' })
})

app.get('/chat-discussions', (req, res) => {
  res.json({ status: 200, data: chatData })
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

