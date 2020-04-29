const MongoHandler  = require('./mongo-handler');
//const protocolAssign = require('./mongo_protocol').assign

// A Mongo handler that is MongoProtocol
class FuncDefVCHandler extends MongoHandler {
    constructor(db, collectionName, controller) {
        super(db, collectionName);
        this.keyName = "_id"
        this.controller = controller;
    }
}

module.exports = FuncDefVCHandler