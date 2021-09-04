import { Game } from "./game.js";


let boardHolder = document.getElementById("board-holder");
let newGame = document.getElementById("new-game");
let gameName = document.getElementById("game-name");
let game = undefined;
let clickTargets = document.getElementById("click-targets");

window.addEventListener("DOMContentLoaded", ev => {
  let player1Name = document.getElementById("player-1-name");
  let player2Name = document.getElementById("player-2-name");
  player1Name.addEventListener("keyup", ev => { // TESTED
    handlePlayerName(player1Name, player2Name);
  })
  player2Name.addEventListener("keyup", ev => { // TESTED
    handlePlayerName(player1Name, player2Name);
  });

  // START NEW GAME
  newGame.addEventListener("click", ev => { //
    game = new Game(player1Name, player2Name);
    player1Name.value = "";
    player2Name.value = "";
    newGame.disabled = "true";
    updateUI();
  });
});


// PLAYER GAME-CLICK START
clickTargets.addEventListener("click", ev => {
  if (!ev.target.id.includes("column") || !game) {
    return;
  };
  let colNumber = Number.parseInt(ev.target.id[ev.target.id.length-1]);
  game.playInColumn(colNumber); // switches players, then [blank]
  checkForTie(game);
  updateUI(); // refresh visuals
  // check columns, next todo?
});


// checks if gameboard should be drawn.
// changes color indicator of player-token
function updateUI() { // TESTED
  if (game === undefined) {
    boardHolder.classList.add("is-invisible");
  } else {
    boardHolder.classList.remove("is-invisible");
    gameName.innerHTML = game.getName();
    changeTokenColor();
    for(let ri = 0; ri <= 5; ri++){
      for(let ci = 0; ci <= 6; ci++) {
        let column = document.getElementById("column-"+ci);
        if (game.isColumnFull(ci)) {
          column.classList.add("full");
        } else {
          column.classList.remove("full");
        }
        let square = document.getElementById(`square-${ri}-${ci}`);
        let token = game.getTokenAt(ri, ci);
        square.innerHTML = '';
        putToken(token, square)
      }
    }
  }
}

// Check each column for if it's full
function checkForTie(game) {
  let isFull = true;
  for (let i = 0; i <= 6; i++) {
    if (!game.isColumnFull(i)) {
      return isFull = false;
    }
  }
  game.winnerNumber = 3;
  return isFull;
};

// Task - change color of placing-token-indicator (not board tokens)
function changeTokenColor(){
  let playerNow, playerOff; 
  if (game.currentPlayer === 1) {
    playerNow = "red";
    playerOff = "black";
  } else {
    playerNow = "black";
    playerOff = "red";
  }
  clickTargets.classList.add(playerNow);
  clickTargets.classList.remove(playerOff);
}

// Check if player name inputs have names
function handlePlayerName(player1Name, player2Name) { // TESTED
  if (player1Name.value !== "" && player2Name.value !== "") {
    newGame.removeAttribute("disabled");
  } else {
    newGame.setAttribute("disabled", "true");
  }
}

// Add 'token red/black' classes to clicked div spot
function putToken(token, square) { // TESTED
  let tokenColor;
  // let square = document.getElementById(ev.target.id);
  let div = document.createElement("div");
  if (token === 1){
    tokenColor = "red";
  } else if (token === 2){
    tokenColor = "black"
  }
  div.classList.add(`token`, `${tokenColor}`);
  square.appendChild(div);
}

// GUIDELINES have specific walkthrough later, toss this
function checkColumnFull(columnDiv, columnSquares) { // CHANGE this function, obsolete. use class instead.
  for (let i = 0; i < columnSquares.length; i++) {
    if (!columnSquares[i].classList.includes("filled")) {
      return false;
    }
  }
  columnDiv.classList.add("full")
  return true
}
