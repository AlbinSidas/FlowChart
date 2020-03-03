const MongoProtocol  = require('./mongo_protocol').MongoProtocol;
const protocolAssign = require('./mongo_protocol').assign


class FuncDefHandler {
    constructor(db, collectionName) {
        this.collectionName = collectionName;
        this.db = db;
        protocolAssign(this)
    }
}

module.exports = FuncDefHandler