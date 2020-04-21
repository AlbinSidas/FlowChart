const MongoHandler  = require('./mongo-handler');
const _promisify = require('../util/promisify');
const FlowchartVCHandler = require('./flowchart-vc-handler') 
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
        //this.controller.addToFuncdefVersionControl(id)
        return await this.flowchartVCHandler.upsertVersion(id);
    }

    async getLatestVersion(id) {
        const data = await this.flowchartVCHandler._getById(id);
        return data.latestVersionNumber;
    }

    async getView() {
     
        const findAll   = _promisify((...args) => { this.collection.aggregate(...args) });
        const result     =  await findAll([
            {
                $project: 
                {
                    latestVersionNumber: 1,
                    latestVersion: { $arrayElemAt: ["$versions", -1]}
                }
            },
            {
                $project: { "latestVersion.nodes": 0}
            }
        
        ]).then(a  => a)
          .catch(e => console.log(e))
        const all = await result.toArray();
        return all;//await result.limit(1).next();
     
     
        //   const data = this.collection.find({}, {nodes:0})
        //   return await data.toArray();
    }

}

module.exports = FlowchartHandler