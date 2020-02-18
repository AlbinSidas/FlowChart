import data from './test.js';
import View from 'Base/view.js';
import style from 'Styles/style.css';
import eventEmitter from 'Singletons/event-emitter.js';
import NodeIO from './nodeIO.js';

class FlowchartNode extends View {
    constructor(id){
        super('<div></div>')
    
        //functions
        this.onClick          = this.onClick.bind(this);
        this.elementDrag      = this.elementDrag.bind(this);
        this.mouseDown        = this.mouseDown.bind(this);
        this.setPosY          = this.setPosY.bind(this);
        this.closeDragElement = this.closeDragElement.bind(this);

        //ui
        this.posX    = 100;
        this.posY    = 100;
        this.height  = 100;
        this.oldPosY = this.posY;
        this.oldPosX = this.posX;
        this.oldX    = this.posX;
        this.oldY    = this.posY;
        this.offsetX = 0;
        this.offsetY = 0;

        //flow
        this.id = id;
        this.functionDescription = "No function yet"

        this.input = new NodeIO(this, "box-input");
        this.output = new NodeIO(this, "box-output"); 
        
        this.eventEmitter = eventEmitter;

        //this.element = document.createElement("div");

        this.element.classList.add(style.flowchart_square);
        this.element.id = id;
    }

    didAttach(parent) {
        this.attach(this.input);
        this.attach(this.output);
        this.element.onclick     = this.onClick;
        this.element.onmousedown = this.mouseDown;
        this.onScrolledCallbacks = []
    }

    copyOther(other, mposX = other.posX, mposY = other.posY) {
        this.posX = mposX + event.view.scrollX -50;
        this.posY = mposY + event.view.scrollY -50;
        this.oldX = this.posX;
        this.oldY = this.posY;
        this.offsetX = other.offsetX;
        this.offsetY = other.offsetY;
        this.height = other.height;
        //flow
        //this.id = id;
        this.functionDescription = other.functionDescription;
        this.input = other.input;
        this.output = other.output;
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
        const max_height_relative_to_window      = window.innerHeight - this.height
        const box_position_relative_to_container = max_height_relative_to_window + window.scrollY
        const box_position_relative_to_window    = nextY - window.scrollY
        nextY = box_position_relative_to_window >= max_height_relative_to_window ? box_position_relative_to_container : nextY
        this.element.style.top  = `${this.posY}px`
        this.element.style.left = `${nextX}px`
        this.posX = nextX;
        this.posY = nextY;
    }

    closeDragElement(e) {
        document.onmouseup   = null;
        document.onmousemove = null;
        document.onwheel     = null;
    }

    setPosY(y) {
        this.posY = y;
    }

    onScrolled(callback) {
        this.onScrolledCallbacks.push(callback);
    }


    mouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        this.lastScrollPosition = window.scrollY;
        this.offsetX = e.clientX - this.posX;
        this.offsetY = e.clientY - this.posY;

        document.addEventListener('mouseup', (e) => {this.closeDragElement(e)})
        document.onmousemove = (e) => { this.elementDrag(e)   };

        let x = 0
        let y = 0
        let shadow = ` box-shadow: ${x}px ${y}px 40px 20px #0ff;`;
        let elementStyle = document.getElementById(this.id).style.cssText;
        document.getElementById(this.id).setAttribute("style", elementStyle + shadow);
     }

    onClick(e) {
        eventEmitter.emit("clicked", this.id, e);
    }
    
}
export default FlowchartNode;
