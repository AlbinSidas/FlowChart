const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');


/*
    template:
        function description,
        function name,
        command
*/

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

/*
    data: 
        id; Object Int
        
*/



module.exports = { setup } 