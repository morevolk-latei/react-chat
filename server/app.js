var express = require("express");
var app = express();
var socket = require("socket.io");
const cors = require("cors")
const { chatStore, usersStore } = require('./utils/datastore')
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
  res.json({ status: 200, data: { usersStore, chatStore } })
})

app.get('/login', (req, res) => {
  const { query: { personateUser: userIdToPersonate } } = req
  console.log('userIdToPersonate === ', userIdToPersonate)

  let isUserFound = false
  usersStore.users.forEach(user => {
    if (user.id == userIdToPersonate) {
      user.isLoggedIn = true
      isUserFound = true
    } else {
      user.isLoggedIn = false
    }
  })

  isUserFound ?
    res.json({ users: usersStore.users, status: 200, message: 'LoggedIn successfully' }) :
    res.status(404).json({ message: `User with id ${userIdToPersonate} not found`, status: 404 })
})

var io = socket(server, {
  cors: corsOptions
});

function updateChats(fromUserId, toUserId, message, isOwner) {
  const newChatObj = {
    createdAt: new Date().getTime(),
    isOwner,
    text: message
  }

  chatStore[fromUserId].forEach((chat) => {
    if (chat.userId == toUserId) {
      chat.messages.push(newChatObj)
    }
  })

  return newChatObj
}

const connectedClients = {}
const onlineUsers = {}

io.on("connection", function (socket) {
  console.log('new user connected ', socket.id);

  socket.on('JOIN', (data) => {
    const { currentUserId, requestedUserId } = data

    onlineUsers[currentUserId] = {
      socket
    }

    console.log(`\nUser ${currentUserId} Joined the chat with ${requestedUserId} \n`)
    console.log('=================\n')
    console.log('online users = ', onlineUsers, '\n\n')
    // connectedClients[socket.id] = { socket, userId: userData.id }
    // onlineUsers[userData.id] = { ...userData, socketId: socket.id }
    // io.emit('USER_ONLINE', { userId: userData.id });
  });

  socket.on('disconnect', () => {
    if (connectedClients[socket.id]) {
      console.log(`
        User 
        ${onlineUsers[connectedClients[socket.id].userId].username}
        ${connectedClients[socket.id].userId} 
        diconnected the chat and offline \n\n`)

      io.emit('USER_OFFLINE', { userId: connectedClients[socket.id].userId });
      delete onlineUsers[connectedClients[socket.id].userId]
      delete connectedClients[socket.id]
    }
  });

  socket.on("SEND_MESSAGE", (data) => {
    console.log('Sending message to ', data.to, ' from ', data.from)

    // insert current message to data.to user chat from data.from user
    const fromChatObj = updateChats(data.from, data.to, data.message, true)
    const toChatObj = updateChats(data.to, data.from, data.message, false)

    if (onlineUsers[data.to]) {
      // only emit socket if to user is online
      onlineUsers[data.to].socket.emit('NEW_MESSAGE', toChatObj)
    }

    if (onlineUsers[data.from]) {
      onlineUsers[data.from].socket.emit('NEW_MESSAGE', fromChatObj)
    }
    // onlineUsers[onlineUsers[data.from].socketId].socket.emit('NEW_MESSAGE', { message: data.message })
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data)
  });

  socket.on('GET_ALL_CHATS', (userData) => {
    console.log(`Sending user ${userData.username}#${userData.id} all chats`)
    socket.emit('ALL_CHATS', chatStore[userData.id])
  })
});



// client (websocket client) (JS) (WebSocket) (socket.io) <-> server + (websocket server) (NodeJs) (ws) (socket.io)

