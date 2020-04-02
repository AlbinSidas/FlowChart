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
        const latestVersionNumber = 1;
        const insertOne  = _promisify((...args) => { this.collection.insertOne(...args) });
        const result     =  await insertOne({latestVersionNumber: latestVersionNumber, versions: [
            {
                ...data,
                version: latestVersionNumber
            }
        ]}).then(a  => a.ops)
           .catch(e => console.log("SAVE ERRROOORO", e))
        return result;
    }
    
    async getById (id) {
        const findById   = _promisify((...args) => { this.collection.aggregate(...args) });
        const result     =  await findById([
            {
                $match: {_id:  ObjectID(id) }
            }, 
            {
                $project: 
                {
                    latestVersionNumber: 1,
                    last: { $arrayElemAt: ["$versions", -1]} 
                }
            }
        
        ]).then(a  => a)
          .catch(e => console.log(e))
        const allEntries = await result.toArray();

        console.log("Kommer till efter find med res", allEntries);
        return allEntries[0];
    }

    async getAll() {
        const data = this.collection.find();
        return await data.toArray();
    }

    async addVersion(data) {
        const update = _promisify((...args) => { this.collection.update(...args) });
        const oldEntry       = await this.getById(data._id);
        console.log(oldEntry);
        const updatedVersion = oldEntry.latestVersionNumber + 1;
        const versionEntry   = { ...data.content, version: updatedVersion }

        const result = await update(
            // ID
            {_id: ObjectID(data._id)},
            {
                $set: { "latestVersionNumber": updatedVersion },
                $push: {
                    versions: versionEntry
                }
            }
        ).catch(err => { console.log(err); 
                         return null 
                       });

        return {_id: data._id, ...versionEntry};
    }


    // async getVersionSnpashot(id) {        
    //     const getSnapshots = _promisify((...args) => { this.collection.findOne(...args) });
    //     const result = await getSnapshots(
    //         {_id: ObjectID(id)}, // match
    //         {"versions.version": 1} // what fields
    //     )
    //     console.log(result)
    //     //const allEntries = await result.toArray();
    //     return result;
    // }

    async getVersionSnpashot(id) {
        const aggregateVersion  = _promisify((...args) => { this.collection.aggregate(...args) });
        const result            =  await aggregateVersion([
            
            {
                $match: {_id:  ObjectID(id) }
            }, 
            { 
                $addFields: { "versionNumbers": "$versions.version" } },
            {
              $project:  {versions: 0},
            }
        
        ]).then(a  => a)
          .catch(e => console.log(e))
        const data = await result.toArray();
        return data
    }

}

module.exports = MongoHandler
