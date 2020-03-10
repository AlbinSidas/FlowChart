import View from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js'
const uuidv1 = require('uuid/v1');
import FlowchartNode from "../flowchart-node";

class NodeMetaInfo
{
    constructor(type, funDefId, pX, pY, id, inputConnectionList, outputConnectionList, functionVariables) {
        this.type     = type
        this.funDefId = funDefId;
        this.pX       = pX;
        this.pY       = pY;
        this.id       = id;
        this.outputConnectionList = outputConnectionList;
        this.inputConnectionList = inputConnectionList;
        this.functionVariables = functionVariables;
        this.funName = funDefId;
    }

}

export default NodeMetaInfo;
