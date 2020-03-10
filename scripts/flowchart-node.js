import data from './test.js';
import View from 'Base/view.js';
import style from 'Styles/style.css';
import eventEmitter from 'Singletons/event-emitter.js';
import NodeIO from './nodeIO.js';
import NodeMetaInfo from 'Model/node-meta-info.js'
import { InlineView } from './base/view.js';

class FlowchartNode extends View {
    constructor(id){
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
        this.height  = 250;
        this.offsetX = 0;
        this.offsetY = 0;
        this.idRef   = "";
        this._connectorUpdaters = [];
        //flow
        this.id    = id;
        this._name = "";
        this.functionDescription = "No function yet";
        this.functionVariables = [];
        this.funcDefId = null;

        this.input  = new NodeIO(this, "box-input");
        this.output = new NodeIO(this, "box-output");
        //this.functionName = "";
        this.funcitionDefinition = {};
        this.functionNameView = InlineView(`<p id='${this.id}_function'>${this.id} \n has no function</p>`);

        this.element.classList.add(style.flowchart_square);
        this.element.id = id;
        
    }

    changeFunctionName(name){
        //this.functionName = name;
        document.getElementById(`${this.id}_function`).innerHTML = name;
    }


    didAttach(parent) {
        this.attach(this.functionNameView);
        this.attach(this.input);
        this.attach(this.output);
        this.element.onclick     = this.onClick;
        this.element.onmousedown = this.mouseDown;
        this.onScrolledCallbacks = []
    }

    copyOther(other, rid = other.id, mposX = other.posX, mposY = other.posY, cRef = other.output.connections) {
        this.posX = mposX + event.view.scrollX -50;
        this.posY = mposY + event.view.scrollY -50;
        this.offsetX = other.offsetX;
        this.offsetY = other.offsetY;
        this.height = other.height;
        //flow
        this.idRef = rid;
        this._name = other.getName();
        this.functionDescription = other.functionDescription;
        this.output.connections = cRef;
        for (let i = 0; i < other.functionVariables.length; i++){
            this.functionVariables[i] = other.functionVariables[i];
        }
        
    }
    fillNode(other) {
        //fyller i data för en node baserat på ett metaobjekt från servern
        this.posX              = other.pX;
        this.posY              = other.pY;
        this.id                = other.id;
        this.functionVariables = other.functionVariables
        this.funcDefId         = other.funDefId;
        this.nodeDescription   = other.nodeDescription;
        this.element.classList.add(style.flowchart_square);
        this.offsetX           = other.offsetX;
        this.offsetY           = other.offsetY;
        this.functionNameView  = InlineView(`<p id='${this.id}_function'>${this.id}\n has ${this.funcDefId}</p>`);
        this.functionDescription = other.funDefId;
    }

    registerConnectorUpdater(id, func) {
        this._connectorUpdaters.push(func)
    }

    getName() {
        return this._name;
    }
    getInValue() {
        for (let i = 0; i < this.functionVariables.length; i++){
            if(this.functionVariables[i].type == "input"){
                return this.functionVariables[i].value;
            }
        }
        return "no input found";
    }
    getOutValue() {
        for (let i = 0; i < this.functionVariables.length; i++){
            if(this.functionVariables[i].type == "output"){
                return this.functionVariables[i].value;
            }
        }
        return "no output found";
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
        const maxHeightRelativeToWindow      = window.innerHeight - this.height
        const boxPositionRelativeToContainer = maxHeightRelativeToWindow + window.scrollY
        const boxPositionRelativeToWindow    = nextY - window.scrollY
        nextY = boxPositionRelativeToWindow >= maxHeightRelativeToWindow ? boxPositionRelativeToContainer : nextY
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
        eventEmitter.emit("clicked", this.id, e);
        this.lastScrollPosition = window.scrollY;
        this.offsetX = e.clientX - this.posX;
        this.offsetY = e.clientY - this.posY;

        document.addEventListener('mouseup', (e) => {this.closeDragElement(e)})
        document.onmousemove = (e) => {  this.elementDrag(e)   };
        let x = 0
        let y = 0
        let shadow = ` box-shadow: ${x}px ${y}px 40px 20px var(--node-highlight)`;
        let elementStyle = document.getElementById(this.id).style.cssText;
        document.getElementById(this.id).setAttribute("style", elementStyle + shadow);
        //eventEmitter.emit("dragged", e);
     }

    getMetaInfo() {
        console.log("i noden", this.input.connections)
        return new NodeMetaInfo(
                this.type,
                this.getName(), 
                this.functionDescription,
                this.id, 
                this.posX, 
                this.posY, 
                this.funcDefId,
                this.input.connections, 
                this.output.connections, 
                this.functionVariables);
    }

    onClick(e) {
        console.log("node click");  
        //was moved to mousedown to fix bug
        //eventEmitter.emit("clicked", this.id, e);
    }
    
}
export default FlowchartNode;
