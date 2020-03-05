
import Toolbox from './toolbox.js'
import FlowchartNode from "./flowchart-node";
const uuidv1 = require('uuid/v1');
import Modal from './modal.js'
import Saving from './save.js'
import View from 'Base/view.js'
import elementString from 'Views/container.html'
import eventEmitter from 'Singletons/event-emitter.js'
import Connector from "./connectors.js";
import ShowHideButton from './showHideButton.js';

class Container extends View {
    constructor() {
        super()

        this.setHtml(elementString)
        this.onClick    = this.onClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

        this.height = 3000;
        this.width = window.innerWidth;
        this.childScrolled = this.childScrolled.bind(this)

	    this.saveClass     = new Saving();
        this.objects       = [];
        this.markedObject  = [];
        this.markedOutput  = "";
        this.connectorList = [];
        this.objectClick   = {};
        this.copyObject    = [];
        
        this.mouseX     = 0;
        this.mouseY     = 0;
        this.sizeDelta  = 200

        this.copyNode      = this.copyNode.bind(this)
        this.pasteNode     = this.pasteNode.bind(this)
        this.removeNode    = this.removeNode.bind(this)
        this.objectClicked = this.objectClicked.bind(this)
        this.inputClicked  = this.inputClicked.bind(this)

        this.flowchartList = [];

        // Lägg dessa lyssnare i ett objekt eller i en egen funktion ?
        eventEmitter.on("clicked", this.objectClicked);
        eventEmitter.on("outputClicked", (id) => this.markedOutput = id );
        eventEmitter.on("inputClicked", this.inputClicked);
        eventEmitter.on("createRunnable", (id) => {   
            
            this.flowchartList = [];
            this.flowchartList.length = 0;           
            
            recursiveFlowchartCreation(id, this.objects, this.flowchartList);
            /*
            console.log("Finished list:")
            for(let n = 0; n < this.flowchartList.length; n++){
                console.log(this.flowchartList[n]);
            }*/
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
        if (this.markedObject.includes(obj)) {
            // Prevents further draging after doubleclick.
            obj.closeDragElement();
            this.modal.show(obj);
            window.onclick = function (event) {
                if (event.target == this.modal.element) {
                    this.modal.close();  
                }
            }.bind(this)
        } else {
            if (this.markedObject.length != 0 && e.shiftKey == false) {
                this.removeMarked();
            }
            this.markedObject[this.markedObject.length] = obj;
        }
    }

    inputClicked(id) {

        if (id == this.markedOutput) {
            return;
        }

        else if (this.markedOutput != ""){
            let currNode = this.objects.find((temp) => {
                return temp.id == id;
            })
    
            let prevNode = this.objects.find((temp) => {
                return temp.id == this.markedOutput;
            })

            let connector = {};
            if (!currNode.input.connections.includes(this.markedOutput)) {
                currNode.input.connections.push(this.markedOutput);
                prevNode.output.connections.push(currNode.id);

                connector = new Connector(currNode.id + prevNode.id, prevNode, currNode);
                prevNode.registerConnectorUpdater("", connector.updateConnections);
                currNode.registerConnectorUpdater("", connector.updateConnections);
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
            connector.updateConnections();
        } 
    }



    

    didAttach(parent) {
        const toolbox = new Toolbox();
        this.attach(toolbox)

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

        eventEmitter.on('load', () =>  {
            this.saveClass.loadFlow(this.objects, this)
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
        }
    }

    removeMarked() {
        for (let i = this.markedObject.length-1; i >= 0; i--){
            let css = document.getElementById(this.markedObject[i].id).style.cssText;
            css = css.split(" box-shadow")[0];
            document.getElementById(this.markedObject[i].id).style.cssText = css;
            //delete this.markedObject[i-1];
        }
        this.markedObject = [];
    }


    removeNode() { // 68
        if (this.markedObject.length != 0) {

            for (let j = this.markedObject.length-1; j >= 0; j--){
                this.objects.splice( this.objects.indexOf(this.markedObject[j]), 1 );
                for( let i = this.connectorList.length - 1 ; i >= 0 ; i-- ) {
                    if (this.connectorList[i].id.includes(this.markedObject[j].id) ) {
                        let connector = this.connectorList[i];
                        this.connectorList.splice(i, 1);
                        let connectorElement = document.getElementById(connector.id);
                        connectorElement.parentElement.removeChild(connectorElement);
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
            document.addEventListener('mousemove', (e) => { this.mouseX = e.clientX; this.mouseY = e.clientY});
            for(let i = 0; i < this.markedObject.length; i++){
                this.copyObject[i] = new FlowchartNode(uuidv1());
                this.copyObject[i].copyOther(this.markedObject[i]);
            }
        }
    }

    pasteNode() {
        if (this.copyObject.length != 0) {
            //Create new objects based on the copies and add them to the workspace
            for(let i = 0; i < this.copyObject.length; i++){
                let pasteObject = new FlowchartNode(uuidv1());
                if(i == 0){
                    pasteObject.copyOther(this.copyObject[i], this.mouseX, this.mouseY);
                }
                else {
                    pasteObject.copyOther(this.copyObject[i], this.mouseX+(this.copyObject[i].posX-this.copyObject[0].posX), this.mouseY+(this.copyObject[i].posY-this.copyObject[0].posY));
                }
                this.addBox(pasteObject);
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
                    this.removeNode()
                    e.preventDefault();
                    break;
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
        let element = document.getElementById("toolbox");
        let style = getComputedStyle(element);
        let visibility = style.getPropertyValue('visibility');
        if (visibility == 'hidden') {
            document.getElementById("toolbox").style.visibility = 'visible';
        }
        else {
            document.getElementById("toolbox").style.visibility = 'hidden';
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
