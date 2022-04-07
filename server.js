'use strict';

import dotenv from 'dotenv';
import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';

dotenv.config();

const app = express();
app.use(express.static('public'));
const http = createServer(app);
const io = new Server(http);
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('disconnect', () => {
    console.log('a user disconnected', socket.id);
  });

  socket.on('chat message', (user, msg, room) => {
    console.log('message:', msg);
    io.to(room).emit('chat message', user + ' says ' + msg);
  });

  socket.on('room', (room) => {
    socket.rooms.forEach((r) => {
      socket.leave(r);
    });
    socket.join(room);
    socket.emit('room', room);
  });
});

http.listen(port, () => {
  console.log(`Socket.io chat app listening on port ${port}!`);
});
