class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on('click','li', (event) => {
        const clickedLi = event.currentTarget;
        const $clicked = $(clickedLi);
        this.makeMove($clicked);
    });
  }

  makeMove($square) {
    let mark = this.game.currentPlayer;
    let pos = $square.data('pos');
    try {
      this.game.playMove(pos);
    } catch (error) {
      alert("Is not an empty position");
      return;
    }
    $square.addClass("marked");
    $square.addClass(mark);
    $square.text(mark);

    if (this.game.isOver()){
      this.$el.off("click");
      //grab winner
      //grab winner's square 
      //change winner square to winner class
      let winner = this.game.winner();
      let $body = $('body');
      if(winner){
        let $winnerSquares = $(`.${winner}`);
        $winnerSquares.removeClass();
        $winnerSquares.addClass("box");
        $winnerSquares.addClass("winner");
        
        const $loserSquares = $('li').not('.winner');
        $loserSquares.removeClass();
        $loserSquares.addClass("box");
        $loserSquares.addClass("loser");
        let winnerString = `You win, ${winner}!`;
        let $p = $('<p>');
        $p.text(winnerString);
        $body.append($p);
      } else {
        const $lis = $('li');
        $lis.removeClass();
        $lis.addClass("loser");
        $lis.addClass("box");
        let $p = $('<p>');
        $p.text("It's a draw");
        $body.append($p);
      }
    }
  }

  setupBoard() {
    const $ul = $('<ul>');
    $ul.addClass("grid");
    let col = 0;
    let row = 0;
    for (let index = 0; index < 9; index++) {

     const $li = $('<li>');
     $li.addClass("box");
     $li.data('pos', [row, col]);
      $ul.append($li);
      col++;
      if (col ===3){
        col = col % 3;
        row++;
      }
    }
    this.$el.append($ul);
  }
}

module.exports = View;
