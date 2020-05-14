const MongoHandler = require('./mongo-handler');
const FuncDefVCHandler = require('./funcdef-vc-handler');
const ServerError = require('../api/api_auxiliary').ServerError;

/*
    FunctionDefinition type in the mongodb context,
    Extends MongoHandler.
*/
class FuncDefHandler extends MongoHandler {
    constructor(db, collectionName, controller) {
        super(db, collectionName);
        this.keyName = 'funcdef_id';
        this.controller = controller;
        this.funcDefVCHandler = new FuncDefVCHandler(
            db,
            'function_definition_vc',
            this,
        );
    }
}

module.exports = FuncDefHandler;
