/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	const Snake = __webpack_require__(1)
	const Board = __webpack_require__(2)
	const Coord = __webpack_require__(3)
	const SnakeView = __webpack_require__(4)

	$(function() {
	  const game = new SnakeView($('.snake'))
	  window.game = game;
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(1)

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Apple = __webpack_require__(5)
	const Snake = __webpack_require__(1)

	class Coord {
	  plus() {}
	  equals() {

	  }
	  isOpposite() {}
	}

	module.exports = Coord


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2)
	const Apple = __webpack_require__(5)

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(3)

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


/***/ }
/******/ ]);