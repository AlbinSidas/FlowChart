import View from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js';
import Connector from './connectors';

class ParaConnector extends Connector
{
    constructor(id, prevNode, currNode, nodeType){
        super();
        this.id = id;
        this.element.id = id;
        this.currNode = currNode;
        this.prevNode = prevNode;
    
        this.nodeType = nodeType;
    }
}

export default ParaConnector;