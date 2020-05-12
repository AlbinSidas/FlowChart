const MongoHandler  = require('./mongo-handler');
const _promisify = require('../util/promisify');
const FlowchartVCHandler = require('./flowchart-vc-handler') 
const ServerError = require('../api/api_auxiliary').ServerError;
//const protocolAssign = require('./mongo_protocol').assign

// A Mongo handler that is MongoProtocol
class FlowchartHandler extends MongoHandler {
    constructor(db, collectionName, controller) {
        super(db, collectionName)
        this.keyName = "flowchart_id"
        this.controller = controller;
        this.flowchartVCHandler = new FlowchartVCHandler(db, "flowchart_vc", this);
    }

    async addToVersionControl(id) {
        try {
            return await this.flowchartVCHandler.upsertVersion(id);
        } catch(e) {
            throw ServerError("Failed to add to version control for flowchart", e);
        }
    }

    async getView() {
        const findAll   = _promisify((...args) => { this.collection.aggregate(...args) });
        const result     =  await findAll([

            {$sort: { _id: -1 }},
            {$group: {_id:  `$${this.keyName}`, data: { $first: "$$ROOT" }}},
            {$project: { _id: 0, "data.nodes":0 }}
        
        ]).then(a  => a)
          .catch(e => { throw ServerError("Failed to get View", e) } )
        const all = await result.toArray();
        const flatAll = all.map(d =>{ return {...d.data} }); 
        return flatAll;
    }

}

module.exports = FlowchartHandler