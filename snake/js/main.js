
const Snake = require('./snake')
const Board = require('./board')
const Coord = require('./coord')
const SnakeView = require('./snake-view')

$(function() {
  const game = new SnakeView($('.snake'))
  window.game = game;
});
