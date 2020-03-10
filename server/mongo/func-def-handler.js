const MongoHandler  = require('./mongo-handler');
//const protocolAssign = require('./mongo_protocol').assign

// A Mongo handler that is MongoProtocol
class FuncDefHandler extends MongoHandler {
    constructor(db, collectionName) {
        super(db, collectionName)
    }
}

module.exports = FuncDefHandler