export class Column {
  constructor() {
    this.columnTokens = ['', '', '', '', '', ''];
  }
  add(currentPlayer) {
    let counter = 0;
    for (let i = this.columnTokens.length - 1; i >= 0; i--) {
      if (!this.columnTokens[i] && counter === 0) {
        this.columnTokens[i] = currentPlayer;
        counter++
      }
    }
    console.log(this.columnTokens)
  }

  isFull() {
    if (this.columnTokens[0]) {
      return true;
    } else {
      return false;
    }
  }

  getTokenAt(rowNum) {
    return this.columnTokens[rowNum];
  };

}



// Look at later, it was at the top
// On board refresh, pass in the row and column to the getTokenAt method. That method will return null if the square is empty, 1 if player one's token is there, or 2 if player two's token is there.