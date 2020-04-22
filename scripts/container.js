
import Toolbox from './toolbox.js'
import StartNode from './start-node.js'
import FlowchartNode from "./flowchart-node";
const uuidv1 = require('uuid/v1');
import Modal from './modal.js'
import Saving from './save.js'
import View from 'Base/view.js'
import elementString from 'Views/container.html'
import eventEmitter from 'Singletons/event-emitter.js'
import Connector from "./connectors.js";
import ShowHideButton from './showHideButton.js';
import ConditionalNode from './conditional-node';
import ParallelNode from './parallel-node';

class Container extends View {
    constructor() {
        super()
        
        this.setHtml(elementString)

        this.onClick    = this.onClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

        this.height = 3000;
        this.width = window.innerWidth;
        this.childScrolled = this.childScrolled.bind(this)

	    this.saveClass      = new Saving();
        this.objects        = [];
        this.markedObject   = [];
        this.markedConnector= [];
        this.markedOutput   = "";
        this.nodeType       = "";
        this.connectorList  = [];
        this.objectClick    = {};
        this.connectorClick = {};        
        this.copyObject     = [];
        this.toolboxVisible = false;
        this.flowchartList  = [];
        this.idsbeforepaste = [];

        
        this.mouseX     = 0;
        this.mouseY     = 0;
        this.sizeDelta  = 200;

        this.copyNode         = this.copyNode.bind(this);
        this.pasteNode        = this.pasteNode.bind(this);
        this.removeNode       = this.removeNode.bind(this);
        this.objectClicked    = this.objectClicked.bind(this);
        this.connectorClicked = this.connectorClicked.bind(this);
        this.inputClicked     = this.inputClicked.bind(this);
        this.ifClicked        = this.ifClicked.bind(this);
        this.elseClicked      = this.elseClicked.bind(this);
        this.parallelClicked  = this.parallelClicked.bind(this);
        

        this.loadFlow = this.loadFlow.bind(this)

        // Lägg dessa lyssnare i ett objekt eller i en egen funktion ?
        eventEmitter.on("clicked", this.objectClicked);
        eventEmitter.on("connectorClicked", this.connectorClicked);
        eventEmitter.on("outputClicked", (id) => this.markedOutput = id );
        eventEmitter.on("inputClicked", this.inputClicked); //behöver nog veta om den ska köra eller inte beroende på om en outputclicked eller en if/elseclicked kom innan
        eventEmitter.on("ifClicked", this.ifClicked);
        eventEmitter.on("elseClicked", this.elseClicked);
        eventEmitter.on("parallelClicked", this.parallelClicked);
        eventEmitter.on("createRunnable", (id) => {   
            
            this.flowchartList = [];
            this.flowchartList.length = 0;           
            
            recursiveFlowchartCreation(id, this.objects, this.flowchartList);
        })
    }

    objectClicked(id, e) {
        /*
            Set the mouseevent to objectClick to compare the
            event on workspace to determine if it's a "mark off" or click on object.
        */
        
        this.objectClick = e;
        // Finds the correct node in the created nodes.
        let obj = this.objects.find((obj) => {
            return obj.id == id;
        });

        // If the click is on the marked object it's a doubleclick and will open the modal.
        if (this.markedObject.includes(obj) ) {
            // Prevents further draging after doubleclick.

            obj.closeDragElement();
            this.modal.show(obj);
            window.onclick = function (event) {
                if (event.target == this.modal.element) {
                    this.modal.close();  
                }
            }.bind(this)
        } else {
            if (this.markedObject.length != 0 && e.ctrlKey == false) {
                this.removeMarked();
                this.removeMarkedConnector();
            }
            this.markedObject[this.markedObject.length] = obj;
            
            if(this.markedObject.length > 1){ 
                this.highlightConnector(obj);
            }
            else{
               // this.removeMarkedConnector();
            }
        }
    }
    highlightConnector(obj){
        for(let i =0; i < this.connectorList.length; i++){
            if(this.connectorList[i].currNode.id == obj.id){
                for (let j = 0; j < this.markedObject.length; j++){
                    if(this.markedObject[j].id == this.connectorList[i].prevNode.id && this.markedObject[j].id != obj.id){
                        this.connectorList[i].glow();
                    }
                }
            }
            else if (this.connectorList[i].prevNode.id == obj.id){              
                for (let j = 0; j < this.markedObject.length; j++){
                    if(this.markedObject[j].id == this.connectorList[i].currNode.id && this.markedObject[j].id != obj.id){
                        this.connectorList[i].glow();  
                    }
                }
            }
        }
    }
    
