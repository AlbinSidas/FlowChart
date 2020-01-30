import data from './test.js';
const uuidv1 = require('uuid/v1');
class FlowchartNode {
    constructor(id){
        //ui
        this.posX = 100;
        this.posY = 100;
        //flow
        this.id = id;
        this.functionDescription = "No function yet"
        this.input = ""
        this.output = ""

        
    }
    render() {
        const flowchartDiv =  document.createElement("div");
        flowchartDiv.classList.add("flowchart-square");
        return flowchartDiv;
    }   

    print() {
        console.log(data.apa);
        console.log(uuidv1());
    }
}

export default FlowchartNode;