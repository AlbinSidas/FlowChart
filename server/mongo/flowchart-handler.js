const MongoHandler  = require('./mongo-handler');
//const protocolAssign = require('./mongo_protocol').assign

// A Mongo handler that is MongoProtocol
class FlowchartHandler extends MongoHandler {
    constructor(db, collectionName) {
        super(db, collectionName)
        //this.collectionName = collectionName;
        //this.db = db;
        //protocolAssign(this)
    }

    async prepareData(data) {
       //const name    = data.name;
        //const nodeIds = data.nodes.map(node => node.id);
    }

    async getView() {
        const data = this.collection.find({}, {nodes:0})
        return await data.toArray();
    }

}

module.exports = FlowchartHandler