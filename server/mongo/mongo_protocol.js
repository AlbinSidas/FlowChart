const _promisify = require('../util/promisify')

const MongoProtocol = (db) => { // Base wrapper around mongo callbacks
    return {
        save: async (collectionName, data) =>  {
            const collection = db.collection(collectionName);
            const insertOne  = _promisify((...args) => { collection.insertOne(...args) });
            const result     =  await insertOne(data).then(a  => a)
                                                     .catch(e => console.log(e))
            return result.ops
        },
        
        getById: async (collectionName, data) =>  {
            const collection      = db.collection(collectionName);
            const collectionFunc  = _promisify((...args) => { collection.findOne(...args) });
            const result          =  await collectionFunc(data).then(a  => a)
                                                               .catch(e => console.log(e))
            return result.ops
        },

        getAll: async(collectionName) => {
            const data = db.collection(collectionName).find();
            return await data.toArray();
        }
    }
}

/*
    Object is a MongoHandler type
        -> this.db
        -> this.collectionName
*/
const assign = (object) => {
    Object.assign(object, MongoProtocol(object.db))
    object.save    = object.save   .bind(object, object.collectionName)
    object.getById = object.getById.bind(object, object.collectionName)
    object.getAll  = object.getAll .bind(object, object.collectionName)
}

module.exports = {assign, MongoProtocol}