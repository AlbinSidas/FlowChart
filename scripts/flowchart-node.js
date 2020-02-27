import data from './test.js';
import View from 'Base/view.js';
import style from 'Styles/style.css';
import eventEmitter from 'Singletons/event-emitter.js';
import NodeIO from './nodeIO.js';

class FlowchartNode extends View {
    constructor(id){
        super()

        this.setHtml('<div></div>')
    
        //functions
        this.onClick          = this.onClick.bind(this);
        this.elementDrag      = this.elementDrag.bind(this);
        this.mouseDown        = this.mouseDown.bind(this);
        this.closeDragElement = this.closeDragElement.bind(this);

        //ui
        this.posX    = 100;
        this.posY    = 100;
        this.height  = 100;
        this.oldPosY = this.posY;
        this.oldPosX = this.posX;
        this.oldX    = this.posX;
        this.oldY    = this.posY;
        this.offsetX = 0;
        this.offsetY = 0;

        this._connectorUpdaters = [];
        //flow
        this.id    = id;
        this._name = "";
        this.functionDescription = "No function yet";
        this.userMadeVariables = {};

        this.input  = new NodeIO(this, "box-input");
        this.output = new NodeIO(this, "box-output"); 
        
        this.element.classList.add(style.flowchart_square);
        this.element.id = id;
    }

    // run(){
    //     console.log(this.functionDescription);
    //     for (output in this.output.connections){
    //         output.run();
    //     }
    // }


    didAttach(parent) {
        this.attach(this.input);
        this.attach(this.output);
        this.element.onclick     = this.onClick;
        this.element.onmousedown = this.mouseDown;
        this.onScrolledCallbacks = []
    }

    copyOther(other, mposX = other.posX, mposY = other.posY) {
        this.posX = mposX + event.view.scrollX -50;
        this.posY = mposY + event.view.scrollY -50;
        this.oldX = this.posX;
        this.oldY = this.posY;
        this.offsetX = other.offsetX;
        this.offsetY = other.offsetY;
        this.height = other.height;
        //flow
        this._name = other.getName();
        this.functionDescription = other.functionDescription;

        //fullösning för att avreferera ist för this.userMadeVariables = other.userMadeVariables;
        //om nån kommer på ett bätre alternativ kän er välkommna att fixa
        const keys = Object.keys(other.userMadeVariables)
        for (const key of keys){
            this.userMadeVariables[key] = other.userMadeVariables[key];
        }
        
    }
    fillNode(other) {
        //fyller i data för en node baserat på ett metaobjekt från servern
        this.posX = other.pX;
        this.posY = other.pY;
        this.oldX = this.posX;
        this.oldY = this.posY;
        this.offsetX = other.offsetX;
        this.offsetY = other.offsetY;
        this.height = other.height;
        //flow
        this.functionDescription = other.functionDescription;
        this.userMadeVariables = other.extra;
    }

    registerConnectorUpdater(id, func) {
        this._connectorUpdaters.push(func)
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;
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
        eventEmitter.emit("dragged", nextX - this.posX ,  nextY - this.posY, this.id);
        this.posX = nextX;
        this.posY = nextY;

        this._connectorUpdaters.forEach(callback => {
            callback();
        });
    }
    dragOthers(pxm, pym){
        this.posX += pxm;
        this.posY += pym;
        this.element.style.top  = `${this.posY}px`
        this.element.style.left = `${this.posX}px`
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
        document.onmousemove = (e) => {  this.elementDrag(e)   };
        console.log(this.oldPosX)
        let x = 0
        let y = 0
        let shadow = ` box-shadow: ${x}px ${y}px 40px 20px #0ff;`;
        let elementStyle = document.getElementById(this.id).style.cssText;
        document.getElementById(this.id).setAttribute("style", elementStyle + shadow);
        //eventEmitter.emit("dragged", e);
     }

    onClick(e) {
        eventEmitter.emit("clicked", this.id, e);
    }
    
}
export default FlowchartNode;
