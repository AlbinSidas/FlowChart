const MongoHandler = require('./mongo-handler');
//const protocolAssign = require('./mongo_protocol').assign

/*
    OLD Deprecated, used in Version control entities(Flowchart, Funcdef )
    that are now handled at the same level of the entity store.
*/
class FuncDefVCHandler extends MongoHandler {
    constructor(db, collectionName, controller) {
        super(db, collectionName);
        this.keyName = '_id';
        this.controller = controller;
    }
}

module.exports = FuncDefVCHandler;
