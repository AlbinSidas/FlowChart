const _promisify = require('../util/promisify')
const ObjectID   = require('mongodb').ObjectID;
// Handlers extend MongoProtocol
class MongoHandler {

    constructor(db, collectionName) {
        this.collectionName = collectionName
        this.db             = db
        this.collection     = this.db.collection(collectionName)
       
        this.getById = this.getById.bind(this)
        this.save    = this.save.bind(this)
        this.getAll  = this.getAll.bind(this)
    }

    async save (data)  {
        const insertOne  = _promisify((...args) => { this.collection.insertOne(...args) });
        const result     =  await insertOne(data).then(a  => a)
                                                 .catch(e => console.log(e))
        return result.ops
    }
    
    async getById (id) {
        const collectionFunc  = _promisify((...args) => { this.collection.findOne(...args) });
        const result          =  await collectionFunc({_id: ObjectID(id)}).then(a  => a)
                                                                .catch(e => console.log(e))
        return result
    }

    async getAll() {
        const data = this.collection.find();
        return await data.toArray();
    }

}

module.exports = MongoHandler
