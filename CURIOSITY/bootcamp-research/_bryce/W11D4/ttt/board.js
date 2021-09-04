class Board {
  constructor(){
    this.grid = Array(3).fill(" ");
    this.grid.forEach((row, i) => {
      this.grid[i] = Array(3);
    });
  }

  empty(pos) {
    return !this.grid[pos[0]][pos[1]];
  }

  placeMark(pos, mark) {
    if (this.empty(pos)) {
      this.grid[pos[0]][pos[1]] = mark;
    } else {
      throw "Invalid move";
    }
  }

  won() {
    let winner;
    Board.WINNING_MOVES.forEach((line)=> {
      let mark = this.grid[line[0][0]][line[0][1]];
      if (!mark) return;
      if (this.grid[line[0][0]][line[0][1]] === this.grid[line[1][0]][line[1][1]] && this.grid[line[0][0]][line[0][1]] === this.grid[line[2][0]][line[2][1]] ) winner = mark;
    });
    return winner;
  }

  gameOver() {
    let full = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.empty([i, j])) full = false;
      }
    }
    return !!this.won() || full;
  }

}

Board.WINNING_MOVES = [
  [ [0, 0], [0, 1], [0, 2] ],
  [ [1, 0], [1, 1], [1, 2] ],
  [ [2, 0], [2, 1], [2, 2] ],
  [ [0, 0], [1, 0], [2, 0] ],
  [ [0, 1], [1, 1], [2, 1] ],
  [ [0, 2], [1, 2], [2, 2] ],
  [ [0, 0], [1, 1], [2, 2] ],
  [ [2, 0], [1, 1], [0, 2] ]
];

module.exports = Board;

// const board = new Board();
// console.log(board.empty([0,0]));
// board.place_mark([0,0], "X");
// board.place_mark([1,1], "X");
// board.place_mark([2,2], "O");
// console.log(board.won());