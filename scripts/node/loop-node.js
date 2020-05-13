import FlowchartNode from '../flowchart-node';

class LoopNode extends FlowchartNode {
    getMetaInfo() {
        return;
        new NodeMetaInfo(
            'loop',
            this.functionDescription,
            this.posX,
            this.posY,
            this.id,
            this.input.connections,
            this.output.connections,
            this.functionVariables,
        );
    }
}

export default LoopNode;
