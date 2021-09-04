class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.render();
    this.$el.on('click', 'ul', this.clickTower.bind(this));
  }

  setupTowers() {
      const $ul1 = $('<ul>');
      $ul1.addClass('0');
      const $ul2 = $('<ul>');
      $ul2.addClass('1');
      const $ul3 = $('<ul>');
      $ul3.addClass('2');

      this.$el.append($ul1);
      this.$el.append($ul2);
      this.$el.append($ul3);
  }

  render() {

    const $lis = $('li');
    $lis.remove();

    this.game.towers.forEach( (tower, idx) => {
      tower.forEach( (disc) => {
        const $li = $('<li>');
        switch (disc) {
            case 1:
                $li.toggleClass('small');    
                break;
            case 2:
                $li.toggleClass('medium');
                break;
            case 3:
                $li.toggleClass('large');
            }
        const $tower = $(`.${idx}`);
        $tower.append($li);
      });

    });
  }

  clickTower(event) {
    const clickedTower = event.currentTarget;
    const $tower = $(clickedTower);
    if (!this.selectedTower) {
      this.selectedTower = $tower;
      $tower.toggleClass("selected");
      return;
    }
    let startTower = parseInt(this.selectedTower.attr("class"));
    let endTower = parseInt($tower.attr("class"));
    if (this.game.isValidMove(startTower, endTower)){
        this.game.move(startTower,endTower);
        this.selectedTower.toggleClass("selected");
        this.render();
        this.selectedTower = null;
        if(this.game.isWon()){
            const $lis = $('li');
            $lis.toggleClass("win");
            this.$el.off("click", "ul");
            alert("Congrats.  Good Work");
        }
    } else {
        this.selectedTower.toggleClass("selected");
        this.selectedTower = null;
        alert("invalid move. please try again");
    }
  }
}
// $tower.attr("class")

module.exports = View;