const Game = require('../../solution/game');

class View {
  constructor(game, $el) {
    this.game = new Game()
  }

  bindEvents() {
    $('.grid li').on('click', (e) => {
      this.makeMove($(e.currentTarget))
    });
  }

  makeMove($square) {
    let pos = $square.data('pos')
    this.game.playMove(pos)
    if (this.game.currentPlayer == "o") {
      $square.addClass("o-cell").removeClass("unselected").text('O');
    } else {
      $square.addClass("x-cell").removeClass("unselected").text('X');
    }

    if (this.game.isOver()) {
      alert(this.game.currentPlayer + " is the winner!")
    }
  }


  setupBoard() {
    $('.ttt').append('<ul class="grid"></ul>')
    $('.grid').append('<div class="first"><li class="first-row unselected"></li><li class="first-row unselected"></li><li class="first-row unselected"></li></div>')
    $('.grid').append('<div class="second"><li class="second-row unselected"></li><li class="second-row unselected"></li><li class="second-row unselected"></li></div>')
    $('.grid').append('<div class="third"><li class="third-row unselected"></li><li class="third-row unselected"></li><li class="third-row unselected"></li></div>')

    for (var i = 0; i < $('.grid li').length; i++) {
      $($('.grid li')[i]).data('pos', [i % 3, Math.floor(i / 3)]);
    }
  }
}

module.exports = View;
