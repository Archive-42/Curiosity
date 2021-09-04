const express = require('express');
const { Server } = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use((_req, res) => {
  res.render('home');
});


const websocketServer = new Server({
  server,
  path: '/ws',
  clientTracking: true,
});
websocketServer.on('connection', socket => {
  console.log('got client');

  socket.on('message', message => {
    websocketServer.clients.forEach(client => {
      client.send(message);
    });
  });
});


const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Now listening on port ${port}...`));
