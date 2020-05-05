import FlowchartNode  from './flowchart-node'
import style          from 'Styles/style.css'
import NodeIO         from './nodeIO'
import NodeMetaInfo   from 'Model/node-meta-info.js'
import { InlineView } from './base/view.js'
import eventEmitter   from 'Singletons/event-emitter.js'
import ParaConnector  from './para-connector.js'

class ParallelNode extends FlowchartNode{
    constructor(id, functionDefinitionInstance = null) {
        super(id, null)
        this.setHtml('<div></div>')

        //functions
        this.onClick          = this.onClick.bind(this);
        this.elementDrag      = this.elementDrag.bind(this);
        this.mouseDown        = this.mouseDown.bind(this);
        this.closeDragElement = this.closeDragElement.bind(this);
        this.getMetaInfo      = this.getMetaInfo.bind(this);
        this.onOutputClicked  = this.onOutputClicked.bind(this);
        this.onDestClicked    = this.onDestClicked.bind(this);
        //ui
        this.posX    = 100;
        this.posY    = 100;
        this.height  = 250;
        this.offsetX = 0;
        this.offsetY = 0;
        this.idRef   = "";
        this._connectorUpdaters = {}
        //flow
        this.id    = id;
        this._name = "";

        this.outputParallel = new NodeIO(this, "box-parallel", this.onOutputClicked);
        this.functionNameView = InlineView(`<p id='${this.id}_function'>${this.id}</p>`);
    
        this.element.classList.add(style.parallelnode);
        this.element.id = id;
    }


    didAttach(parent) {
        this.attach(this.functionNameView);
        this.attach(this.input);
        this.attach(this.outputParallel);
        this.element.onclick     = this.onClick;
        this.element.onmousedown = this.mouseDown;
        this.onScrolledCallbacks = []
    }

    getMetaInfo() {
        return new NodeMetaInfo(
                "parallel_node",
                this.getName(),
                this.functionDescription,
                this.id, 
                this.posX, 
                this.posY, 
                this.input.connections, 
                null,
                this.functionDefinitionInstance,
                null, 
                null,
                this.outputParallel.connections); 
    }


    onOutputClicked(markedOutputId) { 
        //if else vem som är previous , jag väntar på nästa click
        eventEmitter.emit("prevClicked", this.onDestClicked, this.id)
    }

    onDestClicked(currNode) {
        currNode.input.connections.push(this.outputParallel.id);
        this.outputParallel.connections.push(currNode.id)
        const connector = new ParaConnector(currNode.id + this.id, this, currNode, null);
        this.registerConnectorUpdater(connector.id, connector.updateConnections);
        currNode.registerConnectorUpdater(connector.id, connector.updateConnections);
        connector.element.classList.add("connector");
        return connector;
    }

    reconnect(connectorsHandler) {
        this.outputParallelConnectionsList.forEach((output) => {
            this.onOutputClicked(this.id);
            this.connectorsHandler(output)
        })
    }


    static CreateExternal(object, inputIds, outputIds) {
        console.log(object)
        const node = new ParallelNode(object.id, object.functionDefinitionInstance);
        node.fillNode(object);
        return node;
    }
}

export default ParallelNode