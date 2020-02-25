import View from 'Base/view.js';
import NodeIO from './nodeIO.js';
import style from 'Styles/style.css';
import eventEmitter from 'Singletons/event-emitter.js';


class StartNode extends View {

    constructor(id){
        super('<div></div>')

        this.onClick = this.onClick.bind(this);
        
        this.posX = 1150;
        this.posY = 30;

        this.element.classList.add(style.startnode);
        this.element.setAttribute("style", 'margin-top:'+this.posY+'px; margin-left:'+this.posX+'px;');
        
        this.id = id;
        this.element.id = id;

        this.inputValue = "hej";
        this.functionDescription = "STARTNODE FTW"

        this.output = new NodeIO(this, "box-start");
        this.input  = new NodeIO(this, "box-dummy");
        

        this.onScrolledCallbacks = [];
        this._connectorUpdaters = [];
        
        this.attach(this.output);
        this.element.onclick = this.onClick;

    
    }   

    

    onScrolled(callback) {
        this.onScrolledCallbacks.push(callback);
    }

    registerConnectorUpdater(id, func) {
        this._connectorUpdaters.push(func)
    }

    unregisterConnectorUpdater(id) {

    }
    closeDragElement(e) {
        document.onmouseup   = null;
        document.onmousemove = null;
        document.onwheel     = null;
    }

    onClick(e) {
        console.log("Click before emit");
        eventEmitter.emit("clicked", this.id, e);
        console.log("Click and emit works");
    }

}

export default StartNode;