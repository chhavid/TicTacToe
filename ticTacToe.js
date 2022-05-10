const fs = require('fs');

const winningPositions = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]
];

const changePlayer = function (game) {
  const player = game.currentPlayer;
  game.currentPlayer = player === 'player1' ? 'player2' : 'player1';
};

const isTileEmpty = (game, move) =>
  !(game.player1.includes(move) || game.player2.includes(move));

const isMoveValid = function (game, move) {
  return (/^[1-9]$/).test(move) && isTileEmpty(game, move);
};

const gameOver = function (game) {
  game.gameOver = true;
};

const isWinningPosition = function (game, winningCombo) {
  const player = game.currentPlayer;
  return winningCombo.every((tile) => game[player].includes(tile));
};

const hasPlayerWon = function (game) {
  for (let index = 0; index < winningPositions.length; index++) {
    if (isWinningPosition(game, winningPositions[index])) {
      console.log(game.currentPlayer, 'won');
      return true;
    }
  }
  return false;
};

const areMovesLeft = function (game) {
  const maxTiles = 9;
  return game.player1.length + game.player2.length === maxTiles;
};

const isGameOver = function (game) {
  if (hasPlayerWon(game)) {
    return true;
  }
  return areMovesLeft(game);
};

const addMove = function (game, move) {
  game[game.currentPlayer].push(move);
};

const saveGame = function (game) {
  fs.writeFileSync('ticTacToe.json', JSON.stringify(game, null, 2), 'utf8');
};

const playGame = function (game, move) {
  if (!isMoveValid(game, move)) {
    console.log('Invalid move');
    return;
  }
  addMove(game, move);
  isGameOver(game) ? gameOver(game) : changePlayer(game);
};

const main = function () {
  const position = +process.argv[2];
  const game = JSON.parse(fs.readFileSync('ticTacToe.json', 'utf8'));
  playGame(game, position);
  saveGame(game);
};

main();
