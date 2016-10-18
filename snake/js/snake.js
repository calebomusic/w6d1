class Snake {
  constructor(pos) {
    this.direction = "N";
    this.segments = [pos];
  }

  move(apple) {
    let curr_pos = this.segments[0];

    if (this.direction === "N") {
      this.segments.unshift([curr_pos[0], curr_pos[1] - 1]);
    } else if (this.direction === "S") {
      this.segments.unshift([curr_pos[0], curr_pos[1] + 1]);
    } else if (this.direction === "E") {
      this.segments.unshift([curr_pos[0] + 1, curr_pos[1]]);
    } else {
      this.segments.unshift([curr_pos[0] - 1, curr_pos[1]]);
    }

    if (apple.pos[0] == curr_pos[0] && apple.pos[1] == curr_pos[1]) {
      apple.regeneratePosition(21,21)
    } else {
      this.segments.pop();
    }
  }

  turn(new_dir) {
    if (!this.isOpposite(new_dir)) {
      this.direction = new_dir
    }
  }

  isOpposite(new_dir) {
    let old_dir = this.direction;

    if (old_dir === 'E' && new_dir === 'W' || old_dir === 'W' && new_dir === 'E') {
      return true;
    } else if (old_dir === 'N' && new_dir === 'S' || old_dir === 'S' && new_dir === 'N') {
      return true;
    } else {
      return false;
    }
  }

  bumpIntoSelf() {
    for (let i = 0; i < this.segments.length - 1; i++) {
      for (let j = i + 1; j < this.segments.length; j++) {
        if (this.segments[i][0] == this.segments[j][0] && this.segments[i][1] == this.segments[j][1]) {
          return true;
        }
      }
    }
    return false;
  }


  static DIRS() { return ["N", "E", "S", "W"]; }
}


module.exports = Snake;
