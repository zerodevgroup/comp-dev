#!/bin/bash

cd ~/cold-might
lock-alpha.sh build --project ./config/partner-service/project.json
lock-alpha.sh deploy --project ./config/partner-service/project.json
