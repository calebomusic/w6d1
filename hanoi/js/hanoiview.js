class HanoiView {
  constructor(game, el) {
    this.game = game;
    this.el = el;
    this.setupTowers(el);
    this.render();
    this.clicked = [];
    this.clickTower();
  }

  setupTowers() {
    $(this.el).append("<ul class='first-tower' id='0'></ul>")
    $(this.el).append("<ul class='second-tower' id='1'></ul>")
    $(this.el).append("<ul class='third-tower' id='2'></ul>")
    $(".first-tower").append("<li class='top-slot'></li><li class='middle-slot'></li><li class='bottom-slot'></li>")
    $(".second-tower").append("<li class='top-slot'></li><li class='middle-slot'></li><li class='bottom-slot'></li>")
    $(".third-tower").append("<li class='top-slot'></li><li class='middle-slot'></li><li class='bottom-slot'></li>")
  }

  render() {
    let pos = [];
    $('li').removeClass('stone-1').removeClass('stone-2').removeClass('stone-3');
    this.game.towers.forEach( (tower, i) => {
      tower.forEach( (stone, j) => {
      $($('ul')[i].children[2 - j]).addClass(`stone-${stone}`);
      })
    })
  };

  clickTower() {
    $(".first-tower, .second-tower, .third-tower").click((e) => {
      this.clicked.push(parseInt(e.currentTarget.id));
      console.log(this.clicked);
      if (this.clicked.length == 2) {
        this.game.move(...this.clicked)
        this.clicked = []
      }
      this.render();
      if (this.game.isWon()) {
        // alert("You won the game!")
      }
    })
  }

};


module.exports = HanoiView