    inputClicked(id) {
        if (id == this.markedOutput || this.markedOutput == "") {
            return;V
        }     
        const currNode = this.objects.find(temp => temp.id == id )
        const prevNode = this.objects.find(temp => temp.id == this.markedOutput )
    
        let connector = {};
        if (!currNode.input.connections.includes(this.markedOutput)) {
            currNode.input.connections.push(this.markedOutput);
            if(this.nodeType == ""){
                prevNode.output.connections.push(currNode.id);
            }
            else if(this.nodeType == "if"){
                prevNode.outputIf.connections.push(currNode.id);
            }
            else if(this.nodeType == "else"){
                prevNode.outputElse.connections.push(currNode.id);
            }
            else if(this.nodeType == "parallel"){
                prevNode.outputParallel.connections.push(currNode.id)
            };
            connector = new Connector(currNode.id + prevNode.id, prevNode, currNode, this.nodeType);
            prevNode.registerConnectorUpdater(connector.id, connector.updateConnections);
            currNode.registerConnectorUpdater(connector.id, connector.updateConnections);
            connector.element.classList.add("connector");
            this.attach(connector);
            this.connectorList.push(connector);
        }
        else {
            connector = this.connectorList.find((c) => {
                return c.id == currNode.id + prevNode.id; 
            });
        }
        this.markedOutput = "";
        this.nodeType = "";
        connector.updateConnections();
        
    }

    ifClicked(id){
        this.markedOutput = id;
        this.nodeType = "if";
    }

    elseClicked(id){
        this.markedOutput = id;
        this.nodeType = "else";
    }

    parallelClicked(id){
        this.markedOutput = id;
        this.nodeType = "parallel";
    }

    connectNodes(looseObjects) {

        looseObjects.forEach(item => {
			if(item.inputConnectionList.length !=0 && item.inputConnectionList.includes("start-node")){
				eventEmitter.emit("outputClicked", "start-node");
				eventEmitter.emit("inputClicked", item.id);
            }
            if(item.type == "flowchart_node"){
                item.outputConnectionList.forEach((output) => {
				    eventEmitter.emit("outputClicked", item.id);
				    eventEmitter.emit("inputClicked", output);
                })
            }
            else if(item.type == "conditional_node"){
                item.outputIfConnectionsList.forEach((outputIf) =>{
                    eventEmitter.emit("ifClicked", item.id);
                    eventEmitter.emit("inputClicked", outputIf);
                })
                item.outputElseConnectionsList.forEach((outputElse) =>{
                    eventEmitter.emit("elseClicked", item.id);
                    eventEmitter.emit("inputClicked", outputElse);
                })
            }
            else if(item.type == "parallel_node"){
                item.outputParallelConnectionsList.forEach((outputParallel) =>{
                    eventEmitter.emit("parallelClicked", item.id);
                    eventEmitter.emit("inputClicked", outputParallel);
                })
            }
        })
    }


    // ##################
    async loadFlow() {
        const loadedObjects = await this.saveClass.loadFlow(this);
        const looseNodes = loadedObjects.nodes;
        looseNodes.forEach((looseNode) => {
            if(looseNode.type == "flowchart_node"){
              this.objects.push(FlowchartNode.CreateExternal(looseNode)) 
            }
            else if(looseNode.type == "conditional_node"){
                this.objects.push(ConditionalNode.CreateExternal(looseNode))
            }
            else if(looseNode.type == "parallel_node"){
                this.objects.push(ParallelNode.CreateExternal(looseNode))
            }
        })

        this.objects.forEach(obj => this.attach(obj))
        this.connectNodes(looseNodes)
    }

    connectorClicked(id, e){
        this.removeMarkedConnector();
        this.connectorClick = e;

        let obj = this.connectorList.find((obj) => {
            return obj.id == id;
        });
        this.removeMarked();
        this.markedConnector[0] = obj;
    }

    didAttach(parent) {
        this.toolbox = new Toolbox(this);
        
        this.attach(this.toolbox)

        const showHideButton = new ShowHideButton();
        this.attach(showHideButton);

        this.modal = new Modal();
        this.attach(this.modal);
        
        eventEmitter.on('showHide', () => {
            this.showHide();
        })

        eventEmitter.on('save', () =>  {
            this.saveClass.saveFlow(this.objects)
        })

        eventEmitter.on('increaseSize', () =>  {
            this.increaseSize();
        })
        eventEmitter.on('decreaseSize', () =>  {
            this.decreaseSize();
        })
        eventEmitter.on('increaseSizeHorizontal', () =>  {
            this.increaseSizeHorizontal();
        })
        eventEmitter.on('decreaseSizeHorizonal', () =>  {
            this.decreaseSizeHorizontal();
        })
        eventEmitter.on('dragged', (pxm, pym, id) =>  {
            if(this.markedObject.length > 0){
                for (let i = 0; i < this.markedObject.length; i++){
                    if(this.markedObject[i].id != id){
                        this.markedObject[i].dragOthers(pxm, pym);
                    }
                }

            }
        })


        this.element.onkeydown = this.onKeyPress;
        this.element.onclick = this.onClick;
    }

