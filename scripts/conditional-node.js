import FlowchartNode from './flowchart-node';
import style from 'Styles/style.css';
import NodeIO from './nodeIO.js';
import { InlineView } from './base/view.js';

class ConditionalNode extends FlowchartNode {
    //vid input 0 kör if-delen
    //input annat än 0 kör else-delen
    constructor(id, functionDefinitionInstance = null) {
        super()
        this.setHtml('<div></div>')

        //functions
        this.onClick          = this.onClick.bind(this);
        this.elementDrag      = this.elementDrag.bind(this);
        this.mouseDown        = this.mouseDown.bind(this);
        this.closeDragElement = this.closeDragElement.bind(this);
        this.getMetaInfo      = this.getMetaInfo.bind(this)
        
        //ui
        this.posX    = 100;
        this.posY    = 100;
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

        this.element.classList.add(style.flowchart_square);
        this.element.id = id;

      //  this.ifconnections = 


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
/*
    didAttach(){}

    copyOther(){}

    registerConnectorUpdater(){}

    removeConnectorUpdater(){}

    unregisterConnectorUpdater(){}

    getName(){}

    setName(){}

    render(){}

    elementDrag(){}

    dragOthers(){}

    closeDragElement(){}

    mouseDown(){}

    onClick(){}
*/


     
    getMetaInfo() {
        return 
            new NodeMetaInfo(
                "conditional", 
                this.functionDescription,
                this.posX, 
                this.posY, 
                this.id, 
                this.input.connections, 
                this.output.connections, 
                this.functionVariables); //behövs detta, troligen inte?
    }



}

export default ConditionalNode;