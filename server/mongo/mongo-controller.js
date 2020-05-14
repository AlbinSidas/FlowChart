const FuncDefHandler   = require('./funcdef-handler');
const FlowchartHandler = require('./flowchart-handler');
const MongoClient      = require('mongodb').MongoClient;
const assert           = require('assert');

class MongoController {
    constructor(db) {
        this.funcDefHandler = new FuncDefHandler(
            db,
            'function_definition',
            this,
        );
        this.flowchartHandler = new FlowchartHandler(db, 'flowchart', this);

        // this.funcDefVCHandler   = new FuncDefVCionHandler (db, "function_definition_vc", this);
        // this.FlowchartVCHandler = new FlowchartVCHandler(db, "flowchart_vc", this);
        /*
        this.AndraHandlers..
        ...
        ...
        Samma mönster bör följas för alla collection handlers
        */
    }

    /*
        controller methods to handle foreign id joins between collection
    */
}


/*
    Database setup and connection,
    Does not handle errors, need to be done.
*/
async function setup(url, dbName) {
    return await new Promise((accept, reject) => {
        MongoClient.connect(
            url,
            { useUnifiedTopology: true, useNewUrlParser: true },
            function (err, client) {
                assert.equal(null, err);
                const db = client.db(dbName);
                accept(db);
            },
        );
    });
}

module.exports = { MongoController, setup };
