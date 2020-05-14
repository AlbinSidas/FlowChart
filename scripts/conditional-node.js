import FlowchartNode from './flowchart-node';
import style from 'Styles/style.css';
import NodeIO from './nodeIO.js';
import NodeMetaInfo from 'Model/node-meta-info.js';
import { InlineView } from './base/view.js';
import eventEmitter from 'Singletons/event-emitter.js';
import IfConnector from './if-connector.js';
import ElseConnector from './else-connector.js';
const uuidv1 = require('uuid/v1');

class ConditionalNode extends FlowchartNode {
    constructor(id, functionDefinitionInstance = null) {
        super(id, functionDefinitionInstance);
        this.setHtml('<div></div>');

        // Binding
        this.onDestElseClicked   = this.onDestElseClicked.bind(this);
        this.onDestIfClicked     = this.onDestIfClicked.bind(this);
        this.onOutputElseClicked = this.onOutputElseClicked.bind(this);
        this.onOutputIfClicked   = this.onOutputIfClicked.bind(this);

        //ui
        this.height = 150;
        //flow
        this.id = id;
        this.output = null;
        this.outputIf = new NodeIO(
            this,
            'box-outputIf',
            this.onOutputIfClicked,
        );
        this.outputElse = new NodeIO(
            this,
            'box-outputElse',
            this.onOutputElseClicked,
        );
        this.functionNameView = InlineView(
            `<p id='${this.id}_function'>${this.id}</p>`,
        );

        this.element.classList.add(style.conditionalnode);
        this.element.id = id;
    }

    // ==================== Create same connections ====================
    getOutputNodeIOs() {
        return [this.outputIf, this.outputElse];
    }

    // ======== COPY ========

    copyConnections(other) {
        this.outputIf.connections = other.outputIf.connections;
        this.outputElse.connections = other.outputElse.connections;
    }

    clone() {
        return new ConditionalNode(uuidv1());
    }

    // ======== END COPY =======

    attachIO() {
        this.attach(this.input);
        this.attach(this.outputIf);
        this.attach(this.outputElse);
    }

    didAttach(parent) {
        this.attach(this.functionNameView);
        this.attachIO();
        this.element.onclick = this.onClick;
        this.element.onmousedown = this.mouseDown;
        this.onScrolledCallbacks = [];
    }

    getMetaType() {
        return 'conditional_node';
    }

    getMetaConnections() {
        return [
            this.input.connections,
            null,
            this.outputIf.connections,
            this.outputElse.connections,
            null,
        ];
    }

    onOutputElseClicked(myId) {
        // väntar jag på att en annan ska tryckas
        // jag blev tryckt innan nästa
        eventEmitter.emit('prevClicked', this.onDestElseClicked, this.id);
    }

    onOutputIfClicked(myId) {
        eventEmitter.emit('prevClicked', this.onDestIfClicked, this.id);
    }

    onDestElseClicked(currNode) {
        currNode.input.connections.push(this.outputElse.id);
        this.outputElse.connections.push(currNode.id);
        const connector = new ElseConnector(
            currNode.id + this.id,
            this,
            currNode,
            null,
        );
        this.registerConnectorUpdater(
            connector.id,
            connector.updateConnections,
        );
        currNode.registerConnectorUpdater(
            connector.id,
            connector.updateConnections,
        );
        connector.element.classList.add('connector');
        return connector;
    }

    onDestIfClicked(currNode) {
        currNode.input.connections.push(this.outputIf.id);
        this.outputIf.connections.push(currNode.id);
        const connector = new IfConnector(
            currNode.id + this.id,
            this,
            currNode,
            null,
        );
        this.registerConnectorUpdater(
            connector.id,
            connector.updateConnections,
        );
        currNode.registerConnectorUpdater(
            connector.id,
            connector.updateConnections,
        );
        connector.element.classList.add('connector');
        return connector;
    }

    reconnect(connectorsHandler, metaObject) {
        metaObject.outputIfConnectionsList.forEach((output) => {
            this.onOutputIfClicked(this.id);
            connectorsHandler(output);
        });

        metaObject.outputElseConnectionsList.forEach((output) => {
            this.onOutputElseClicked(this.id);
            connectorsHandler(output);
        });
    }

    static CreateExternal(object, inputIds, outputIds) {
        const node = new ConditionalNode(
            object.id,
            object.functionDefinitionInstance,
        );
        node.fillNode(object);
        return node;
    }
}

export default ConditionalNode;
