const fs = require('fs');

const generateTag = function (tag, tagClass, content) {
  return '<' + tag + ' class="' + tagClass + '">' + content + '</' + tag + '>';
};

let column = '';
column += generateTag('div', 'column', 'x');
column += generateTag('div', 'column', 'x');
column += generateTag('div', 'column', 'x');

let row = '';
row += generateTag('div', 'row', column);
row += generateTag('div', 'row', column);
row += generateTag('div', 'row', column);

const header = '<head><title>Tic Tac Toe</title>' +
  '<link rel = "stylesheet" href = "style.css"></head> ';

const div = generateTag('div', 'wrapper', row);
const body = generateTag('body', '', div);
const html = generateTag('html', '', header + body);

fs.writeFileSync('t3.html', html, 'utf8');
