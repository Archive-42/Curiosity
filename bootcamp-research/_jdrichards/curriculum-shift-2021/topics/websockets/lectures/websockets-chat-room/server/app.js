
const express = require('express');
const path = require('path');
const { createServer } = require('http');
const morgan = require('morgan');
const WebSocket = require('ws');

const { port } = require('./config');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (jsonData) => {
    console.log(`Processing incoming message ${jsonData}...`);

    const message = JSON.parse(jsonData);
    const chatMessage = message.data;

    const addChatMessage = {
      type: 'add-chat-message',
      data: chatMessage,
    };
    const jsonAddChatMessage = JSON.stringify(addChatMessage);
    console.log(`Sending message ${jsonAddChatMessage}...`);

    wss.clients.forEach((client) => {
      // Ready states include:
      // CONNECTING, OPEN, CLOSING, CLOSED
      if (client.readyState === WebSocket.OPEN) {
        client.send(jsonAddChatMessage);
      }
    });
  });

  ws.on('close', (e) => {
    console.log(e);
  });
});

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
