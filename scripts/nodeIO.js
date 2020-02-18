import View from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js';


class NodeIO extends View {
    constructor(parent, inputOutput, eventEmitter) {
        super('<div></div>')

        this.type = inputOutput;
        this.parent = parent;
        this.eventEmitter = eventEmitter;
        this.onClick = this.onClick.bind(this);
        this.id = parent.id;
        this.element = document.createElement("div");
        switch (inputOutput) {
            case 'box-input':
                this.element.classList.add(style.boxInput);
                break
            case 'box-output':
                this.element.classList.add(style.boxOutput);
                break
            default:
                break;
        }
        this.element.setAttribute("id", parent.id+inputOutput);
        this.connections = [];
    
        if (this.type == "box-output") {
            eventEmitter.emit("outputClicked", this.id); 
        }
        else if (this.type == "box-input") {
            eventEmitter.emit("inputClicked", this.id);
        }
    }
}

export default NodeIO;
