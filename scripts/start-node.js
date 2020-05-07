import View from 'Base/view.js';
import NodeIO from './nodeIO.js';
import style from 'Styles/style.css';
import eventEmitter from 'Singletons/event-emitter.js';


class StartNode extends View {

    constructor(id){
        super();
        this.setHtml('<div>Start</div>');

        this.onClick = this.onClick.bind(this);
        
        this.posX = 880;
        this.posY = 30;

        this.element.classList.add("startnode");
        this.element.setAttribute("style", 'margin-top:'+this.posY+'px; margin-left:'+this.posX+'px;');
        
        this.id = id;
        this.element.id = id;

        this.inputValue = "hej";
        this.functionDescription = "STARTNODE FTW"

        this.output = new NodeIO(this, "box-start");
        
        this.onScrolledCallbacks = [];
        this._connectorUpdaters = {};
        
        this.attach(this.output);
        this.element.onclick = this.onClick;
    }   


    onScrolled(callback) {
        this.onScrolledCallbacks.push(callback);
    }

    registerConnectorUpdater(id, func) {
        this._connectorUpdaters[id] = func;
    }

    hasConnector(){
        if(Object.keys(this._connectorUpdaters).length != 0){
            return true;
        }
        return false;
    }

    removeConnectorUpdater(id) {
        delete this._connectorUpdaters[id];
    }
    
    closeDragElement(e) {
        document.onmouseup   = null;
        document.onmousemove = null;
        document.onwheel     = null;
    }

    onClick(e) {
        eventEmitter.emit("createRunnable", this.id, e);
    }

}

export default StartNode;