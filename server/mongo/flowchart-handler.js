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

    async getView() {

     
        const findAll   = _promisify((...args) => { this.collection.aggregate(...args) });
        const result     =  await findAll([

            {$sort: { _id: -1 }},
            {$group: {_id:  `$${this.keyName}`, data: { $first: "$$ROOT" }}},
            {$project: { _id: 0, "data.nodes":0 }}
        
        ]).then(a  => a)
          .catch(e => console.log(e))
        const all = await result.toArray();
        const flatAll = all.map(d =>{ return {...d.data} }); 
        return flatAll;//await result.limit(1).next();
     
     
        //   const data = this.collection.find({}, {nodes:0})
        //   return await data.toArray();
    }

}

module.exports = FlowchartHandler