    onClick(e) {
        if ((e.clientX != this.objectClick.clientX || e.clientY != this.objectClick.clientY) && this.markedObject.length != 0) {
            this.removeMarked();
            this.removeMarkedConnector();
        }
        if ((e.clientX != this.connectorClick.clientX || e.clientY != this.connectorClick.clientY) && this.markedConnector.length != 0) {
            this.removeMarkedConnector();
        }
    }

    removeMarked() {
        for (let i = this.markedObject.length-1; i >= 0; i--){
            let css = document.getElementById(this.markedObject[i].id).style.cssText;
            css = css.split(" box-shadow")[0];
            document.getElementById(this.markedObject[i].id).style.cssText = css;
        }
        this.markedObject = [];
    }

    removeMarkedConnector() {
        for (let i = this.connectorList.length-1; i >= 0; i--){
            this.connectorList[i].unglow();
        }
        this.markedConnector = [];
    }

    removeNode() { // 68
        if (this.markedObject.length != 0) {

            for (let j = this.markedObject.length-1; j >= 0; j--){
                this.objects.splice( this.objects.indexOf(this.markedObject[j]), 1 );
                for( let i = this.connectorList.length - 1 ; i >= 0 ; i-- ) {
                    if (this.connectorList[i].id.includes(this.markedObject[j].id) ) {
                        let connector = this.connectorList[i];
                        this.markedConnector[0] = connector;
                        this.removeConnector();
                        //this.connectorList.splice(i, 1);
                        //let connectorElement = document.getElementById(connector.id);
                        //connectorElement.parentElement.removeChild(connectorElement);
                    }
                }
                let nodeElement = document.getElementById(this.markedObject[j].id);
                nodeElement.parentElement.removeChild(nodeElement);
                
            }
            this.markedObject = [];
        }
    }

    copyNode() {
        if (this.markedObject.length != 0) {
            // Save a copy list without a reference to the original objects.
            this.copyObject = [];
            this.idsbeforepaste = [];
            
            document.addEventListener('mousemove', (e) => { this.mouseX = e.clientX; this.mouseY = e.clientY});
            for(let i = 0; i < this.markedObject.length; i++){
                this.copyObject[i] = new FlowchartNode(uuidv1());
                this.copyObject[i].copyOther(this.markedObject[i], this.markedObject[i].id);
                this.idsbeforepaste[i] = this.markedObject[i].id; 
            }
            
        }
    }

    pasteNode() {
        if (this.copyObject.length != 0) {
            //Create new objects based on the copies and add them to the workspace
            let tempRef = [];
            for(let i = 0; i < this.copyObject.length; i++){
                let pasteObject = new FlowchartNode(uuidv1());
                if(i == 0){
                    pasteObject.copyOther(this.copyObject[i], this.copyObject[i].idRef, this.mouseX, this.mouseY, []);
                }
                else {
                    pasteObject.copyOther(this.copyObject[i], this.copyObject[i].idRef, this.mouseX+(this.copyObject[i].posX-this.copyObject[0].posX), this.mouseY+(this.copyObject[i].posY-this.copyObject[0].posY), []);
                }
                this.addBox(pasteObject);
                tempRef[i] = pasteObject;
                
            }
            if(tempRef.length > 1){
                for(let i = 0; i < this.copyObject.length; i++){    
                    for(let j = 0; j < this.copyObject[i].output.connections.length; j++){
                        if(this.idsbeforepaste.includes(this.copyObject[i].output.connections[j])){                           
                            for(let k = 0; k < tempRef.length; k++){
                                if(tempRef[k].idRef == this.copyObject[i].output.connections[j]){
                                    eventEmitter.emit("outputClicked", tempRef[i].id);
                                    eventEmitter.emit("inputClicked", tempRef[k].id);
                                }
                            }
                            
                        }
                    }
                }
            }
            
        }
    }

