#!/bin/bash

cd ~/cold-might
lock-alpha.sh build --project ./config/player-service/project.json
lock-alpha.sh deploy --project ./config/player-service/project.json
