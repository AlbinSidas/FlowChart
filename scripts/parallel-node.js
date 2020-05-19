import FlowchartNode from './flowchart-node';
import style from 'Styles/style.css';
import NodeIO from './nodeIO';
import NodeMetaInfo from 'Model/node-meta-info.js';
import { InlineView } from './base/view.js';
import eventEmitter from 'Singletons/event-emitter.js';
import ParaConnector from './para-connector.js';
const uuidv1 = require('uuid/v1');

class ParallelNode extends FlowchartNode {
    constructor(id, functionDefinitionInstance = null) {
        super(id, functionDefinitionInstance);
        this.setHtml('<div></div>');

        //Functions
        this.onClick = this.onClick.bind(this);
        this.elementDrag = this.elementDrag.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.closeDragElement = this.closeDragElement.bind(this);
        this.getMetaInfo = this.getMetaInfo.bind(this);
        this.onOutputClicked = this.onOutputClicked.bind(this);
        this.onDestClicked = this.onDestClicked.bind(this);
        //Ui
        this.height = 250;
        //Flow
        this.id = id;
        this.output = null;
        this.outputParallel = new NodeIO(
            this,
            'box-parallel',
            this.onOutputClicked,
        );
        this.functionNameView = InlineView(
            `<p id='${this.id}_function'>Parallell node</p>`,
        );

        this.element.classList.add(style.parallelnode);
        this.element.id = id;
    }

    getOutputNodeIOs() {
        return [this.outputParallel];
    }

    // ======== COPY =========

    copyConnections(other) {
        this.outputParallel.connections = other.outputParallel.connections;
    }

    clone() {
        return new ParallelNode(uuidv1());
    }

    // ======== END COPY =======

    attachIO() {
        this.attach(this.input);
        this.attach(this.outputParallel);
    }

    didAttach(parent) {
        this.attach(this.functionNameView);
        this.attachIO();
        this.element.onclick = this.onClick;
        this.element.onmousedown = this.mouseDown;
        this.onScrolledCallbacks = [];
    }

    getMetaType() {
        return 'parallel_node';
    }

    getMetaConnections() {
        return [
            this.input.connections,
            null,
            null,
            null,
            this.outputParallel.connections,
        ];
    }

    onOutputClicked(markedOutputId) {
        eventEmitter.emit('prevClicked', this.onDestClicked, this.id);
    }

    onDestClicked(currNode) {
        currNode.input.connections.push(this.outputParallel.id);
        this.outputParallel.connections.push(currNode.id);
        const connector = new ParaConnector(
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
        metaObject.outputParallelConnectionsList.forEach((output) => {
            this.onOutputClicked(this.id);
            connectorsHandler(output);
        });
    }

    static CreateExternal(object, inputIds, outputIds) {
        const node = new ParallelNode(
            object.id,
            object.functionDefinitionInstance,
        );
        node.fillNode(object);
        return node;
    }
}

export default ParallelNode;
