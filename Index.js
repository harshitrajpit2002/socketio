const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.resolve('./Public')));

io.on('connection', (socket) => {
  socket.on('user-message', (message) => {
    console.log("new user message", message);
    io.emit('message', message);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Public/Index.html'));
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});