const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');



async function setup(url, dbName) { // kan abstraheras om man vill
    return await new Promise((accept, reject) => {
        MongoClient.connect(url, { useUnifiedTopology: true } , function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to database");
            const db = client.db(dbName); 
            client.close();
            accept()
        });
    })
}



module.exports = {
    setup
} 