
import SizeButton from './size-button.js'
import FlowchartNode from "./flowchart-node";
const uuidv1 = require('uuid/v1');
import Modal from './modal.js';
import {coordinated, externEventHandler, html, ViewState, domHandler} from 'Base/view.js';
import elementString from 'Views/container.html';
import eventEmitter from 'Singletons/event-emitter.js';
import Connector from "./connectors.js";



const Container = () => {
    let viewState = ViewState(html(elementString), window.innerWidth, 3000);

    let containerState = {
        objects       : [],
        markedObject  : null,
        markedOutput  : "",
        connectorList : [],
        objectClick   : {},
        copyObject    : {},
        mouseX        : 0,
        mouseY        : 0,
        sizeDelta     : 200,
    }

    const modal = Modal(); 
    const extEventHandler     = externEventHandler(viewState)
    const dom                 = domHandler(viewState)
    const coordinationHandler = coordinated(viewState)

    //delassing först, sen skicka det till container handler, istället för att paramatisers
    const handler             = containerHandler(containerState, viewState, dom, coordinationHandler)

    extEventHandler.setOnClick(handler.onClick)
    extEventHandler.setOnKeyDown(handler.onKeyPress)

    eventEmitter.on("clicked",       handler.containerClicked);
    eventEmitter.on("outputClicked", handler.markOutput);
    eventEmitter.on("inputClicked",  handler.inputClicked)

    coordinationHandler.setHeight(viewState.width)
    coordinationHandler.setWidth(viewState.height)

    return Object.assign(
        {},
        handler,
        coordinationHandler,
        dom,
        externEventHandler
    )
}

// Read only view state
const containerHandler = (containerState, viewState, dom, coordinationHandler) => ({
    
    removeMarked: () => {
        let css = document.getElementById(containerState.markedObject.id).style.cssText;
        css = css.split(" box-shadow")[0];
        document.getElementById(containerState.markedObject.id).style.cssText = css;
        containerState.markedObject = null;
    },

    containerClicked: (id, e) => {
        containerState.objectClick = e;
        let obj = containerState.objects.find((obj) => {
            return obj.id == id;
        });
        // If the click is on the marked object it's a doubleclick and will open the modal.
        if (obj == containerState.markedObject) {
            // Prevents further draging after doubleclick.
            obj.closeDragElement();
            containerState.modal.show(obj);
            window.onclick = function (event) {
                if (event.target == containerState.modal.element) {
                    containerState.modal.close();  
                }
            }
        } else {
            if (containerState.markedObject != null) {
                handler.removeMarked();
            }
            containerState.markedObject = obj;
        }
    },
    
    inputClicked: (id) => {

        if (id == containerState.markedOutput) {
            return;
        }

        else if (containerState.markedOutput != ""){
            let currNode = containerState.objects.find((temp) => {
                return temp.id == id;
            })
    
            let prevNode = containerState.objects.find((temp) => {
                return temp.id == containerState.markedOutput;
            })

            let connector = {};
            
            if (!currNode.input.connections.includes(containerState.markedOutput)) {
                currNode.input.connections.push(containerState.markedOutput);
                prevNode.output.connections.push(currNode.id);

                connector = new Connector(currNode.id + prevNode.id, prevNode, currNode);
                prevNode.registerConnectorUpdater("", connector.updateConnections);
                currNode.registerConnectorUpdater("", connector.updateConnections);
                connector.element.classList.add("connector");
                dom.attach(connector);
                containerState.connectorList.push(connector);
            } else {
                connector = containerState.connectorList.find((c) => {
                    return c.id == currNode.id + prevNode.id; 
                });
            }

            markedOutput = "";
            connector.updateConnections();
        } 
    },

    onClick: () => {
        if ((e.clientX != containerState.objectClick.clientX 
                || e.clientY != containerState.objectClick.clientY) 
                && containerState.markedObject != null)
        {
            handler.removeMarked();
        }
    },

    addBox: (box) => {
        containerState.objects.push(box);
        dom.attach(box);
        box.onScrolled(this.childScrolled);
    },

    increaseSize: () =>  {
        coordinationHandler.setHeight(viewState.height + containerState.sizeDelta)
    },

    decreaseSize: () =>  {
        if(window.innerHeight < viewState.height - containerState.sizeDelta){
            for(let i = 0; i < containerState.objects.length; i++) {
                const flowchartNode = objects[i];
                if(flowchartNode.getPosY() + flowchartNode.getHeight() > viewState.height - containerState.sizeDelta) {
                    return;
                }
            }
            coordinationHandler.setHeight(viewState.height - sizeDelta);
        }
    },

    increaseSizeHorizontal: () =>  {
        coordinationHandler.setWidth(viewState.width + containerState.sizeDelta);
    },

    decreaseSizeHorizontal: () =>  {
        if(window.innerWidth < viewState.width - containerState.sizeDelta) {
            for(let i = 0; i < containerState.objects.length; i++) {
                const flowchartNode = containerState.objects[i];
                if(flowchartNode.getPosX() + flowchartNode.getWidth() > viewState.width - containerState.sizeDelta) {
                    return;
                }
            }
            coordinationHandler.setWidth(viewState.width - containerState.sizeDelta);
        }
    },

    childScrolled: (posY, height) =>  {
        if((posY + height) >= viewState.height) {
            this.increaseSize();
        }
    },

    markOutput: (id) => {   
        containerState.markedOutput = id;
    },

    copy: () => {
      
        if (containerState.markedObject != null) {
            // Save a copy without a reference to the original object.
            document.addEventListener('mousemove', (e) => { containerState.mouseX = e.clientX; containerState.mouseY = e.clientY});
            copyObject = new FlowchartNode(uuidv1());
            copyObject.copyOther(containerState.markedObject, containerState.mouseX, containerState.mouseY);
        }
    },

    paste: () => {
        if (containerState.copyObject != null) {
            //Create a new object based on the copy and add it to the workspace
            let pasteObject = new FlowchartNode(uuidv1());
            pasteObject.copyOther(containerState.copyObject, containerState.mouseX, containerState.mouseY);
            this.addBox(pasteObject);
        }
    },

    remove: () => {
        if (containerState.markedObject != null) {
            objects.splice( objects.indexOf(containerState.markedObject), 1 );
            for( let i = containerState.connectorList.length - 1 ; i >= 0 ; i-- ) {
                if (containerState.connectorList[i].id.includes(containerState.markedObject.id) ) {
                    let connector = containerState.connectorList[i];
                    containerState.connectorList.splice(i, 1);
                    let connectorElement = document.getElementById(connector.id);
                    connectorElement.parentElement.removeChild(connectorElement);
                }
            }
            let nodeElement = document.getElementById(containerState.markedObject.id);
            nodeElement.parentElement.removeChild(nodeElement);
            containerState.markedObject = null;
        }
    }

    onKeyPress: () => {
        if(e.ctrlKey) {
            switch(e.keyCode) {
                case 67: // 67 = C Copy
                    this.copy()
                    break;

                case 86: // 86 = V Paste
                    this.paste()
                    break;

                case 68: // 68 = D Remove
                    e.preventDefault();
                    this.remove();
                    break;
            }
        }
    }

})


export default Container;
