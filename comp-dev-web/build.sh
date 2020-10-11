#!/bin/bash
date

# Build node project
npm install

# Build underlying react app
cd comp-dev-ui
npm run build
