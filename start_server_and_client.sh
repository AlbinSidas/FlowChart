#!/bin/bash
chmod +x ./server/start_mongo.sh
./server/start_mongo.sh $1 & (sleep 10 && (./server/node_modules/nodemon/bin/nodemon.js ./server/app.js & npm run webpack)) 

