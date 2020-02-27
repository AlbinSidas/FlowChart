const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');
const _promisify  = (func) => {
    return (...args) => { 
        return new Promise((accept, reject)=> {
            //const cb = args.pop();
            func(...args, (err, result) => {
                if (err) { 
                    reject(err)
                } else {
                    accept(result);
                }
            });

        });
    }
}


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
const MongoHanlder = (db) => {

    return {
        saveFunctionDef: async (data) =>  {
            const collection = db.collection('function_definition');
            const insertOne  = _promisify((...args) => { collection.insertOne(...args) });
            const result     =  await insertOne(data).then(a  => a)
                                                     .catch(e => console.log(e))
            return result.ops
        },

        getFunctionDefById: async (data) =>  {
            const collection      = db.collection('function_definition');
            const collectionFunc  = _promisify((...args) => { collection.findOne(...args) });
            const result          =  await collectionFunc(data).then(a  => a)
                                                               .catch(e => console.log(e))
            return result.ops
        },

        getAllFunctionDef: async () => {
            const data = db.collection('function_definition').find();
            return await data.toArray();
        }

    }
}


module.exports = {
    setup,
    MongoHanlder
} 