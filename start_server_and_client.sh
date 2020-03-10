#!/bin/bash
chmod +x ./server/start_mongo.sh
./server/start_mongo.sh $1 & (sleep 10 && (node ./server/app.js & npm run webpack)) 

