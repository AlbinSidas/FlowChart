#!/bin/bash

export SCRIPT_DIR=$(dirname "$0")
mkdir $SCRIPT_DIR/data
export FORAN_MONGO_DB=$SCRIPT_DIR/data
mongod --dbpath=$FORAN_MONGO_DB $(echo --port $([[ -z "$1" ]] && echo 27017 || echo $1))
