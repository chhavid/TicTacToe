#! /bin/bash

echo -e '{"player1": [],\n"player2": [],\n"currentPlayer": "player1",\n"gameOver": false,\n"isDraw": true}' > ticTacToe.json;
node generateHtml.js ; open ticTacToe.html

while [[ $? == 0 ]]; do 
  name=`grep "currentPlayer" ticTacToe.json | cut -f4 -d'"'`
  echo $name
  read -p "Enter the position:" position
  node ticTacToe.js ${position}
  node generateHtml.js ; open ticTacToe.html
  grep 'false' ticTacToe.json &> /dev/null
done

echo 'Game over'
