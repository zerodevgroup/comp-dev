#!/bin/bash

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <source data directory>"
  exit -1
fi

DATA_DIR=$1

if [ ! -d "$DATA_DIR" ]; then
  echo "$DATA_DIR not found"
  exit -1
fi

cd $DATA_DIR

#######################
# team-member data
#######################
## team-members
if [ -f "team-members.json" ]; then
  echo team-members
  curl --silent -X POST -H 'accept: application/json' -H 'content-type: application/json' --data-binary "@./team-members.json" http://comp-dev-api/create/teammembers > /dev/null
else
  echo "team-members.json not found"
fi

