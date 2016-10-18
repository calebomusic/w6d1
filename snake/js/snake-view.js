const Board = require('./board')
const Apple = require('./apple')

class SnakeView {
  constructor(el) {
    this.board = new Board()
    this.snake = this.board.snake
    this.el = el
    this.listener()
    this.setUpGrid()
    this.setUpSnake()
    this.setUpApple()
    this.interval = setInterval(this.step.bind(this), 200)
  }

  step() {
    this.board.snake.move(this.apple);

    this.snake.segments.forEach( (pos) => {
      let [x, y] = pos;

      this.board.grid[x][y] = this.snake;
    })

    if (this.snake.bumpIntoSelf()) {
      alert("You died!");
      clearInterval(this.interval);
    }

    this.render();
  }

  render() {
    $('.cell').removeClass('snake-body');
    this.snake.segments.forEach((pos) => {
      let [x, y] = pos
      $(`#${x}-${y}`).addClass("snake-body");
    })

    $('.cell').removeClass('apple');
    let [x, y] = [this.apple.pos[0], this.apple.pos[1]]
    $(`#${x}-${y}`).addClass("apple");
  };

  setUpGrid() {
    this.board.grid.forEach ( (row, i) => {
      let $row = $(`<div id="${i}"></div>`)
      $row.addClass('row')
      this.el.append($row)
      row.forEach( (col, j) => {
        let $col = $(`<div id="${i}-${j}"></div>`)
        $col.data("pos", [i, j])
        $col.addClass('cell')
        $row.append($col)
      })
    })
  };

  setUpSnake() {
    let middle = Math.floor((this.board.grid.length - 1)/2)
    $(`#${middle}-${middle}`).addClass("snake-body")
  }

  setUpApple() {
    this.apple = new Apple(this.board.grid.length);
    let x = this.apple.pos[0];
    let y = this.apple.pos[1];

    this.board.grid[x][y] = this.apple;
    $(`#${x}-${y}`).addClass('apple');
  }

  listener() {
    $(window).on('keydown', (e)=>{
      let key = this.handleKey(e.keyCode);

      if (key) {
        this.board.snake.turn(key);
      }
    })
  }

  handleKey(code) {
    let index = code - 37
    let arr = ["W", "N", "E", "S"]
    return arr[index]
  }

}

module.exports = SnakeView
