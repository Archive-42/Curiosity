
const express = require('express');
const path = require('path');
const { createServer } = require('http');
const morgan = require('morgan');
const WebSocket = require('ws');

const { port } = require('./config');
const { Game, Player } = require('./game-state');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = createServer(app);

const wss = new WebSocket.Server({ server });

let game = null;

const broadcastMessage = (type, data, players) => {
  const message = JSON.stringify({
    type,
    data,
  });

  console.log(`Broadcasting message ${message}...`);

  players.forEach((player) => {
    player.ws.send(message, (err) => {
      if (err) {
        // TODO Handle errors.
        console.error(err);
      }
    });
  });
};

const startGame = () => {
  const data = game.getData();
  data.statusMessage = `Select a square ${game.currentPlayer.playerName}!`;
  broadcastMessage('start-game', data, game.getPlayers());
};

const addNewPlayer = (playerName, ws) => {
  const player = new Player(playerName, ws);

  if (game === null) {
    game = new Game(player);
  } else if (game.player2 === null) {
    game.player2 = player;
    startGame();
  } else {
    // TODO Ignore any additional player connections.
    console.log(`Ignoring player ${playerName}...`);
    ws.close();
  }
};

const endGame = () => {
  const players = game.getPlayers();
  const data = game.getData();
  data.statusMessage = game.gameOverMessage;
  broadcastMessage('end-game', data, players);
};

const updateGame = () => {
  const players = game.getPlayers();
  const data = game.getData();
  data.statusMessage = `Select a square ${game.currentPlayer.playerName}!`;
  broadcastMessage('update-game', data, players);
};

const selectGameSquare = (squareIndex, ws) => {
  const player = game.getPlayers().find((p) => p.ws === ws);

  game.selectSquare(player, squareIndex);

  if (game.checkGameStatus()) {
    endGame();
    game = null;
  } else {
    updateGame();
  }
};

const processIncomingMessage = (jsonData, ws) => {
  console.log(`Processing incoming message ${jsonData}...`);

  const message = JSON.parse(jsonData);

  switch (message.type) {
    case 'add-new-player':
      addNewPlayer(message.data.playerName, ws);
      break;
    case 'select-game-square':
      selectGameSquare(message.data.squareIndex, ws);
      break;
    default:
      throw new Error(`Unknown message type: ${message.type}`);
  }
};

wss.on('connection', (ws) => {
  ws.on('message', (jsonData) => {
    processIncomingMessage(jsonData, ws);
  });

  ws.on('close', () => {
    // If there's a game available...
    if (game !== null) {
      const { player1, player2 } = game;

      // If the closed WS belonged to either player 1 or player 2
      // then we need to abort the game.
      if (player1.ws === ws || (player2 !== null && player2.ws === ws)) {
        // If the closed WS doesn't belong to player 1
        // then close their WS, otherwise if there's a
        // player 2 then close their WS.
        if (player1.ws !== ws) {
          player1.ws.close();
        } else if (player2 !== null) {
          player2.ws.close();
        }
        game = null;
      }
    }
  });
});

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
