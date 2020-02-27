import View from 'Base/view.js';
import NodeIO from './nodeIO.js';
import style from 'Styles/style.css';
import eventEmitter from 'Singletons/event-emitter.js';


class StartNode extends View {

    constructor(id){
        super();
        this.setHtml('<div>Start :]</div>');

        this.onClick = this.onClick.bind(this);
        
        this.posX = 910;
        this.posY = 30;

        this.element.classList.add("startnode");
        this.element.setAttribute("style", 'margin-top:'+this.posY+'px; margin-left:'+this.posX+'px;');
        
        this.id = id;
        this.element.id = id;

        this.inputValue = "hej";
        this.functionDescription = "STARTNODE FTW"

        this.output = new NodeIO(this, "box-start");
        //this.input  = new NodeIO(this, "box-dummy");
        

        this.onScrolledCallbacks = [];
        this._connectorUpdaters = [];
        
        this.attach(this.output);
        this.element.onclick = this.onClick;
    }   

    // createRunable(){
    //     //Should the commandrows after each other depending on the connections in the flowchart.
    //     //gör någotmed data
    //     for (output in this.output.connections) {
    //         console.log(output)
            
    //         output.run();
    //     } 
    // }
    

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
        eventEmitter.emit("createRunnable", this.id, e);
        console.log("EVENTEMITTER RAN ONCE");
    }

}

export default StartNode;