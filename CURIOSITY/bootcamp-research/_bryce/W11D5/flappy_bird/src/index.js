const Game = require('./game.js');
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("bird-game");
  const flappyBird = new Game(canvas);
  flappyBird.restart();
});

// alert("Flappy Bird")