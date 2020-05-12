const MongoHandler  = require('./mongo-handler');
const FuncDefVCHandler  = require('./funcdef-vc-handler');
const ServerError = require('../api/api_auxiliary').ServerError;

// A Mongo handler that is MongoProtocol
class FuncDefHandler extends MongoHandler {
    constructor(db, collectionName, controller) {
        super(db, collectionName)
        this.keyName = "funcdef_id"
        this.controller = controller;
        this.funcDefVCHandler   = new FuncDefVCHandler (db, "function_definition_vc", this);
    }

    async addToVersionControl(id) {
        try {
            return await this.funcDefVCHandler.upsertVersion(id);
        } catch(e) {
            throw ServerError("Failed to add to version control for Funcdef", e);
        }
    }

}

module.exports = FuncDefHandler