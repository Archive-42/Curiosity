import { Column } from "./column.js";
import { ColumnWinInspector } from "./columnWinInspector.js";



export class Game {
  constructor(player1Name, player2Name) {
    this.player1Name = player1Name.value;
    this.player2Name = player2Name.value;
    this.currentPlayer = 1;
    this.columns = [new Column(), new Column(), new Column(), new Column(), new Column(), new Column(), new Column()];
    this.winnerNumber = 0;
  }
  getName() { // returns title string
    console.log(this.winnerNumber, "winnerNumber when getName");
    if (this.winnerNumber === 1) { // player 1 won game,
      return this.player1Name + " wins!";
    } else if (this.winnerNumber === 2) { // player 2 won game
      return this.player2Name + " wins!";
    } else if (this.winnerNumber === 3) { // a tie
      return "It's a tie";
    } else { // game continues
      return `${this.player1Name} vs ${this.player2Name}`;
    }
  }
  playInColumn(colNum) {
    this.columns[colNum].add(this.currentPlayer);
    // Switches player
    if (this.currentPlayer === 1) {
      this.currentPlayer = 2;
    } else {
      this.currentPlayer = 1;
    }
    this.checkForColumnWin();
  }
  getTokenAt(row, column) {
    return this.columns[column].getTokenAt(row);
  }
  isColumnFull(colNum) {
    return this.columns[colNum].isFull();
  }

  checkForColumnWin() { // use the colInspector class here once per column
    let winner;
    for (let i = 0; i < this.columns.length; i++) {
      let columnToInspect = new ColumnWinInspector(this.columns[i]);
      winner = columnToInspect.inspect();
      if (winner !== 0) {
        break;
      }
    }
    this.winnerNumber = winner;
  }

}
