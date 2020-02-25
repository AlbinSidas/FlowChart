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

        this.output = new NodeIO(this, "box-start");
        this.onScrolledCallbacks = [];
        this._connectorUpdaters = [];
        
        this.attach(this.output);

    
    }   

    onScrolled(callback) {
        this.onScrolledCallbacks.push(callback);
    }

    registerConnectorUpdater(id, func) {
        this._connectorUpdaters.push(func)
    }

    unregisterConnectorUpdater(id) {

    }


    onClick(e) {
        eventEmitter.emit("clicked", this.id, e);
    }

}

export default StartNode;