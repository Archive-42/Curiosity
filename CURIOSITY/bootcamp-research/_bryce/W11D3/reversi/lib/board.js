let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let grid = new Array(8);
  for (let i = 0; i < 8; i++) {
    grid[i] = new Array(8);
  }
  grid[3][4] = new Piece("black");
  grid[4][3] = new Piece("black");

  grid[3][3] = new Piece("white");
  grid[4][4] = new Piece("white");

  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (!this.isValidPos(pos)) {
    throw Error("Not valid pos!");
  }
  let [x,y] = pos;
  return this.grid[x][y];
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return this.validMoves(color).length > 0;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  const piece = this.getPiece(pos);
  if (piece) {
    return piece.color === color;
  } else {
    return false;
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return !!this.getPiece(pos);
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return !this.hasMove('black') && !this.hasMove('white');
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  const [x, y] = pos;
  return [0, 1, 2, 3, 4, 5, 6, 7].includes(x) && [0, 1, 2, 3, 4, 5, 6, 7].includes(y);
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
  let nextPos = [pos[0] + dir[0], pos[1] + dir[1]];
  if (!board.isValidPos(nextPos)) {
    return null;
  } else if (!board.isOccupied(nextPos)) {
    return null;
  } else if (board.isMine(nextPos, color)) {
    return piecesToFlip;
  }
  piecesToFlip.push(board.getPiece(nextPos));
  return _positionsToFlip(board, nextPos, color, dir, piecesToFlip);
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (!this.validMove(pos, color)) {
    throw Error('Invalid Move');
  } 
  let [x,y] = pos;
  let positionsToFlip = [];
  const board = this;
  Board.DIRS.forEach(function(dir) {
    let innerFlips = _positionsToFlip(board, pos, color, dir, []);
    if (innerFlips && innerFlips[0]) {
      positionsToFlip = positionsToFlip.concat(innerFlips);
    }
  });
  this.grid[x][y] = new Piece(color);
  positionsToFlip.forEach(function(el) {
    el.flip();
  });
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  console.log("  0  1  2  3  4  5  6  7 ");
  for (let i = 0; i < this.grid.length; i++) {
    let row = `${i}`;
    for (let j = 0; j < this.grid.length; j++) {
      if (this.isOccupied([i,j])) {
        row += ` ${this.getPiece([i,j]).toString()} `;
      } else {
        row += "   ";
      }
    }
    console.log(row);
  }
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) {
    return false;
  }
  for(let i = 0; i < Board.DIRS.length; i++) {
    const toFlip = _positionsToFlip(this, pos, color, Board.DIRS[i], []);
    if (toFlip && toFlip[0]) {
      return true;
    }
  }
  return false;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  const moves = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (this.validMove([i,j], color)) {
        moves.push([i,j]);
      }
    }
  }
  return moves;
};

module.exports = Board;
