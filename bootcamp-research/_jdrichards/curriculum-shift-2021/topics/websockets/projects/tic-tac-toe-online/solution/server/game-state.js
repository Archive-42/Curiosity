/* eslint-disable max-classes-per-file */

class Player {
  constructor(playerName, ws) {
    this.playerName = playerName;
    this.ws = ws;
  }

  getData() {
    return {
      playerName: this.playerName,
    };
  }
}

class Game {
  constructor(player1) {
    this.player1 = player1;
    this.player2 = null;
    this.player1Symbol = 'X';
    this.player2Symbol = 'O';
    this.currentPlayer = player1;
    this.squareValues = ['', '', '', '', '', '', '', '', ''];
    this.gameOver = false;
    this.winner = null;
    this.statusMessage = null;
  }

  get gameOverMessage() {
    if (this.winner !== null) {
      return `Winner: ${this.winner.playerName}`;
    }
    return 'Winner: Draw!';
  }

  getPlayers() {
    return [this.player1, this.player2];
  }

  selectSquare(player, squareIndex) {
    if (this.squareValues[squareIndex] !== '') {
      return;
    }

    const symbol = this.player1.playerName === player.playerName
      ? this.player1Symbol : this.player2Symbol;
    this.squareValues[squareIndex] = symbol;

    this.currentPlayer = symbol === this.player1Symbol
      ? this.player2 : this.player1;
  }

  checkGameStatus() {
    const { squareValues } = this;

    // Declare an array that contains arrays of the possible
    // winning combinations of the game board square indexes.
    const values = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Map over the array of values to index into the square values array
    // to check if any of the winning combinations of game board square indexes
    // contain the same values (i.e. either "X" or "O"). Using a filter to
    // remove all `null` elements from the array that's returned by the
    // `map` method results in a final `gameStatus` array with either no elements
    // or a single element containing the winning player symbol (i.e "X" or "O").
    const gameStatus = values
      .map((v) => {
        if (squareValues[v[0]] !== '' && squareValues[v[0]] === squareValues[v[1]]
            && squareValues[v[0]] === squareValues[v[2]]) {
          return squareValues[v[0]];
        }
        return null;
      })
      .filter((v) => v !== null);

    // The game is over if either:
    // 1) The game status array contains an element; or
    // 2) All of the elements in the square values array are non-empty strings.
    if (gameStatus.length === 1) {
      this.gameOver = true;
      this.winner = gameStatus[0] === this.player1Symbol ? this.player1 : this.player2;
    } else if (squareValues.filter((v) => v !== '').length === 9) {
      this.gameOver = true;
    }

    // Return the `gameOver` property so that this method
    // can be called from within a conditional statement expression.
    return this.gameOver;
  }

  getData() {
    return {
      player1: this.player1.getData(),
      player2: this.player2.getData(),
      player1Symbol: this.player1Symbol,
      player2Symbol: this.player2Symbol,
      currentPlayer: this.currentPlayer.getData(),
      squareValues: this.squareValues,
      gameOver: this.gameOver,
      winner: this.winner ? this.winner.getData() : null,
      statusMessage: this.statusMessage,
    };
  }
}

module.exports = {
  Game,
  Player,
};
