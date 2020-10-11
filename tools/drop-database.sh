#!/bin/bash

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <database>"
  exit -1
fi

DATABASE=$1
TOOLS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

mongo --host localhost $DATABASE $TOOLS_DIR/drop-database.js
