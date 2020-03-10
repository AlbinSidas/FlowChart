const FuncDefHandler   = require("./func-def-handler");
const FlowchartHandler = require('./flowchart-handler') 
const NodeHandler      = require('./node-handler') 
const MongoClient      = require('mongodb').MongoClient;
const assert           = require('assert');

class MongoController {
    constructor(db) {
        this.funcDefHandler   = new FuncDefHandler  (db, "function_definition");
        this.flowchartHandler = new FlowchartHandler(db, "flowchart");
        this.nodeHandler      = new NodeHandler     (db, "node");
        /*
        this.AndraHandlers..
        ...
        ...
        Samma mönster bör följas för alla collection handlers
        */
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