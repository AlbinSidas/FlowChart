# Server for version 

## To run the Database
You only need to run:
```shell
npm run mongo <PortNumber>
```
`<PorNumber>` is something you provide 27018 or 27017 are the common ones



## Manual setup in case of error in the previous step

```shell
export FORAN_MONGO_DB=$(pwd)/data
```
```shell
mongod --dbpath=$FORAN_MONGO_DB --port 27018
```