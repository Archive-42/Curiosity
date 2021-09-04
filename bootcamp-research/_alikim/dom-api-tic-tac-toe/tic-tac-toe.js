window.addEventListener("DOMContentLoaded", function(){
    const board = document.getElementById("tic-tac-toe-board");
// Check x/o turn, draw x/o if box is empty
    let xTurn = true
    let counter = 0;
    board.addEventListener("click", function(event){
        if(document.getElementById("game-status").innerHTML !== ""){
            return "gameDone"
        }
        if (xTurn && ![...event.target.classList].includes("x-move") && ![...event.target.classList].includes("o-move")) {
            event.target.classList.add("x-move")
            counter++
            xTurn = false;
        } else if (!xTurn && ![...event.target.classList].includes("x-move") && ![...event.target.classList].includes("o-move")) {
            event.target.classList.add("o-move");
            counter++
            xTurn = true;
        }
        checkWinner(event.target);
        checkTie();
        if(document.getElementById("game-status").innerHTML !== ""){
            enableNewGame();
        }
    })

function checkWinner(div) {
// Check the id of the last move, compare and check if there's a winner, return x/o/null
    // let classes = div.classList
    let classForWhichToSearch = searchClass()
    let row = Math.floor(div.id.split("-")[1]/3) + 1;
    let column = (div.id.split("-")[1] % 3) + 1;
    if (checkRows(row, classForWhichToSearch)) {
      document.getElementById("game-status").innerHTML = `Winner: ${classForWhichToSearch.split("-")[0].toUpperCase()}`
    }
    if (checkColumns(column, classForWhichToSearch)) {
        document.getElementById("game-status").innerHTML = `Winner: ${classForWhichToSearch.split("-")[0].toUpperCase()}`
    }
    if(checkDiagonal(classForWhichToSearch)){
        document.getElementById("game-status").innerHTML = `Winner: ${classForWhichToSearch.split("-")[0].toUpperCase()}`
    }
}

function checkTie(){
    if(counter === 9){
        document.getElementById("game-status").innerHTML = `Winner: None`;
    } else{
        return false;
    }
}

function searchClass(){
    let searchClass;
    if (xTurn) {
      searchClass = "o-move";
    } else {
      searchClass = "x-move";
    }
    return searchClass
}

function checkDiagonal(searchClass){
    if(![...document.getElementById("square-4").classList].includes(searchClass)){
        return false
    } else if([...document.getElementById("square-0").classList].includes(searchClass) && [...document.getElementById("square-8").classList].includes(searchClass)){
        return true;
    } else if([...document.getElementById("square-2").classList].includes(searchClass) && [...document.getElementById("square-6").classList].includes(searchClass)){
        return true;
    }
    return false
}

function checkColumns(num, searchClass) {
  const colNodes = document.querySelectorAll(".col-" + num)
  for (let i = 0; i < colNodes.length; i++) {
    if (![...colNodes[i].classList].includes(searchClass)) {
      return false;
    };
  };
  return true;
}

function checkRows(num, searchClass) {
  const rowNodes = document.querySelectorAll(".row-" + num)
  for (let i = 0; i < rowNodes.length; i++) {
    if (![...rowNodes[i].classList].includes(searchClass)) {
      return false;
    };
  };
  return true;
  }



// NEW GAME

function enableNewGame() {
  document.getElementById("new-game").disabled = false;
}

function newGame() {}


})