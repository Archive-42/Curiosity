const readline = require("readline");
const game = require("../game");

function Human (color) {
  // No attributes needed?
  this.color = color;
};

let rlInterface;

rlInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

Human.prototype.takeTurn = function (handleResponse) {
  
  rlInterface.question(
    `${this.turn}, where do you want to move?`,
    invokeHandleReponse
  );
  function invokeHandleReponse(answer) {
    pos = JSON.parse(answer);
    handleResponse(pos);
  }
};