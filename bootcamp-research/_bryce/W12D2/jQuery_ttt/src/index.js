const View = require('./ttt-view'); // require appropriate file
const Game = require('./game'); // require appropriate file

  $(() => {
    // Your code here
    const game = new Game();
    const view = new View(game,$('.ttt'));
  });
