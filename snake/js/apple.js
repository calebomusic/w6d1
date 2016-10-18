const Coord = require('./coord.js')

class Apple {
  constructor(size) {
    this.pos = this.randomPosition(size);
  }

  randomPosition(size) {
    let x = Math.floor(Math.random() * size)
    let y = Math.floor(Math.random() * size)
    return [x, y]
  }

  regeneratePosition(size) {
    this.pos = this.randomPosition(size);
  }
}

module.exports = Apple
