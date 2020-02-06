import data from './test.js';
const uuidv1 = require('uuid/v1');

class FlowchartNode {
    constructor(id, eventEmitter){
        //console.log("EventEmit:", eventEmitter.emit("clicked", id))
        //ui
        this.posX = 100;
        this.posY = 100;
        this.oldPosY = this.posY;
        this.oldPosX = this.posX;
        this.oldX = this.posX;
        this.oldY = this.posY;
        this.offsetX = 0;
        this.offsetY = 0;
        this.height = 100;
        //flow
        this.id = id;
        this.functionDescription = "No function yet"
        this.input = ""
        this.output = ""
        this.eventEmitter = eventEmitter;
        this.element = document.createElement("div");
        this.element.classList.add("flowchart-square");
        this.element.id = id;
        this.onClick = this.onClick.bind(this);
        this.elementDrag = this.elementDrag.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.closeDragElement = this.closeDragElement.bind(this);
        this.element.onclick = this.onClick;
        this.element.onmousedown = this.mouseDown;
        this.setPosY = this.setPosY.bind(this);
        this.scrollChecker;
        this.closeDragElement = this.closeDragElement.bind(this);
        this.onScrolledCallbacks = []
        this.lastScrollPosition = 0;

        this.bScroll = 0
    }

    render() {
        this.element.setAttribute('style', `position:absolut; left: ${this.posX}px; top:${this.posY}px; height:${this.height}px`)
        return this.element;
    }   

    print() {
        console.log(data.apa);
        //console.log(uuidv1());
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
        let nextY = e.clientY-this.offsetY//(e.clientY - this.lastScrollPosition) - this.offsetY
        nextX = nextX < 0 ? 0 : nextX 
        nextY = nextY < 0 ? 0 : nextY
        this.element.style.top  = `${nextY}px`// (this.element.offsetTop  - this.offsetY) + "px";
        this.element.style.left = `${nextX}px`// (this.element.offsetLeft - this.offsetX) + "px";,        
        this.posY = nextY;
        this.posX = nextX;
        //this.lastScrollPosition = window.scrollY
    }

    closeDragElement(e) {
        /* stop moving when mouse button is released:*/
        document.onmouseup   = null;
        document.onmousemove = null;
        document.onwheel     = null;
        //console.log("HALLÅ")
         //this.element.setAttribute('style', `position:absolute; left: ${this.posX}px; top:${this.posY}px; height:${this.height}px`)
        this.lastScrollPosition = 0;
        clearInterval(this.scrollChecker)
        //console.log("ASDASD",this.scrollChecker)
        
    }

    moveScreenUp(){
        this.element.getBoundingClientRect().top;
        if(this.posY <= 0) { 
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        window.scrollBy(0, -1);
        this.setPosY(this.posY - 1);
        //this.offsetY += 1; // lowering ofset when scrolling
    }

    moveScreenDown(){

        window.scrollBy(0, 1);
        //this.setPosY(this.posY + 1);
        //this.offsetY -= 1; // lowering ofset when scrolling
        this.onScrolledCallbacks.forEach(callback => {
            callback(this.posY,this.height)
        });

    }

    setPosY(y) {
        this.posY = y;
       // this.element.style.top = `${this.posY}px`
    }

    onScrolled(callback) {
        this.onScrolledCallbacks.push(callback);
    }


    attachToWheel(e) {
        if(window.scrollY + window.innerHeight >= document.querySelector('#workspace-root').clientHeight){//window.scrollHeight - window.scrollTop === window.clientHeight) {
            return;
        }
        console.log("scroll", window.scrollY)
        console.log("MU", this.lastScrollPosition)
        console.log("MMOUISTE", e.clientY)
        //this.setPosY(this.posY + (window.scrollY - this.lastScrollPosition))//(window.scrollY - this.lastScrollPosition))
        //this.lastScrollPosition = window.scrollY; 
        console.log(document.querySelector('#workspace-root').clientHeight)
        this.setPosY(e.clientY + window.scrollY)
        //this.offsetY -= e.deltaY;
    }

    mouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // console.log("apa dtagh modude down")
        // get the mouse cursor position at startup:
        this.lastScrollPosition = window.scrollY;
        this.offsetX = e.clientX - this.posX; //e.clientX;
        this.offsetY = e.clientY - this.posY //e.clientY;
        //this.element.setAttribute('style', `left: ${this.posX}px; top:${this.posY}px; height:${this.height}px`)
        this.scrollChecker = setInterval(() => {
            //console.log("aaa")
            const offsetFromBottom = window.innerHeight - (this.posY + this.height)//this.element.getBoundingClientRect().bottom
            if(offsetFromBottom <= 0){
                
                this.moveScreenDown();
            }
            else if(offsetFromBottom >= window.innerHeight - this.height) {
        
                //this.moveScreenUp()
            }
            
        }, 5);
        console.log(document);
        document.addEventListener('mouseup', (e) => {this.closeDragElement(e)})//this.closeDragElement);
        // call a function whenever the cursor moves:
        document.onmousemove = (e) => { this.elementDrag(e)   };
        document.onwheel     = (e) => { }//this.attachToWheel(e) };
        //console.log(document.onmousemove)

        let x = (0).toString();
        let y = (0).toString();
        let shadow = ` box-shadow: ${x}px ${y}px 40px 20px #0ff;`;
        let elementStyle = document.getElementById(this.id).style.cssText;
        document.getElementById(this.id).setAttribute("style", elementStyle + shadow);
     }

    onClick(e) { 
        //this.eventEmitter.emit("clicked", this.id, e);
    }
}


export default FlowchartNode;