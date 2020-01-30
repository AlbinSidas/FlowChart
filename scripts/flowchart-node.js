import data from './test.js';
const uuidv1 = require('uuid/v1');
class FlowchartNode {
    constructor(id){
        //ui
        this.posX = 100;
        this.posY = 100;
        this.oldX = this.posX;
        this.oldY = this.posY;
        this.offsetX = 0;
        this.offsetY = 0;
        //flow
        this.id = id;
        this.functionDescription = "No function yet"
        this.input = ""
        this.output = ""
        this.element = document.createElement("div");
        this.element.classList.add("flowchart-square");
        this.elementDrag = this.elementDrag.bind(this);
        this.dragMouseDown = this.dragMouseDown.bind(this);
        this.closeDragElement = this.closeDragElement.bind(this);
        this.element.onmousedown = this.dragMouseDown;
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
        console.log(e.clientX)
        console.log(e.clientY)
        console.log(this.element.style.top)
        // calculate the new cursor position:
        //this.offsetX = this.oldX - e.clientX;
        //this.offsetY = this.oldY - e.clientY;
        //pos3 = e.clientX;
        //pos4 = e.clientY;
        //this.oldX = e.clientX;  
        //this.oldY = e.clientY;
        // set the element's new position:
        this.posY = e.clientY-this.offsetY;
        this.posX = e.clientX-this.offsetX;
        this.element.style.top = `${e.clientY-this.offsetY}px`// (this.element.offsetTop  - this.offsetY) + "px";
        this.element.style.left = `${e.clientX-this.offsetX}px`// (this.element.offsetLeft - this.offsetX) + "px";
    }

    closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }


    dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
               // console.log("apa dtagh modude down")
        // get the mouse cursor position at startup:
        this.offsetX = e.clientX - this.posX; //e.clientX;
        this.offsetY = e.clientY - this.posY ; //e.clientY;
        
        console.log(document);
        document.addEventListener('mouseup', (e) => {this.closeDragElement(e)})//this.closeDragElement);
        // call a function whenever the cursor moves:
        document.onmousemove = (e) => {this.elementDrag(e)};
        console.log(document.onmousemove)
     }


}





export default FlowchartNode;