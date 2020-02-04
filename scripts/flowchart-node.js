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
        this.setPosY = this.setPosY.bind(this);
        this.scrollChecker;
        this.closeDragElement = this.closeDragElement.bind(this);
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

        this.element.style.top  = `${nextY}px`// (this.element.offsetTop  - this.offsetY) + "px";
        this.element.style.left = `${nextX}px`// (this.element.offsetLeft - this.offsetX) + "px";,        
        this.posY = nextY;
        this.posX = nextX;
    }

    closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        clearInterval(this.scrollChecker)

    }

    moveScreenUp(){
        window.scrollBy(0,-1);
    }

    moveScreenDown(){
        this.element.getBoundingClientRect().bottom;
        window.scrollBy(0, 1);
        this.setPosY(this.posY + 1);
    }

    setPosY(y) {
        this.posY = y;
        this.element.style.top = `${this.posY}px`
    }

    dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
               // console.log("apa dtagh modude down")
        // get the mouse cursor position at startup:
        this.offsetX = e.clientX - this.posX; //e.clientX;
        this.offsetY = e.clientY - this.posY ; //e.clientY;
        this.scrollChecker = setInterval(() => {
            console.log("aaa")
            const offsetFromBottom = window.innerHeight - this.element.getBoundingClientRect().bottom
            if(offsetFromBottom <= 0){
                this.moveScreenDown();
            }
            
        }, 5);
        console.log(document);
        document.addEventListener('mouseup', (e) => {this.closeDragElement(e)})//this.closeDragElement);
        // call a function whenever the cursor moves:
        document.onmousemove = (e) => {this.elementDrag(e)};
        console.log(document.onmousemove)
     }


}





export default FlowchartNode;