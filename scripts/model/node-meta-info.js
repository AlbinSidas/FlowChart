import View from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js';
const uuidv1 = require('uuid/v1');
import FlowchartNode from 'Node/flowchart-node';

class NodeMetaInfo {
    constructor(
        type,
        nodeName,
        nodeDescription,
        id,
        pX,
        pY,
        inputConnectionList,
        outputConnectionList,
        functionDefinitionInstance,
        outputIfConnectionsList,
        outputElseConnectionsList,
        outputParallelConnectionsList,
    ) {
        this.type = type;
        this.pX = pX;
        this.pY = pY;
        this.id = id;
        this.outputConnectionList = outputConnectionList;
        this.inputConnectionList = inputConnectionList;
        this.functionDefinitionInstance = functionDefinitionInstance;
        this.nodeName = nodeName;
        this.nodeDescription = nodeDescription;
        this.outputIfConnectionsList = outputIfConnectionsList;
        this.outputElseConnectionsList = outputElseConnectionsList;
        this.outputParallelConnectionsList = outputParallelConnectionsList;
    }
}

export default NodeMetaInfo;
