const Board = require('./board.js');
const Player = require('./player.js');

class Game {
  constructor(reader) {
    this.player1 = new Player(reader);
    this.player2 = new Player(reader);
    this.board = new Board();
    this.players = [player1, player2];
  }

  currentPlayer() {
    return this.players[0];
  }

  switchPlayer() {
    this.players.rotate();
  }

  run(reader, completionCallback) {
    while (!this.board.gameOver()) {
      let position = this.currentPlayer().promptMove(reader);
      this.board.placeMark(position, this.currentPlayer().mark);
      this.switchPlayer();
    }
    const winner = this.board.won();
    if (winner) {
      console.log(`${winner} wins!`)
    } else {
      console.log("ITS A DRAW!")
    }
    completionCallback();
  }
}

module.exports = Game;