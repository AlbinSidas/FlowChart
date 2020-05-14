const MongoHandler = require('./mongo-handler');

/*  
    Note: Currently not used!
    Individual NodeHandler for A nodes mongo interaction type.
    Node representation and manipulation during a mongodb interaction context.
*/
class NodeHandler extends MongoHandler {
    constructor(db, collectionName) {
        super(db, collectionName);
    }
}

module.exports = NodeHandler;
