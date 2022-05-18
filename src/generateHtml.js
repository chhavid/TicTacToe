const fs = require('fs');

const generateTag = function (tag, tagClass, content = ' ') {
  return '<' + tag + ' class="' + tagClass + '">' + content + '</' + tag + '>';
};

const getSymbol = function (game, tile) {
  if (game.player1.includes(tile)) {
    return 'O';
  }
  return game.player2.includes(tile) ? 'X' : ' ';
};

const singleRow = function (game, tiles) {
  const row = tiles.map((tile) =>
    generateTag('div', 'column', getSymbol(game, tile)));
  return generateTag('div', 'row', row.join(''));
};

const generateRows = function (game) {
  const tilesRow = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  return tilesRow.map((row) =>
    singleRow(game, row)).join('');
};

const header = function () {
  return '<head><title>Tic Tac Toe</title>' +
    '<link rel = "stylesheet" href = "./src/style.css">' +
    '<meta http-equiv="refresh" content="1"></head>';
};

const gameOver = function (game) {
  let content = 'Game Over!! \n ' + game.currentPlayer + ' won';
  if (game.isDraw) {
    content = 'Game Draw!!';
  }
  return generateTag('div', 'game-over', content);
};

const body = function (game) {
  let div = generateTag('div', 'wrapper', generateRows(game));
  if (game.gameOver) {
    div += gameOver(game);
  }
  return generateTag('body', '', div);
};

const generateHtml = function (game) {
  return generateTag('html', '', header() + body(game));
};

const main = function () {
  const game = JSON.parse(fs.readFileSync('./src/ticTacToe.json', 'utf-8'));
  fs.writeFileSync('ticTacToe.html', generateHtml(game), 'utf8');
};

main();
