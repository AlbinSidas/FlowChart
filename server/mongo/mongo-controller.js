const FuncDefHandler         = require("./funcdef-handler");
const FlowchartHandler       = require('./flowchart-handler') 
// const FuncDefVCionHandler  = require('./funcdef-vc-handler')
// const FlowchartVCHandler = require('./flowchart-vc-handler') 
const MongoClient            = require('mongodb').MongoClient;
const assert                 = require('assert');

class MongoController {
    constructor(db) {
        this.funcDefHandler    = new FuncDefHandler        (db, "function_definition", this);
        this.flowchartHandler  = new FlowchartHandler      (db, "flowchart", this);
        
        // this.funcDefVCHandler   = new FuncDefVCionHandler (db, "function_definition_vc", this);
        // this.FlowchartVCHandler = new FlowchartVCHandler(db, "flowchart_vc", this);
        /*
        this.AndraHandlers..
        ...
        ...
        Samma mönster bör följas för alla collection handlers
        */
    }

    //async addToFuncdefVersionControl(id) {
     //   this.funcDefHandler.save(id);
   // }
    /*
        controller methods to handle joins between collection
    */
}


async function setup(url, dbName) { // kan abstraheras om man vill
    return await new Promise((accept, reject) => {
        MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true } , function(err, client) {
            assert.equal(null, err);
            const db = client.db(dbName); 
            accept(db)
        });
    })
}

module.exports = {MongoController, setup};