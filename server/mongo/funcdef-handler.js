const MongoHandler  = require('./mongo-handler');
const FuncDefVCHandler  = require('./funcdef-vc-handler');

//const protocolAssign = require('./mongo_protocol').assign

// A Mongo handler that is MongoProtocol
class FuncDefHandler extends MongoHandler {
    constructor(db, collectionName, controller) {
        super(db, collectionName)
        this.keyName = "funcdef_id"
        this.controller = controller;
        this.funcDefVCHandler   = new FuncDefVCHandler (db, "function_definition_vc", this);
    }

    async addToVersionControl(id) {
        //this.controller.addToFuncdefVersionControl(id)
        return await this.funcDefVCHandler.upsertVersion(id);
    }

}

module.exports = FuncDefHandler