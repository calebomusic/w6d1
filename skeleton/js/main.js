const View = require('./ttt-view');
const Game = require('../../solution/game');

$( () => {
  // Your code here
  let view = new View()
  view.setupBoard()
  view.bindEvents()
});
