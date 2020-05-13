import data from './test.js';
import View from 'Base/view.js';
import style from 'Styles/style.css';
import eventEmitter from 'Singletons/event-emitter.js';
import NodeIO from './nodeIO.js';
import NodeMetaInfo from 'Model/node-meta-info.js';
import { InlineView } from './base/view.js';
import Connector from './connectors.js';

class Node extends View {
    constructor(id, funcdef) {
        //functions
        super();

        this.getMetaInfo = this.getMetaInfo.bind(this);
        this.attachIO = this.attachIO.bind(this);
        this.onOutputClicked = this.onOutputClicked.bind(this);
        this.onDestClicked = this.onDestClicked.bind(this);
        this.reconnect = this.reconnect.bind(this);
        this.getMetaType = this.getMetaType.bind(this);
        this.onInputClicked = this.onInputClicked.bind(this);
        this.getMetaConnections = this.getMetaConnections.bind(this);

        //ui
        this.posX = window.scrollX + 100;
        this.posY = window.scrollY + 100;
        this.height = 250;
        this.offsetX = 0;
        this.offsetY = 0;
        this.idRef = '';
        this._connectorUpdaters = {};

        //flow
        this.id = id;
        this._name = '';
        this.functionDescription = 'No function yet';
        this.functionVariables = [];
        this.funcDefId = null;

        this.input = new NodeIO(this, 'box-input', this.onInputClicked);
        this.output = new NodeIO(this, 'box-output', this.onOutputClicked);
        this.functionDefinitionInstance = funcdef;
    }

    registerConnectorUpdater(id, func) {
        this._connectorUpdaters[id] = func;
    }

    removeConnectorUpdater(id) {
        delete this._connectorUpdaters[id];
    }

    didAttach(parent) {
        this.attachIO();
    }

    attachIO() {
        this.attach(this.input);
        this.attach(this.output);
    }

    reconnect(connectorsHandler, metaObject) {
        metaObject.outputConnectionList.forEach((output) => {
            this.onOutputClicked(this.id);
            connectorsHandler(output);
        });
    }

    onInputClicked(id) {
        eventEmitter.emit('inputClicked', id);
    }

    onOutputClicked(markedOutputId) {
        //if else vem som är previous , jag väntar på nästa click
        eventEmitter.emit('prevClicked', this.onDestClicked, this.id);
    }

    onDestClicked(destNode) {
        destNode.input.connections.push(this.output.id);
        this.output.connections.push(destNode.id);
        const connector = new Connector(
            destNode.id + this.id,
            this,
            destNode,
            null,
        );
        this.registerConnectorUpdater(
            connector.id,
            connector.updateConnections,
        );
        destNode.registerConnectorUpdater(
            connector.id,
            connector.updateConnections,
        );
        connector.element.classList.add('connector');
        return connector;
    }

    /*

    copyOther(other, rid = other.id, mposX = other.posX, mposY = other.posY, cRef = other.output.connections) {
        this.posX = mposX + event.view.scrollX -50;
        this.posY = mposY + event.view.scrollY -50;
        this.offsetX = other.offsetX;
        this.offsetY = other.offsetY;
        this.height = other.height;
        //flow
        this.idRef = rid;
        this._name = other.getName();
        this.functionDescription = other.functionDescription;
        this.output.connections = cRef;
        this.functionDefinitionInstance = other.functionDefinitionInstance;
        if(this.functionDefinitionInstance) {
            other.functionDefinitionInstance.functionVariables.forEach((element, i) => {
                this.functionDefinitionInstance.functionVariables[i] = other.functionDefinitionInstance.functionVariables[i];
            });
        }
            
    }
    */

    getName() {
        return this._name;
    }

    getInValue() {
        for (let i = 0; i < this.functionVariables.length; i++) {
            if (this.functionVariables[i].type == 'input') {
                return this.functionVariables[i].value;
            }
        }
        return 'no input found';
    }
    getOutValue() {
        for (let i = 0; i < this.functionVariables.length; i++) {
            if (this.functionVariables[i].type == 'output') {
                return this.functionVariables[i].value;
            }
        }
        return 'no output found';
    }

    setName(name) {
        this._name = name;
    }

    unregisterConnectorUpdater(id) {}

    render() {
        this.element.setAttribute(
            'style',
            `position:absolut; left: ${this.posX}px; top:${this.posY}px; height:${this.height}px`,
        );
        return this.element;
    }

    print() {
        console.log(data.apa);
    }

    getMetaType() {
        return 'UNSPECIFIED';
    }

    getMetaConnections() {
        return [this.input.connections, this.output.connections, null, null];
    }

    getMetaInfo() {
        const connections = this.getMetaConnections();
        return new NodeMetaInfo(
            this.getMetaType(),
            this.getName(),
            this.functionDescription,
            this.id,
            this.posX,
            this.posY,
            connections[0], //this.input.connections,
            connections[1],
            this.functionDefinitionInstance,
            connections[2],
            connections[3],
            connections[4],
        );
    }
}

export default Node;
