const HanoiGame = require('./game');
const HanoiView = require('./hanoiview')

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});
