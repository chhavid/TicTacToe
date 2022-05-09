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

const isTileOccupied = (game, move) =>
  game.player1.includes(move) || game.player2.includes(move);

const isMoveValid = function (game, move) {
  if (move > 9 || move < 1) {
    return false;
  }
  return !isTileOccupied(game, move);
};

const gameOver = function (game) {
  game.gameOver = true;
};

const hasPlayerWon = function (game) {
  const player = game.currentPlayer;
  for (let index = 0; index < winningPositions.length; index++) {
    if (winningPositions[index].every((pos) => game[player].includes(pos))) {
      console.log(game.currentPlayer, 'won');
      return true;
    }
  }
  return false;
};

const isGameOver = function (game) {
  if (hasPlayerWon(game)) {
    return true;
  }
  return game.player1.length + game.player2.length === 9;
};

const addMove = function (game, move) {
  if (!isMoveValid(game, move)) {
    console.log('Invalid move');
    return;
  }
  game[game.currentPlayer].push(move);
};

const saveGame = function (game) {
  fs.writeFileSync('ticTacToe.json', JSON.stringify(game, null, 2), 'utf8');
};

const main = function () {
  const position = +process.argv[2];
  const game = JSON.parse(fs.readFileSync('ticTacToe.json', 'utf8'));
  addMove(game, position);
  isGameOver(game) ? gameOver(game) : changePlayer(game);
  saveGame(game);
};

main();
