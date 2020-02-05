import data from './test.js';
const uuidv1 = require('uuid/v1');

class FlowchartNode {
    constructor(id, eventEmitter){
        console.log("EventEmit:", eventEmitter.emit("clicked", id))
        //ui
        this.posX = 100;
        this.posY = 100;
        this.oldX = this.posX;
        this.oldY = this.posY;
        this.offsetX = 0;
        this.offsetY = 0;

        console.log(id);
        
        //flow
        this.onClick = this.onClick.bind(this);
        this.id = id;
        this.functionDescription = "No function yet"
        this.input = new NodeIO(this, "box-input", eventEmitter);
        //Multiple outputs should be able to be created
        this.output = new NodeIO(this, "box-output", eventEmitter); 
        
        this.eventEmitter = eventEmitter;
        this.element = document.createElement("div");
        this.element.classList.add("flowchart-square");
        
        this.element.appendChild(this.input.element);
        this.element.appendChild(this.output.element);
    
        
        this.element.id = id;
        this.elementDrag = this.elementDrag.bind(this);
        this.dragMouseDown = this.dragMouseDown.bind(this);
        this.closeDragElement = this.closeDragElement.bind(this);

        this.element.onmousedown = this.onClick;
    }

    render() {
        this.element.setAttribute('style', `left: ${this.posX}px; top:${this.posY}px;`)
        return this.element;
    }   

    print() {
        console.log(data.apa);
        console.log(uuidv1());
     }

    elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        //console.log(this.element.style.top)
        // calculate the new cursor position:
        //this.offsetX = this.oldX - e.clientX;
        //this.offsetY = this.oldY - e.clientY;
        //pos3 = e.clientX;
        //pos4 = e.clientY;
        //this.oldX = e.clientX;  
        //this.oldY = e.clientY;
        // set the element's new position:
        let nextX = e.clientX-this.offsetX
        let nextY = e.clientY-this.offsetY
        nextX  = nextX < 0 ? 0 : nextX 
        //console.log(nextX)
        //console.log(nextY)
        this.element.style.top  = `${nextY}px`// (this.element.offsetTop  - this.offsetY) + "px";
        this.element.style.left = `${nextX}px`// (this.element.offsetLeft - this.offsetX) + "px";
        
        this.posY = nextY;
        this.posX = nextX;
    }

    closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }


    // Denna är endast mousedown. När vi fångar denna bör den läggas  till i marked
    dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
               // console.log("apa dtagh modude down")
        // get the mouse cursor position at startup:
        this.offsetX = e.clientX - this.posX; //e.clientX;
        this.offsetY = e.clientY - this.posY ; //e.clientY;

        //console.log(document);
        document.addEventListener('mouseup', (e) => {this.closeDragElement(e)})//this.closeDragElement);
        // call a function whenever the cursor moves:
        document.onmousemove = (e) => {this.elementDrag(e)};
        //console.log(document.onmousemove)
     }

    onClick(e) { 
        this.dragMouseDown(e);
        this.eventEmitter.emit("clicked", this.id);
    }

   
    


}

// class NodeContent {
//     constructor(){

//     }
// }

//class for the input and output nodes
class NodeIO {
    constructor(parent, inputOutput, eventEmitter) {

        this.parent = parent;
        this.eventEmitter = eventEmitter;
        this.onClick = this.onClick.bind(this);
        this.id = parent.id+inputOutput;
        this.element = document.createElement("div");
        this.element.classList.add(inputOutput);
        // Temporary id????
        this.element.setAttribute("id", parent.id);
        this.connections = [];
        this.element.onclick = this.onClick;
        //.appendChild(this.element)


        //OnClick NodeIO -> 
        /*En funktion i outputen/flowchartnoden som tar klickade (this) flowchart id/objektet + efterklickade inputen/flowchartnoden 
        och sparar det i outputens connections lista. Informationen skickas vidare till den inputklickade nodens NodeIO input connections
        lista*/
    }
    
    onClick(e) { 
        alert("AHAHHHEOiAHEUGO");
        this.parent.closeDragElement();
        this.testFunc(e); 
        this.eventEmitter.emit("outputClicked", this.id);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
        //this.eventEmitter.emit("inputClicked", this.id);
    }

    testFunc(e){
        console.log(this.id);
        console.log("^^^^^^^");
    }
}

export default FlowchartNode;