    onKeyPress(e){

        if(e.ctrlKey){
            switch(e.keyCode) {
                case 67: 
                    // 67 = C Copy
                    this.copyNode();
                    break;

                case 86:
                    // 86 = V Paste
                    this.pasteNode();
                    break;

                case 68:
                    // 68 = D Remove
                    
                    e.preventDefault();
                    if(this.markedObject.length != 0){
                        this.removeNode();
                    }
                    else if(this.markedConnector.length != 0){
                        this.removeConnector();
                        this.markedConnector = [];
                    }
                    e.preventDefault();
                    break;
            }
        }
    }

    removeConnectorFromNode(first, second, removed_id, array, i){
        if (this.objects[i].id == second.id && array != undefined) {
            for(let j = 0; j < array.connections.length; j++){
                if(array.connections[j] == first.id){
                    array.connections.splice(j);
                    this.objects[i].removeConnectorUpdater(removed_id);
                    return;
                }
            }
        }
    }

    removeConnector(){
        let removed = this.markedConnector[0];
        let startNodeTest = RegExp('start-node');
        // this loop removes the connector id from nodes
        for( let i = 0 ; i < this.objects.length; i++ ) {
            // For regular nodes
            this.removeConnectorFromNode(removed.prevNode, removed.currNode, removed.id, this.objects[i].input, i);
            this.removeConnectorFromNode(removed.currNode, removed.prevNode, removed.id, this.objects[i].output, i);
            // For if-nodes
            this.removeConnectorFromNode(removed.currNode, removed.prevNode, removed.id, this.objects[i].outputIf, i);
            this.removeConnectorFromNode(removed.currNode, removed.prevNode, removed.id, this.objects[i].outputElse, i);
            // For parallel-nodes
            this.removeConnectorFromNode(removed.currNode, removed.prevNode, removed.id, this.objects[i].outputParallel, i);
        }
        let connectorElement = document.getElementById(removed.id);
        connectorElement.parentElement.removeChild(connectorElement);
        for(let i = 0; i < this.connectorList.length; i++){
            if(this.connectorList[i].id == removed.id){
                this.connectorList.splice(i,1);
            }
        }
    }
    render() {
        //this.child_views.forEach(c => c.render());
        this.setHeight(this.height)
        this.setWidth(this.width)
        return this.element;
    }

    increaseSize() {
        this.setHeight(this.height + this.sizeDelta)
    }

    decreaseSize(){
        if(window.innerHeight < this.height - this.sizeDelta){
            for(let i = 0; i < this.objects.length; i++) {
                const flowchartNode = this.objects[i];
                if(flowchartNode.getPosY() + flowchartNode.getHeight() > this.height - this.sizeDelta) {
                    return;
                }
            }
            this.setHeight(this.height - this.sizeDelta);
        }
    }

    increaseSizeHorizontal() {
        this.setWidth(this.width + this.sizeDelta);
    }

    decreaseSizeHorizontal() {
        if(window.innerWidth < this.width - this.sizeDelta) {
            for(let i = 0; i < this.objects.length; i++) {
                const flowchartNode = this.objects[i];
                if(flowchartNode.getPosX() + flowchartNode.getWidth() > this.width - this.sizeDelta) {
                    return;
                }
            }
            this.setWidth(this.width - this.sizeDelta);
        }
    }

    showHide() {
        if (this.toolboxVisible) {
            this.toolbox.hide();
            this.toolboxVisible = false;
        }
        else {
            this.toolbox.show();
            this.toolboxVisible = true;
        }    
    }

    setHeight(height) {
        this.height = height;
        this.element.style.height = `${height}px`;
    }

    setWidth(width) {
        this.width = width;
        this.element.style.width = `${width}px`
    }

    addBox(box) {
        this.objects.push(box);
        this.attach(box);
        box.onScrolled(this.childScrolled);
    }

    childScrolled(posY, height) {
        if((posY + height) >= this.height) {
            this.increaseSize();
        }
    }

}

function recursiveFlowchartCreation(id, objects, flowchartList) {
    //Recursivly runs through all nodes and adds them to a list in the order of left to right from lowest and up.
    let outputNode = objects.find((temp) => {
        return temp.id == id;
    });
    let add = true
    for (let i = 0; i < flowchartList.length; i++){
        if (outputNode.id == flowchartList[i].id){
            add = false;
        }     
    }     
    if (add) {flowchartList.push(outputNode);}
    

    for (let i = 0; i < outputNode.output.connections.length; i++){
        let inputNode = objects.find((temp) => {
            return temp.id == outputNode.output.connections[i];
        
        });
        //flowchartList.push(inputNode)       
        recursiveFlowchartCreation(inputNode.id, objects, flowchartList);
    }
}


export default Container;
