#!/bin/bash
cd $(pwd) && mkdir data
export FORAN_MONGO_DB=$(pwd)/data
mongod --dbpath=$FORAN_MONGO_DB $(echo --port $([[ -z "$1" ]] && echo 27017 || echo $1))