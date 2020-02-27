const FuncDefHandler = require("./func_def_handler") 
const MongoClient    = require('mongodb').MongoClient;
const assert         = require('assert');

class MongoController {
    constructor(db) {
        this.funcDefHandler = new FuncDefHandler(db, "function_definition");
    }

    /*
        controller methods to handle joins between collection
    */
}

async function setup(url, dbName) { // kan abstraheras om man vill
    return await new Promise((accept, reject) => {
        MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true } , function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName); 
            //client.close();
            accept(db)
        });
    })
}

module.exports = {MongoController, setup};