import View from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js';
import Connector from './connectors';

class IfConnector extends Connector {
    constructor(id, prevNode, currNode, nodeType) {
        super();
        this.id = id;
        this.element.id = id;
        this.currNode = currNode;
        this.prevNode = prevNode;

        this.nodeType = nodeType;
    }

    updateConnections() {
        // Aligns the connector with the input/output parts of a node
        let outX = this.prevNode.posX;
        let outY = this.prevNode.posY + 75;
        let inX = this.currNode.posX + 150;
        let inY = this.currNode.posY - 15;

        // Line contains the length, position x and y, and the angle of the connector.
        let line = this._calculateLine(outX, outY, inX, inY);
        this.element.setAttribute(
            'style',
            `width:${line[0]}px; left:${line[1]}px; top:${line[2]}px; transform:rotate(${line[3]}deg); `,
        );
        if (this.glowing) {
            this.glow();
        }
    }
}

export default IfConnector;
