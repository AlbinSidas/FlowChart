import FlowchartNode from "../flowchart-node";
import ifstyle from "../Styles/style.css";

class ConditionalNode extends FlowchartNode {
    //vid input 0 kör if-delen
    //input annat än 0 kör else-delen
    constructor(id) {
        super()
        this.setHtml('<div></div>')

        //functions
        
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

        this.input  = new NodeIO(this, "box-input");
        this.outputIf = new NodeIO(this, "box-output");
        this.outputElse = new NodeIO(this, "box-output");

        this.element.classList.add(style.if_node);


    }

    didAttach()

    copyOther()

    registerConnectorUpdater()

    removeConnectorUpdater()

    unregisterConnectorUpdater()

    getName()

    setName()

    render()

    elementDrag()

    dragOthers()

    closeDragElement()

    mouseDown()

    onClick()



     
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