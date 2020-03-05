import FlowchartNode from "../flowchart-node";

class ConditionalNode extends FlowchartNode {
    getMetaInfo() {
        return 
            new NodeMetaInfo(
                "conditional", 
                this.functionDescription,
                this.posX, 
                this.posY, 
                this.id, 
                this.input.connections, 
                this.output.connections, 
                this.functionVariables);
    }
}

export default ConditionalNode;