import data from './test.js';
import View from 'Base/view.js';
import style from 'Styles/style.css';
import eventEmitter from 'Singletons/event-emitter.js';
import NodeIO from './nodeIO.js';
import NodeMetaInfo from 'Model/node-meta-info.js';
import { InlineView } from './base/view.js';
import Connector from './connectors.js';
import FlowchartNode from './flowchart-node';
import Node from './node';

class SNode extends Node {
    constructor(id) {
        super(id, null);
        this.setHtml('<div>Start</div>');

        this.onClick = this.onClick.bind(this);
        this.posX = 880;
        this.posY = 30;
        this.height = 39;
        this.element.classList.add('startnode');
        this.element.setAttribute(
            'style',
            'margin-top:' + this.posY + 'px; margin-left:' + this.posX + 'px;',
        );

        this.id = id;
        this.element.id = id;

        this.inputValue = 'hej';
        this.functionDescription = 'STARTNODE FTW';

        this.output = new NodeIO(this, 'box-start', this.onOutputClicked);

        this.onScrolledCallbacks = [];
        this._connectorUpdaters = {};

        this.attach(this.output);
        this.element.onclick = this.onClick;
    }

    attachIO() {
        this.attach(this.output);
    }

    getMetaType() {
        return 'start_node';
    }

    getMetaConnections() {
        return [null, this.output.connections, null, null, null];
    }

    static CreateExternal(object, inputIds, outputIds) {
        const node = new SNode(object.id, null);
        node.fillNode(object);
        return node;
    }

    onScrolled(callback) {
        this.onScrolledCallbacks.push(callback);
    }

    registerConnectorUpdater(id, func) {
        this._connectorUpdaters[id] = func;
    }

    hasConnector() {
        if (Object.keys(this._connectorUpdaters).length != 0) {
            return true;
        }
        return false;
    }

    removeConnectorUpdater(id) {
        delete this._connectorUpdaters[id];
    }

    closeDragElement(e) {
        document.onmouseup = null;
        document.onmousemove = null;
        document.onwheel = null;
    }

    onClick(e) {
        eventEmitter.emit('createRunnable', this.id, e);
    }
}

export default SNode;
