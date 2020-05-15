
import Toolbox from './toolbox.js'
import FlowchartNode from "./flowchart-node";
const uuidv1 = require('uuid/v1');
import Modal from './modal.js'
import StartBox from './start-box.js'
import Saving from './save.js'
import View from 'Base/view.js'
import elementString from 'Views/container.html'
import eventEmitter from 'Singletons/event-emitter.js'
import Connector from "./connectors.js";
import IfConnector from "./if-connector.js";
import ElseConnector from "./else-connector.js"
import ParaConnector from "./para-connector.js"
import ShowHideButton from './showHideButton.js';
import ConditionalNode from './conditional-node';
import ParallelNode from './parallel-node';
import API from "Network/network.js"


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
        this.flowchartName = "";
        this.flowchartId = "";
        this.currentFlowchartVer = 0;
        this.currentFlowchartVerIndex = 0;
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
        this.prevClicked      = this.prevClicked.bind(this);

        this.loadFlow = this.loadFlow.bind(this)
        this.incVer = this.incVer.bind(this)
        this.decVer = this.decVer.bind(this)

        // Lägg dessa lyssnare i ett objekt eller i en egen funktion ?
        eventEmitter.on("clicked", this.objectClicked);
        eventEmitter.on("connectorClicked", this.connectorClicked);
        eventEmitter.on("outputClicked", (id) => this.markedOutput = id );
        eventEmitter.on("inputClicked", this.inputClicked);
        eventEmitter.on("prevClicked", this.prevClicked);
        eventEmitter.on("createRunnable", (id) => {   
            
            this.flowchartList = [];
            this.flowchartList.length = 0;           
            
            recursiveFlowchartCreation(id, this.objects, this.flowchartList);
        })
        eventEmitter.on("newFlowchart", (name) => {
            this.newFlowSetup(name);   
        })
        eventEmitter.on("openedFlowchart", (chosenFlowchart) => {  
            const looseNodes = chosenFlowchart.nodes;
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
            this.flowchartName = chosenFlowchart.name;
            this.flowchartId = chosenFlowchart.flowchart_id;
            this.currentFlowchartVer = chosenFlowchart.versionNumber;
            this.syncVerNum();
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
        if (id == this.markedOutput || this.markedOutput == "") { return; }     

        const currNode = this.objects.find(iter => iter.id == id )
        let connector;
        
        if(!currNode.input.connections.includes(this.markedOutput)) {//connector != null) {
            connector = this.sourceNodeHandler(currNode);
            this.attach(connector);
            this.connectorList.push(connector);
        } else {
            //const prevNode = this.objects.find(iter => iter.id == this.markedOutput )
            /*
            sålänge markeOuptut har ett värde, så borde det vara garanterat att den finns
            */
            connector = this.connectorList.find((c) => {
                return c.id == currNode.id + this.markedOutput // prevNode.id; // TODO FIXA DENNa
            });
        }

        this.sourceNodeHandler = () => null;
        this.markedOutput = "";
        //this.nodeType = "";
        connector.updateConnections();
    }

    prevClicked(func, id) {
        this.markedOutput      = id;
        this.sourceNodeHandler = func;
    }

    connectNodes(looseObjects) {
        looseObjects.forEach(iter => {
            const source = this.objects.find(i=> iter.id == i.id);
            source.reconnect(this.inputClicked, iter);
        });
    }


    // ##########LOAD FLOW########
    async loadFlow() {
        this.clearFlowchart();
        const loadedObjects = await this.saveClass.loadFlowVer(this.flowchartId, this.currentFlowchartVer);
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
        this.connectNodes(looseNodes);
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
        
        this.startBox = new StartBox();
        this.attach(this.startBox);
        this.startBox.show();
        
        eventEmitter.on('showHide', () => {
            this.showHide();
        })

        eventEmitter.on('save', () =>  {
            this.asyncFlowSave();
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

    clearFlowchart(){
        for(let i = 1; i < this.objects.length; i++){
            this.markedObject[this.markedObject.length] = this.objects[i];
        }
        this.removeNode();
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
                this.copyObject[i] = this.markedObject[i].clone();//new FlowchartNode(uuidv1());
                this.copyObject[i].copyOther(this.markedObject[i], this.markedObject[i].id, true);
                this.idsbeforepaste[i] = this.markedObject[i].id; 
            }
            
        }
    }

    pasteNode() {
        if (this.copyObject.length == 0) { return; }
        //Create new objects based on the copies and add them to the workspace
        /* 
         * KNOWN BUGG:
         * When pasting a node the positioning can be located outside of the window.
         * A fix for this would be to check the positioning in a similar way as in 
         * the flowchart-node file in the "dragElement" function but the problem here
         * is that we don't have the mouseposition. A fix for that would be to always
         * have a mouseeventlistener as in the copyNode function where we always have a 
         * listener checking the mouseposition. This have been downprioritized as this 
         * could also affect performance.
        */
        let tempRef = [];
        for(let i = 0; i < this.copyObject.length; i++) {
            const pasteObject = this.copyObject[i].clone();
            let offsetX = i > 0 ? (this.copyObject[i].posX-this.copyObject[0].posX) : 0;
            let offsetY = i > 0 ? (this.copyObject[i].posY-this.copyObject[0].posY) : 0;
            pasteObject.copyOther(this.copyObject[i], this.copyObject[i].idRef, false, this.mouseX + offsetX, this.mouseY + offsetY); //[]);
            this.addBox(pasteObject);
            tempRef[i] = pasteObject;
        }
        
        if(tempRef.length <= 1) { return; }       
        
        this.copyObject.forEach((copiedNode, i) => {
            copiedNode.getOutputNodeIOs().forEach((nodeIO, z) => {
                nodeIO.connections.forEach((connection, j) => {
                    if(this.idsbeforepaste.includes(connection)) {
                        for(let k = 0; k < tempRef.length; k++) {
                            if(tempRef[k].idRef == connection) {
                                tempRef[i].getOutputNodeIOs()[z].addConnectionPoint();
                                this.inputClicked(tempRef[k].id);
                            }
                        }
                    }
                })
            });
        });
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
            console.log("ScreenX: " + window.screenX);
            console.log("ScreenY: " + window.screenY);
            console.log("ScrollX: " + window.scrollX);
            console.log("ScrollY: " + window.scrollY);


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

    async asyncFlowSave(){
        try {
            let ver = await API.flowchartAPI.getVerNums(this.flowchartId);
            await this.saveClass.saveFlowVer(this.objects, this.flowchartName, this.flowchartId);
            let max_num_requests = 0;
            while(ver.length == this.currentFlowchartVer || max_num_requests == 1000){
                await this.uppdateVerNum();
                max_num_requests++;
            }
        } catch(e) {
            console.log(e);
        }   
    }

    async saveIdForNewFlowchart(name, saveObj){
        let nameList = await API.flowchartAPI.getNameList();
        for (let i = 0; i < nameList.length; i++){
            if(nameList[i].name == name){
                this.flowchartId = nameList[i].flowchart_id;
            }
        }
        if(this.flowchartId == "") {
            this.flowchartId = saveObj.data.flowchart_id;
        }
    }

    async newFlowSetup(name){
        this.flowchartName = name;
        let flowObj = await this.saveClass.saveFlow(this.objects, this.flowchartName);

        await this.saveIdForNewFlowchart(name, flowObj);
        await this.uppdateVerNum();
    }
    
    getCurrFlowId(){
        return this.flowchartId;
    }
    async syncVerNum(){
        let ver = await API.flowchartAPI.getVerNums(this.flowchartId);
        for(let i = 0; i < ver.length; i++){
            if(ver[i] == this.currentFlowchartVer){
                this.currentFlowchartVerIndex = i;
            }
        }
    }

    async uppdateVerNum(){
        let ver = await API.flowchartAPI.getVerNums(this.flowchartId);
        this.currentFlowchartVer = ver.length;
        this.currentFlowchartVerIndex = this.currentFlowchartVer -1;
        document.getElementById("vercounter").innerHTML = this.currentFlowchartVer;
        
    }

    async incVer(){
        let ver = await API.flowchartAPI.getVerNums(this.flowchartId);
        if(this.currentFlowchartVerIndex < ver.length-1){
            this.currentFlowchartVerIndex++;
            this.currentFlowchartVer = ver[this.currentFlowchartVerIndex];
            document.getElementById("vercounter").innerHTML = this.currentFlowchartVer;
            
            this.loadFlow();
        }
    }

    async decVer(){
        let ver = await API.flowchartAPI.getVerNums(this.flowchartId);
        if(this.currentFlowchartVerIndex > 0){
            this.currentFlowchartVerIndex--;
            this.currentFlowchartVer = ver[this.currentFlowchartVerIndex];
            document.getElementById("vercounter").innerHTML = this.currentFlowchartVer;

            this.loadFlow();
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
