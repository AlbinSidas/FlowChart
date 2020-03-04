const MongoHandler  = require('./mongo-handler');
//const protocolAssign = require('./mongo_protocol').assign

// A Mongo handler that is MongoProtocol
class FuncDefHandler extends MongoHandler {
    constructor(db, collectionName) {
        super(db, collectionName)
        //this.collectionName = collectionName;
        //this.db = db;
        //protocolAssign(this)
    }
}

module.exports = FuncDefHandler