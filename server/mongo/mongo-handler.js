const _promisify = require('../util/promisify')
const ObjectID   = require('mongodb').ObjectID;
// Handlers extend MongoProtocol
class MongoHandler {

    constructor(db, collectionName) {
        this.collectionName = collectionName
        this.db             = db
        this.collection     = this.db.collection(collectionName)
       
        this._getById           = this._getById.bind(this)
        this.getVersionSnpashot = this.getVersionSnpashot.bind(this)
        this.save               = this.save.bind(this)
        this.getAll             = this.getAll.bind(this)
    }


    // ================== PRIVATE =====================
    async _getByVersion(id, versionNumber) { 
        const aggregateVersion  = _promisify((...args) => { this.collection.aggregate(...args) });
        const result            =  await aggregateVersion([
            { $match   : { [this.keyName]: ObjectID(id)} }, 
            { $match   : { "versionNumber": parseInt(versionNumber)} },
            { $project : { _id: 0 } }
        ]).then(a  => a)
          .catch(e => console.log(e))
        const data = await result.limit(1).next();
        return data
    }


    async _getById (id) {
        const findById   = _promisify((...args) => { this.collection.aggregate(...args) });
        console.log("ID ÄR: ", id)
        // Det som kommer in här som ID är "all"
        try {
            const result =  await findById([
                { $match: {[this.keyName]:  ObjectID(id) } },
                { $sort:  {_id: -1} },
                { $project: {_id: 0} }
            ]);
            const data = await result.limit(1).next();
            return data;
        } catch(e) {
            console.log(e)
            return null;
        }
    }


    // ======= UPSERT ====== id är ObjeectId redan, DEPRICATED
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


    // ============= PUBLIC ==================
    async addToVersionControl() {} // overridden Never used

    async save(data, id = null, vNum = 1) {
        const versionNumber = vNum;
        const insertOne  = _promisify((...args) => { this.collection.insertOne(...args) });
        try {
            const result  = await insertOne({
                ...data,
                versionNumber: versionNumber,
                [this.keyName]: id ? ObjectID(id) : ObjectID()
            })
           
            const arr =  result.ops
            const object = arr.pop();
            return object;
            
            /* VC collections är avstängda just nu
            if(object) {
                const versionEntry = await this.addToVersionControl(object[this.keyName]);
                return object;
            }
            */
        } catch (err) {
            console.log("ERROR WHILE SAVING", err);
        } 
        
        return null;
    } 

    async getLatestVersion(id) {
        const data = await this._getById(id);
        return data.versionNumber;
    }

    async addVersion(data) {
        const versionNumber = (await this.getLatestVersion(data[this.keyName])) + 1
        const result = await this.save(data.content, data[this.keyName], versionNumber);
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

    async getAll() {

        const findAll    = _promisify((...args) => { this.collection.aggregate(...args) });
        const result     =  await findAll([
            {$sort: { _id: -1 }},
            {$group: {_id:  `$${this.keyName}`, data: { $first: "$$ROOT" }}},
            {$project: { _id: 0, "data._id":0 }}
        ]).then(a  => a)
          .catch(e => console.log(e))
        const all = await result.toArray();
        const flatAll = all.map(d =>{ return {...d.data} }); 
        return flatAll;//await result.limit(1).next();

    }

    async getVersionSnpashot(id) {
       const findById   = _promisify((...args) => { this.collection.aggregate(...args) });
       // Det som kommer in här som ID är "all"
       try {
           const result =  await findById([
               { $match: {[this.keyName]:  ObjectID(id) } },
               { $project: {versionNumber: 1, _id: 0}}
           ]);
           const data = await result.toArray();//limit(1).next();
           const flatData = data.map(e => e.versionNumber);
           return flatData;
       } catch(e) {
           console.log("ERROR Getting the version snapshot failed: ", e)
           return null;
       }
    }
}

module.exports = MongoHandler
