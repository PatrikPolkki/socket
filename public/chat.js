'use strict';

const socket = io();
const channel = 'chat message';
const room = 'room';

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const inpM = document.getElementById('m');
  const inpN = document.getElementById('n');
  const selectRoom = document.getElementById('room');
  socket.emit(channel, inpN.value, inpM.value, selectRoom.value);
  inpN.value = '';
  inpM.value = '';
});

document.querySelector('select').addEventListener('change', (event) => {
  event.preventDefault();
  const selectRoom = document.getElementById('room');
  console.log(selectRoom.value);
  socket.emit(room, selectRoom.value);
});

socket.on(channel, (msg) => {
  const item = document.createElement('li');
  item.innerHTML = msg;
  const list = document.getElementById('messages');
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
});

socket.on(room, (room) => {
  const item = document.createElement('li');
  item.innerHTML = room;
  const list = document.getElementById('messages');
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
});
