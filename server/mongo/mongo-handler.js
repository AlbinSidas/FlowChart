const _promisify = require('../util/promisify')
const ObjectID   = require('mongodb').ObjectID;
// Handlers extend MongoProtocol
class MongoHandler {

    constructor(db, collectionName) {
        this.collectionName = collectionName
        this.db             = db
        this.collection     = this.db.collection(collectionName)
       
        this._getById      = this._getById.bind(this)
        this.save          = this.save.bind(this)
        this.getAll        = this.getAll.bind(this)
        this._versionQuery = this._versionQuery.bind(this)
    }


    // ================== PRIVATE =====================
    async _getByVersion(id, versionNumber) { 
        // TODO: forstsätt här och sen fixa get all
        const getVersion = _promisify((...args) => { this.collection.aggregate(...args) });
         const result = await getVersion(
             //{versions: { version: versionNumber}}, // match
             //{"versions.version": 1} // what fields
         [
             { $match: { _id: ObjectID(id) } },
             {
                 $project: 
                 {
                      
                    bullar: 
                    { 
                        "versions": 
                        { 
                        
                                $eq: [ "$version", versionNumber] 
                            
                        } 
                   }
            
                 }
             }
    
         ]
         )  
         const data = await result.toArray()
         console.log(data)
         return data;
    }

    
    async _getById (id) {
        const findById   = _promisify((...args) => { this.collection.aggregate(...args) });
        const result     =  await findById([
            { $match: {_id:  ObjectID(id) } },
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
        return allEntries[0]
    }


    _versionQuery(versionNumber) {
       // if (versionNumber) {
          //  return {}//{versions: { $elemMatch: { version: versionNumber } }};
        //}
        return { $arrayElemAt: ["$versions", -1]};
    }

    // ======================== PUBLIC ==================

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
        return result
    }


    async getOne(id, versionNumber) {
        if(versionNumber) {
            return await this._getByVersion(id, versionNumber);
        } else {
            return await this._getById(id);
        }
    }

    async getAll() {
        const data = this.collection.find();
        return await data.toArray();
    }

    async addVersion(data) {
        const update = _promisify((...args) => { this.collection.update(...args) });
        const oldEntry       = await this.getById(data._id);
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
