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
    }


    // ================== PRIVATE =====================
    async _getByVersion(id, versionNumber) { 
        const aggregateVersion  = _promisify((...args) => { this.collection.aggregate(...args) });
        const result            =  await aggregateVersion([
            { $match   : { "versions.versionNumber": parseInt(versionNumber)} },
            { $unwind  : "$versions" },
            { $match   : { "versions.versionNumber": parseInt(versionNumber) } }, 
            { $project : { latestVersionNumber: 1, targetVersion: "$versions" } }
        ]).then(a  => a)
          .catch(e => console.log(e))
          
        const data = await result.limit(1).next();
        //console.log(data)
        return data
    }

    
    async _getById (id) {
        const findById   = _promisify((...args) => { this.collection.aggregate(...args) });
        console.log("ID ÄR: ", id)
        // Det som kommer in här som ID är "all"
        const result     =  await findById([
            { $match: {_id:  ObjectID(id) } },
            {
                $project: 
                {
                    latestVersionNumber: 1,
                    latestVersion: { $arrayElemAt: ["$versions", -1]} 
                }
            }
        
        ]).then(a  => a)
          .catch(e => console.log(e))
        return await result.limit(1).next();
    }






    // ======= UPSERT ====== id är ObjeectId redan
    async upsertVersion(id) {
        const entry = await this._getById(id);
        console.log("ENTRY? ", entry)
        console.log("ID FÖR DENNA ", id)
        if(entry) {
            //update();
            const latestVersionNumber = entry.latestVersionNumber + 1;
            const updateOne  = _promisify((...args) => { this.collection.updateOne(...args) });
            const result = await updateOne(
                {_id: ObjectID(id)},
                { $set: { "latestVersionNumber": latestVersionNumber }}
            );
            const data = result;
            console.log("FINNS", data)
            return data;

        } else {
            const latestVersionNumber = 1;
            const insertOne  = _promisify((...args) => { this.collection.insertOne(...args) });
            const result = await insertOne({
                _id: id, // TODO: kommer den behöva bli objectID eller är det allid bara en intermediary steg som mongo lägger på som lager?
                latestVersionNumber: latestVersionNumber
            });
            
            const data = await result.ops;
            console.log("FINNS EJ", data)
            return data;
            //insert();
        }
    }


    // ======================== PUBLIC ==================

    async save(data, id = null, vNum = 1) { // funcdef_id?
        
        const versionNumber = vNum;
        const insertOne  = _promisify((...args) => { this.collection.insertOne(...args) });
        try {
            const result  = await insertOne({
                ...data,
                versionNumber: versionNumber,
                funcdef_id: id ? id : ObjectID()
            })
           
            const arr =  result.ops
            const object = arr.pop();
            if(object) {
                const versionEntry = await this.addToVersionControl(object.funcdef_id);
                return object;
            }
        } catch (err) {
            console.log("ERROR WHILE SAVING", err);
        } 
        
        return null;
        // const latestVersionNumber = 1;
        // const findLatest = _promisify((...args) => { this.collection.aggregate(...args) });
        // const result = await findLatest([
        //     {
        //         $group: { _id: null, latestDocId: { $max: "$_id"} } }, 
        //         {$project: {_id: 0, latestDocId: 1}
        //     }
        // ]);
        //db.collectionName.aggregate( [{$group: {_id: null, latestDocId: { $max: "$_id"}}}, {$project: {_id: 0, latestDocId: 1}}] )
    } 

    async addToVersionControl() {} // overridden

    async addVersion(data) {
        const versionNumber = (await this.getLatestVersion(data.funcdef_id)) + 1

        //const insertOne = _promisify((...args) => this.collection.insertOne(...args));
        const result = await this.save(data.content, data.funcdef_id, versionNumber);
        console.log("UV", result);
        // const update = _promisify((...args) => { this.collection.update(...args) });
        // console.log("I addversion i mongohandler: ", data)
        // const oldEntry       = await this._getById(data.id);
        // const updatedVersion = oldEntry.latestVersionNumber + 1;
        // const versionEntry   = { ...data.content, versionNumber: updatedVersion }

        // const result = await update(
        //     // ID
        //     {_id: ObjectID(data.id)},
        //     {
        //         $set: { "latestVersionNumber": updatedVersion },
        //         $push: {
        //             versions: versionEntry
        //         }
        //     }
        // ).catch(err => { console.log(err); 
        //                  return null 
        //                });

        // return {_id: data._id, ...versionEntry};

    }


    async old_save (data)  {
        const latestVersionNumber = 1;
        const insertOne  = _promisify((...args) => { this.collection.insertOne(...args) });
        const result     =  await insertOne({
            ...data,
            funcdef_id: ObjectID()
        }).then(a  => a.ops)
           .catch(e => console.log("SAVE ERRROOORO", e))
        return result;
    }


    async getOne(id, versionNumber) {
        if(versionNumber) {
            return await this._getByVersion(id, versionNumber);
        } else {
            // Denna gör så det inte returneras från all
            return await this._getById(id);
        }
    }

    // async getAll() {
    //     const data = this.collection.find();
    //     return await data.toArray();
    // }

    async getAll() {

        const findAll    = _promisify((...args) => { this.collection.aggregate(...args) });
        const result     =  await findAll([
            {
                $project: 
                {
                    latestVersionNumber: 1,
                    latestVersion: { $arrayElemAt: ["$versions", -1]} 
                }
            }
        
        ]).then(a  => a)
          .catch(e => console.log(e))
        const all = await result.toArray();
        return all;//await result.limit(1).next();
    }


    async old_addVersion(data) {
        const update = _promisify((...args) => { this.collection.update(...args) });
        console.log("I addversion i mongohandler: ", data)
        const oldEntry       = await this._getById(data.id);
        const updatedVersion = oldEntry.latestVersionNumber + 1;
        const versionEntry   = { ...data.content, versionNumber: updatedVersion }

        const result = await update(
            // ID
            {_id: ObjectID(data.id)},
            {
                $set:  { "latestVersionNumber": updatedVersion },
                $push: { versions: versionEntry }
            }
        ).catch(err => { console.log(err); 
                         return null 
                       });

        return {_id: data._id, ...versionEntry};
    }

    async getVersionSnpashot(id) {
        const aggregateVersion  = _promisify((...args) => { this.collection.aggregate(...args) });
        const result            =  await aggregateVersion([
            
            {
                $match: {_id:  ObjectID(id) }
            }, 
            { 
                $addFields: { "versionNumbers": "$versions.versionNumber" } },
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
