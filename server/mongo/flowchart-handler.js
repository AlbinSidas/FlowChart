const MongoHandler = require('./mongo-handler');
const _promisify = require('../util/promisify');
const ServerError = require('../api/api_auxiliary').ServerError;

/*
A Mongo handler derived type from MongoHandler 
*/
class FlowchartHandler extends MongoHandler {
    constructor(db, collectionName, controller) {
        super(db, collectionName);
        this.keyName = 'flowchart_id';
        this.controller = controller;
    }


    /*
        Gets a snapshot array of all the flowchart names and their ID,
        usually used when a user want to make a choice.
    */
    async getView() {
        const findAll = _promisify((...args) => {
            this.collection.aggregate(...args);
        });
        const result = await findAll([
            { $sort: { _id: -1 } },
            { $group: { _id: `$${this.keyName}`, data: { $first: '$$ROOT' } } },
            { $project: { _id: 0, 'data.nodes': 0 } },
        ])
            .then((a) => a)
            .catch((e) => {
                throw ServerError('Failed to get View', e);
            });
        const all = await result.toArray();
        const flatAll = all.map((d) => {
            return { ...d.data };
        });
        return flatAll;
    }
}

module.exports = FlowchartHandler;
