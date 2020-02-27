const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');

<<<<<<< HEAD


/*
    template:
        function description,
        function name,
        command
*/


=======
>>>>>>> master
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

<<<<<<< HEAD
/*
    data: 
        id; Object Int
        
*/

const MongoHanlder = (db) => {

    return {
        saveFunctionDef: async (data) =>  {
            const collection = db.collection('function_definition');
            collection.insertOne(data, (err, result)=> {
                console.log(err);
                console.log(result.ops);
            });
            console.log("RES ");
        }
    }
}





=======
>>>>>>> master
module.exports = {
    setup,
    MongoHanlder
} 