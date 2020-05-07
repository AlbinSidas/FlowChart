import data from './test.js';
import View from 'Base/view.js';
import style from 'Styles/style.css';
import eventEmitter from 'Singletons/event-emitter.js';
import NodeIO from './nodeIO.js';
import NodeMetaInfo from 'Model/node-meta-info.js'
import { InlineView } from './base/view.js';
import Connector from "./connectors.js";
import Node from './node'
const uuidv1 = require('uuid/v1');

class FlowchartNode extends Node {
    constructor(id, functionDefinitionInstance = null){
        super(id, functionDefinitionInstance)
        this.setHtml('<div></div>')
        this.onClick          = this.onClick.bind(this);
        this.elementDrag      = this.elementDrag.bind(this);
        this.mouseDown        = this.mouseDown.bind(this);
        this.closeDragElement = this.closeDragElement.bind(this);
       
        //{};
        this.functionNameView = InlineView(`<p id='${this.id}_function'>${this.id} \n has no function</p>`);

        this.element.classList.add(style.flowchart_square);
        this.element.id = id;
    }

    clone() {
        return new FlowchartNode(uuidv1());
    }


    refreshPreview(){
        // NOTE: allt som ska vara tillgängligt i preview dynamiskt ändras här ..
        this.functionNameView.changeHtml(`<p id='${this.id}_function'>${this.id}\n has ${this.getName()}</p>`);
    }


    didAttach(parent) {
        this.attach(this.functionNameView);
        this.attachIO();
        this.element.onclick     = this.onClick;
        this.element.onmousedown = this.mouseDown;
        this.onScrolledCallbacks = []
    }

    // ======================== COPY ======================

    copyConnections(other) {
        this.output.connections = other.output.connections;
    }

    copyOther(other, rid, copyRef = false, mposX = other.posX, mposY = other.posY) {//, cRef = other.output.connections) {
        this.posX = mposX + event.view.scrollX -50;
        this.posY = mposY + event.view.scrollY -50;
        this.offsetX = other.offsetX;
        this.offsetY = other.offsetY;
        this.height = other.height;
        //flow
        this.idRef = rid;
        this._name = other.getName();
        this.functionDescription = other.functionDescription;
        //this.output.connections = cRef;
        if(copyRef){
            this.copyConnections(other);
        }
        
        this.functionDefinitionInstance = other.functionDefinitionInstance;
        if(this.functionDefinitionInstance) {
            other.functionDefinitionInstance.functionVariables.forEach((element, i) => {
                this.functionDefinitionInstance.functionVariables[i] = other.functionDefinitionInstance.functionVariables[i];
            });
        }    
    }

    // ======================== END COPY ================
    fillNode(other) {
        // incomplete state med this är farligt, vi gör om de här till Static funktioner sen
        //fyller i data för en node baserat på ett metaobjekt från servern
        this.posX              = other.pX;
        this.posY              = other.pY;
        this.id                = other.id;
        //this.functionVariables = other.functionVariables

        //this.functionDefinitionInstance = other.functionDefinitionInstance
        // if(other.functionDefinitionInstance) {
        //     other.functionDefinitionInstance.functionVariables.forEach((element, i) => {
        //         this.functionDefinitionInstance.functionVariables[i] = other.functionDefinitionInstance.functionVariables[i];
        //     });
        // }
        this.setName(other.nodeName);
        this.funcDefId         = other.funDefId;
        this.nodeDescription   = other.nodeDescription;
        this.element.classList.add(style.flowchart_square);
        this.offsetX           = other.offsetX;
        this.offsetY           = other.offsetY;
        this.functionNameView  = InlineView(`<p id='${this.id}_function'>${this.id}\n has ${this.getName()}</p>`);
        this.functionDescription = other.funDefId;
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
        
        Object.keys(this._connectorUpdaters).forEach((key) => {
            this._connectorUpdaters[key]()
        });
    }

    dragOthers(pxm, pym){
        this.posX += pxm;
        this.posY += pym;
        this.element.style.top  = `${this.posY}px`
        this.element.style.left = `${this.posX}px`
        Object.keys(this._connectorUpdaters).forEach((key) => {
            this._connectorUpdaters[key]()
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


    getMetaType() {
        return "flowchart_node";
    }

    onClick(e) {}

    static CreateExternal(object, inputIds, outputIds) {
        const node = new FlowchartNode(object.id, object.functionDefinitionInstance);
        node.fillNode(object);
        return node;
    }


}


export default FlowchartNode;
