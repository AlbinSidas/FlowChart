# Server for version 
```
export FORAN_MONGO_DB = `path to local /data directory in the server directory of the project`
OR
export FORAN_MONGO_DB=$(pwd)/data
```
```shell
mongod --dbpath=$FORAN_MONGO_DB --port 27018
```