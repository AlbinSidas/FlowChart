import FlowchartNode from "../flowchart-node";

class ConditionalNode extends FlowchartNode {
    //vid input 0 kör if-delen
    //input annat än 0 kör else-delen 
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
                this.functionVariables); //behövs detta?
    }



}

export default ConditionalNode;