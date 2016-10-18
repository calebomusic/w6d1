const Snake = require('./snake')

class Board {
  constructor() {
    this.grid = this.defaultGrid();
    let middle = Math.floor((this.grid.length - 1) / 2)
    let pos = [middle, middle]
    this.snake = new Snake(pos);
  }

  defaultGrid() {
    let grid = []

    for (let i = 0; i < 21; i++) {
      grid[i] = []
      for (let j = 0; j < 21; j++) {
        grid[i][j] = [i, j]
      }
    }

    return grid;
  }

}

module.exports = Board;
