const FuncDefHandler = require("./func_def_handler") 

class MongoController {
    constructor(db) {
        this.funcDefHandler = new FuncDefHandler(db, "function_definition");
    }

    /*
        controller methods to handle joins between collection
    */
}

module.exports = MongoController;