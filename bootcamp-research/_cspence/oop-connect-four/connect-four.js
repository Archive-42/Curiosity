let board = [['', '', '', '', '', '', ''],
             ['', '', '', '', '', '', ''],
             ['', '', '', '', '', '', ''],
             ['', '', '', '', '', '', ''],
             ['', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '']];
let gameOver = false;
let tied;
let currentPlayer = true; //player 1: true: black, player 2: false: red
let fullCol = [false, false, false, false, false, false, false];
let player1 = '';
let player2 = '';
let spanId1 = "player-1";
let spanId2 = "player-2";

function startGame () {
    player1 = document.getElementById("player-1-name").value;
    player2 = document.getElementById("player-2-name").value;
    const playerNames = `<span id="player-1">${player1}</span> versus <span id="player-2">${player2}</span>`;
    document.getElementById("game-name")
            .innerHTML = playerNames;
    document.getElementById('game-name').style.textAlign = 'center';
    document.getElementById((currentPlayer) ? spanId1 : spanId2).style.fontSize = '32pt';
    document.getElementById((currentPlayer) ? spanId2 : spanId1).style.fontSize = '16pt';

    document.getElementById('new-game').disabled = true;
}


function makeMove (event) {
    //select column to place token
    let playId = event.target.id;
    let col = Number(playId.slice(playId.length - 1));

    //find the lowest available spot
    for (let i = 0; i < board.length; i++){
         if (board[i + 1] === undefined || board[i + 1][col] !== '') {
            // update board state (2D Array)
            board[i][col] = (currentPlayer) ? 'black' : "red";
            //get the specific square by ID
            let sqrId = `square-${i}-${col}`;
            let outerDiv = document.getElementById(sqrId);
            //create our token
            let innerDiv = document.createElement("div");
            //make the token div a token and change the color
            innerDiv.classList.add("token", (currentPlayer) ? 'black' : "red");// ternary operator
            //add the token to the board
            outerDiv.appendChild(innerDiv);
            break;
        }
    }
    document.getElementById((currentPlayer) ? spanId1 : spanId2).style.fontSize = '32pt';
    document.getElementById((currentPlayer) ? spanId2 : spanId1).style.fontSize = '16pt';
    if (checkGameState()) gameWon();
    if (board[0][col] !== '') removeTop(col);
    currentPlayer = !currentPlayer;
}

function gameWon() {
    if (tied) {
        document.getElementById("game-name")
            .innerHTML = `IT'S A TIE...`;
    } else {
        document.getElementById("game-name")
                .innerHTML = `${(currentPlayer) ? player1 : player2} WINS!!!!!`;
    }
    document.getElementById("game-name").style.fontSize = '48pt';
    document.getElementById("game-name").style.fontWeight = 'bolder';
    document.getElementById("game-name").style.color = 'gold';
    fullCol = [true, true, true, true, true, true, true];
    document.getElementById('new-game').disabled = false;
}

function removeTop (col) {
    fullCol[col] = true;
    let column = document.getElementById(`column-${col}`);
    column.classList.add("is-invisible");
    console.log(column, fullCol);
}

function hoverChange(event) {
    let hoverItem = document.getElementById(event.target.id);
    hoverItem.classList.add((currentPlayer) ? 'black' : 'red');
    hoverItem.classList.remove((currentPlayer) ? 'red' : 'black');
}

function checkGameState () {
    tied = true;
    console.table(board);
    for (let i = 0; i <  board.length; i++) {
        for (let j = 0; j < board[i].length; j++){
            if (board[i][j] === '') tied = false;

            if (i < 3) {
                //horizontal
                if (board[i][j] !== '' &&
                  board[i][j] === board[i + 1][j] &&
                  board[i][j] === board[i + 2][j] &&
                  board[i][j] === board[i + 3][j]) {
                    return true;
                }
            }

            if (j < 4) {
                //vertical
                if (board[i][j] !== '' &&
                  board[i][j] === board[i][j + 1] &&
                  board[i][j] === board[i][j + 2] &&
                  board[i][j] === board[i][j + 3]) {
                    return true;
                }
            }

            if (i < 3 && j < 4) {
                if (board[i][j] !== '' &&
                  board[i][j] === board[i + 1][j + 1] &&
                  board[i][j] === board[i + 2][j + 2] &&
                  board[i][j] === board[i + 3][j + 3]) {
                    return true;
                }
            }

            if (i > 2 && j < 4) {
                if (board[i][j] !== '' &&
                  board[i][j] === board[i - 1][j - 1] &&
                  board[i][j] === board[i - 2][j - 2] &&
                  board[i][j] === board[i - 3][j - 3]) {
                    return true;
                }
            }
        }
    }

    if (tied) return true;

    return false;
}

//The flow of things:
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('new-game').disabled = false;
    document.getElementById('click-targets').addEventListener('click', makeMove);
    document.getElementById('click-targets').addEventListener('mouseover', hoverChange);
    document.getElementById('new-game').addEventListener('click', startGame);
});
