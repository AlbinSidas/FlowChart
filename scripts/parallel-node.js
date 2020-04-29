import FlowchartNode from './flowchart-node'
import style from 'Styles/style.css'
import NodeIO from './nodeIO'
import NodeMetaInfo from 'Model/node-meta-info.js'
import { InlineView } from './base/view.js'

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

        this.outputParallel = new NodeIO(this, "box-parallel");
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

    static CreateExternal(object, inputIds, outputIds) {
        console.log(object)
        const node = new ParallelNode(object.id, object.functionDefinitionInstance);
        node.fillNode(object);
        return node;
    }
}

export default ParallelNode