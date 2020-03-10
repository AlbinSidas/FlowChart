const MongoHandler  = require('./mongo-handler');
//const protocolAssign = require('./mongo_protocol').assign

// A Mongo handler that is MongoProtocol
class FlowchartHandler extends MongoHandler {
    constructor(db, collectionName) {
        super(db, collectionName)
    }

    async getView() {
        const data = this.collection.find({}, {nodes:0})
        return await data.toArray();
    }

}

module.exports = FlowchartHandler