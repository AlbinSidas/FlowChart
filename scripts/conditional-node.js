import FlowchartNode from './flowchart-node';
import style from 'Styles/style.css';
import NodeIO from './nodeIO.js';
import NodeMetaInfo from 'Model/node-meta-info.js'
import { InlineView } from './base/view.js';

class ConditionalNode extends FlowchartNode {
    constructor(id, functionDefinitionInstance = null) {
        super()
        this.setHtml('<div class="ifnode"></div>')

        //functions
        this.onClick          = this.onClick.bind(this);
        this.elementDrag      = this.elementDrag.bind(this);
        this.mouseDown        = this.mouseDown.bind(this);
        this.closeDragElement = this.closeDragElement.bind(this);
        this.getMetaInfo      = this.getMetaInfo.bind(this);
        
        //ui
        this.posX    = window.scrollX + 100;
        this.posY    = window.scrollY + 100;
        this.height  = 150;
        this.offsetX = 0;
        this.offsetY = 0;
        this.idRef   = "";
        this._connectorUpdaters = {}
        //flow
        this.id    = id;
        this._name = "";

        this.input  = new NodeIO(this, "box-input");
        this.outputIf = new NodeIO(this, "box-outputIf");
        this.outputElse = new NodeIO(this, "box-outputElse");
        this.functionNameView = InlineView(`<p id='${this.id}_function'>${this.id}</p>`);

        this.element.classList.add(style.conditionalnode);
        this.element.id = id;
    }

    didAttach(parent) {
        this.attach(this.functionNameView);
        this.attach(this.input);
        this.attach(this.outputIf);
        this.attach(this.outputElse);
        this.element.onclick     = this.onClick;
        this.element.onmousedown = this.mouseDown;
        this.onScrolledCallbacks = []
    }
     
    getMetaInfo() {
        return new NodeMetaInfo(
                "conditional_node",
                this.getName(),
                this.functionDescription,
                this.id, 
                this.posX, 
                this.posY, 
                this.input.connections, 
                null,
                this.functionDefinitionInstance,
                this.outputIf.connections, 
                this.outputElse.connections,
                null); 
    }

    
    
    static CreateExternal(object, inputIds, outputIds) {
        console.log(object)
        const node = new ConditionalNode(object.id, object.functionDefinitionInstance);
        node.fillNode(object);
        return node;
    }

}

export default ConditionalNode;