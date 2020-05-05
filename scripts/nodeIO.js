import View from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js';
import style from 'Styles/style.css';

class NodeIO extends View {
    constructor(parent, inputOutput, handler) {
        super()
        this.setHtml('<div></div>')
        this.type = inputOutput;
        this.parent = parent;
        this.onClick = this.onClick.bind(this);
        this.id = parent.id;
        this._value = "";
        this.handler = handler;
        switch (inputOutput) {
            case 'box-input':
                this.element.classList.add(style.boxInput);
                break;
            case 'box-ifinput':
                this.element.classList.add(style.boxIfInput);
                break;
            case 'box-output':
                this.element.classList.add(style.boxOutput);
                break;
            case 'box-start':
                this.element.classList.add(style.boxStart);
                break;
            case 'box-dummy':
                this.element.classList.add(style.boxStartDummy);
                break;
            case 'box-outputIf':
                this.element.classList.add(style.boxOutputIf);
                break;
            case 'box-outputElse':
                this.element.classList.add(style.boxOutputElse);
                break;
            case 'box-parallel':
                this.element.classList.add(style.boxOutputParallel);
                break;
            default:
                break;
        }

        this.element.setAttribute("id", parent.id+inputOutput);
        this.connections = [];
        this.element.onclick = this.onClick;
    }

    setValue(value) {
        this._value = value;
    }

    getValue() {
        return this._value;
    }

    onClick(e) {
        this.handler(this.id);
        // if (this.type == "box-output") {
        //     eventEmitter.emit("outputClicked", this.id);
        // }
        // else if (this.type == "box-input") {
        //     eventEmitter.emit("inputClicked", this.id);
        // }
        // else if (this.type == "box-start") {
        //     eventEmitter.emit("outputClicked", this.id);
        // }
        // else if (this.type == "box-outputIf") {
        //     eventEmitter.emit("ifClicked", this.id);
        // }
        // else if (this.type == "box-outputElse") {
        //     eventEmitter.emit("elseClicked", this.id);
        // }
        // else if (this.type == "box-parallel") {
        //     eventEmitter.emit("parallelClicked", this.id);
        // }
        // else if (this.type == "box-dummy") {
        //     return;
        // }
    }

}

export default NodeIO;
