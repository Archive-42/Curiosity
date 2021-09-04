window.addEventListener('DOMContentLoaded', () => {
  const blue = document.getElementById('blue');
  const green = document.getElementById('green');
  const grey = document.getElementById('grey');
  const reset = document.getElementById('reset');
  const box = document.getElementById('box');

  const socket = new WebSocket('ws://localhost:8000/ws');
  socket.addEventListener('message', message => {
    setBox(message.data);
  });

  function sendMessage(className) {
    socket.send(className);
  }

  function setBox(className) {
    box.className = '';
    if (className) box.classList.add(className);
  }

  blue.addEventListener('click', () => {
    // setBox('blue');
    sendMessage('blue');
  });

  green.addEventListener('click', () => {
    // setBox('green');
    sendMessage('green');
  });

  grey.addEventListener('click', () => {
    // setBox('grey');
    sendMessage('grey');
  });

  reset.addEventListener('click', () => {
    // setBox('');
    sendMessage('');
  });
});
