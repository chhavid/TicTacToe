#! /bin/bash

echo -e '{"player1": [],\n"player2": [],\n"currentPlayer": "player1",\n"gameOver": false,\n"isDraw": true}' > ./src/ticTacToe.json;
node ./src/generateHtml.js ; open ticTacToe.html

while [[ $? == 0 ]]; do 
  name=`grep "currentPlayer" ./src/ticTacToe.json | cut -f4 -d'"'`
  echo $name
  read -p "Enter the position:" position
  node ./src/ticTacToe.js ${position}
  node ./src/generateHtml.js 
  grep '"gameOver": false' ./src/ticTacToe.json &> /dev/null
done

echo 'Game over'
