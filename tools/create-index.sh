#!/bin/bash
if ! [ -d "$HOME/comp-dev/tools/create-index/node_modules" ]; then
  cd $HOME/comp-dev/tools/create-index
  npm install
  cd -
fi

DATASET=$1
FIELD=$2

echo $DATASET
echo $FIELD

node $HOME/comp-dev/tools/create-index/index.js $DATASET $FIELD
