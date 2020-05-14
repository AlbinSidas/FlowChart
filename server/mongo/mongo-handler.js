const _promisify = require('../util/promisify');
const ObjectID = require('mongodb').ObjectID;
const ServerError = require('../api/api_auxiliary').ServerError;

// Handlers bases
class MongoHandler {
    constructor(db, collectionName) {
        this.collectionName = collectionName;
        this.db = db;
        this.collection = this.db.collection(collectionName);

        this._getById = this._getById.bind(this);
        this.getVersionSnpashot = this.getVersionSnpashot.bind(this);
        this.save = this.save.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    // ================== PRIVATE =====================
    /*
        Gets an entityId by the chosen version number if exists.
        Always called with a valid ID.

        @param id The id of the wanted entityId(FlowchartId/funcdefId).
        @param versionNumber The version number for the wanted entity id.
    */
    async _getByVersion(id, versionNumber) {
        const aggregateVersion = _promisify((...args) => {
            this.collection.aggregate(...args);
        });
        const result = await aggregateVersion([
            { $match: { [this.keyName]: ObjectID(id) } },
            { $match: { versionNumber: parseInt(versionNumber) } },
            { $project: { _id: 0 } },
        ])
            .then((a) => a)
            .catch((e) => {
                throw ServerError('Failed to get by version', e);
            });
        const data = await result.limit(1).next();
        return data;
    }
    
    /*
        Gets an entity by its id if exists.

        @param id The id of the wanted entityId(FlowchartId/funcdefId).
    */
    async _getById(id) {
        const findById = _promisify((...args) => {
            this.collection.aggregate(...args);
        });
        try {
            const result = await findById([
                { $match: { [this.keyName]: ObjectID(id) } },
                { $sort: { _id: -1 } },
                { $project: { _id: 0 } },
            ]);
            const data = await result.limit(1).next();
            return data;
        } catch (e) {
            throw ServerError('Failed to _getById', e);
        }
    }


    // ================== PUBLIC =====================
    /*
        Saves an entity data in the form 
        {...data, versionNumber: vNum, Keyname: Generated id or given}
        
        @param data The meta data of the entity.
        @param id   Given if the vNum also is given,
                    because it's in that point saving a new version
                    for an existing entity.
        @param vNum The new version of the saved entity,
                    Must be provided if the id is provided otherwise an
                    Overwrite will happen.
    */
    async save(data, id = null, vNum = 1) {
        const versionNumber = vNum;
        const insertOne = _promisify((...args) => {
            this.collection.insertOne(...args);
        });
        try {
            const result = await insertOne({
                ...data,
                versionNumber: versionNumber,
                [this.keyName]: id ? ObjectID(id) : ObjectID(),
            });

            const arr = result.ops;
            const object = arr.pop();
            return object;
        } catch (err) {
            throw ServerError('Save failed', err);
        }

        return null;
    }


    /*
        Gets the latese version of the given entity id.
        
        @param id The id of the entity that the latest version is asked for.
    */
    async getLatestVersion(id) {
        const data = await this._getById(id);
        return data.versionNumber;
    }

    /*
        Adds a new version of a given entity.
        This function gets the latest version and does a save with a version and entityId provided 

        @param data The data here is a full collection entry that has an id of the this.keyname.
    */
    async addVersion(data) {
        try {
            const versionNumber =
                (await this.getLatestVersion(data[this.keyName])) + 1;
            const result = await this.save(
                data.content,
                data[this.keyName],
                versionNumber,
            );
            return result;
        } catch (e) {
            throw ServerError('Failed to add version', e);
        }
    }

    /*
        General function that gets an entity with a given `id`,
        If the`versionNumber` is provided it fetches the specific version
        for the given id.

        @param id            Hex id for the entity (the keyname field)
        @param versionNumber Number for the wanted version.
    */
    async getOne(id, versionNumber) {
        try {
            if (versionNumber) {
                return await this._getByVersion(id, versionNumber);
            } else {
                return await this._getById(id);
            }
        } catch (e) {
            throw ServerError('Failed to getOne', e);
        }
    }


    /*
        Gets everything from the colleciton of the dervided entity type.
    */
    async getAll() {
        const findAll = _promisify((...args) => {
            this.collection.aggregate(...args);
        });
        const result = await findAll([
            { $sort: { _id: -1 } },
            { $group: { _id: `$${this.keyName}`, data: { $first: '$$ROOT' } } },
            { $project: { _id: 0, 'data._id': 0 } },
        ])
            .then((a) => a)
            .catch((e) => {
                throw ServerError('Failed to get all', e);
            });
        const all = await result.toArray();
        const flatAll = all.map((d) => {
            return { ...d.data };
        });
        return flatAll;
    }

    /*
        Gets a list of all the versions of the provided entity id.
        @param id The entity id.
    */
    async getVersionSnpashot(id) {
        const findById = _promisify((...args) => {
            this.collection.aggregate(...args);
        });
        try {
            const result = await findById([
                { $match: { [this.keyName]: ObjectID(id) } },
                { $project: { versionNumber: 1, _id: 0 } },
            ]);
            const data = await result.toArray();
            const flatData = data.map((e) => e.versionNumber);
            return flatData;
        } catch (e) {
            throw ServerError('Getting the version snapshot failed', e);
        }
    }
}

module.exports = MongoHandler;
