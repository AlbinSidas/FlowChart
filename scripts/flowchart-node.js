import data from './test.js';
import {coordinated, hierarchical, clickable, html, ViewState} from 'Base/view.js';
import style from 'Styles/style.css';
import eventEmitter from 'Singletons/event-emitter.js';
import NodeIO from './nodeIO.js';



const FlowchartNode = (id) => {
    let viewState = ViewState('<div></div>', 0, 50)
    let input     = new NodeIO(this, "box-input")
    let output    = new NodeIO(this, "box-output")
    
    let flowState = {
        id: id,
        functionDescription: "No function yet",
        input:   input,
        output:  output,
        posX:    100,
        posY:    100,
        offsetX: 0;
        offsetY: 0;
    }

    const dom                 = domHandler(viewState)
    const coordinationHandler = coordinated(viewState)
    
    dom.attach(input, output)
    
    //del-assign först, sen skicka det till container handler, istället för att paramatisers
    const handler             = flowHandler(flowState, viewState, dom, coordinationHandler)

    const extEventHandler     = externEventHandler(viewState)
    extEventHandler.setOnClick(handler.onClick)
    extEventHandler.setOnMouseDown(handler.on)
    
    coordinationHandler.setHeight(viewState.height)
    //coordinationHandler.setWidth(viewState.height) // View state?
    dom.style(`position:absolut; left: ${flowState.posX}px; top:${flowState.posY}px;`)

    return Object.assign(
        {},
        handler,
        coordinationHandler,
        dom,
        extEventHandler
    )

}



const flowHandler = (flowState, viewState) => ({
                          
    onClick: (e) => {
        eventEmitter.emit("clicked", this.id, e);
    },
    copyOther: (other, mposX = other.posX, mposY = other.posY) =>  {
        flowState.posX    = mposX + event.view.scrollX -50;
        flowState.posY    = mposY + event.view.scrollY -50;
        flowState.offsetX = other.offsetX;
        flowState.offsetY = other.offsetY;
        viewState.height  = other.height;
        //flow
        flowState.functionDescription = other.functionDescription;
    },
    mouseDown: (e) =>  { // CHECKPOINT
        e = e || window.event;
        e.preventDefault();

        this.lastScrollPosition = window.scrollY;
        this.offsetX = e.clientX - this.posX;
        this.offsetY = e.clientY - this.posY;

        document.addEventListener('mouseup', (e) => {this.closeDragElement(e)})
        document.onmousemove = (e) => { this.elementDrag(e)   };

        let x = 0
        let y = 0
        let shadow = ` box-shadow: ${x}px ${y}px 40px 20px #0ff;`;
        let elementStyle = document.getElementById(this.id).style.cssText;
        document.getElementById(this.id).setAttribute("style", elementStyle + shadow);
     }

})


class FlowchartNode extends View {
    constructor(id){
        super('<div></div>')
    
        //functions
        this.onClick          = this.onClick.bind(this);
        this.elementDrag      = this.elementDrag.bind(this);
        this.mouseDown        = this.mouseDown.bind(this);
        this.closeDragElement = this.closeDragElement.bind(this);

        //ui
        this.posX    = 100;
        this.posY    = 100;
        this.offsetX = 0;
        this.offsetY = 0;

        this._connectorUpdaters = [];
        //flow
        this.id = id;
        this.functionDescription = "No function yet";

        this.input  = new NodeIO(this, "box-input");
        this.output = new NodeIO(this, "box-output"); 
        
        this.element.classList.add(style.flowchart_square);
        this.element.id = id;
    }

    didAttach(parent) {
        this.attach(this.input);
        this.attach(this.output);
        this.element.onclick     = this.onClick;
        this.element.onmousedown = this.mouseDown;
        this.onScrolledCallbacks = []
    }



    registerConnectorUpdater(id, func) {
        this._connectorUpdaters.push(func)
    }

    unregisterConnectorUpdater(id) {

    }
    render() {
        this.element.setAttribute('style', `position:absolut; left: ${this.posX}px; top:${this.posY}px; height:${this.height}px`)
        return this.element;
    }

    print() {
        console.log(data.apa);
    }

    elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        let nextX = e.clientX-this.offsetX
        let nextY = e.clientY-this.offsetY
        nextX = nextX < 0 ? 0 : nextX
        nextY = nextY < 0 ? 0 : nextY
        const max_height_relative_to_window      = window.innerHeight - this.height
        const box_position_relative_to_container = max_height_relative_to_window + window.scrollY
        const box_position_relative_to_window    = nextY - window.scrollY
        nextY = box_position_relative_to_window >= max_height_relative_to_window ? box_position_relative_to_container : nextY
        this.element.style.top  = `${this.posY}px`
        this.element.style.left = `${nextX}px`
        this.posX = nextX;
        this.posY = nextY;

        this._connectorUpdaters.forEach(callback => {
            callback();
        });
    }

    closeDragElement(e) {
        document.onmouseup   = null;
        document.onmousemove = null;
        document.onwheel     = null;
    }

    onScrolled(callback) {
        this.onScrolledCallbacks.push(callback);
    }


    mouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        this.lastScrollPosition = window.scrollY;
        this.offsetX = e.clientX - this.posX;
        this.offsetY = e.clientY - this.posY;

        document.addEventListener('mouseup', (e) => {this.closeDragElement(e)})
        document.onmousemove = (e) => { this.elementDrag(e)   };

        let x = 0
        let y = 0
        let shadow = ` box-shadow: ${x}px ${y}px 40px 20px #0ff;`;
        let elementStyle = document.getElementById(this.id).style.cssText;
        document.getElementById(this.id).setAttribute("style", elementStyle + shadow);
     }


    
}
export default FlowchartNode;
