// Require
const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const userRoutes = require('./Routes/userRoutes');
const messageRoutes = require('./Routes/messageRoutes');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

// app.use
app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to Chat DB');
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log('SERVER RUNNING ON PORT', process.env.PORT);
});
const io = socket(server, {
  cors: {
    origin: [
      'https://e2-chat-app.netlify.app',
      'https://e2-chat-app.herokuapp.com',
      'http://localhost:3000',
    ],
    credentials: true,
  },
});
global.onlineUsers = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.on('send-msg', (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit('msg-receive', data);
      }
    });
  });
});
