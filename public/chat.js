'use strict';

const socket = io();
const channel = 'chat message'

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const inp = document.getElementById('m');
  socket.emit(channel, inp.value);
  inp.value = '';
});

socket.on(channel, (msg) => {
  const item = document.createElement('li');
  item.innerHTML = msg;
  const list = document.getElementById('messages');
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
});
