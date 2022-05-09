#! /bin/bash

echo -e '{"player1": [],\n"player2": [],\n"currentPlayer": "player1",\n"gameOver": false}' > ticTacToe.json;

grep 'false' ticTacToe.json &> /dev/null

while [[ $? == 0 ]]; do 
  name=`grep "currentPlayer" ticTacToe.json | cut -f4 -d'"'`
  echo $name
  read -p "Enter the position:" position
  node ticTacToe.js ${position}
  grep 'false' ticTacToe.json &> /dev/null
done 