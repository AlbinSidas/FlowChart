import data from './test.js'
const uuidv1 = require('uuid/v1');
class FlowchartNode {
    constructor(){
        //ui
        this.posX = 100;
        this.posY = 100;
        //flow
        //this.id =
        this.functionDescription = "No function yet"
        this.input = ""
        this.output = ""

        
    }
    render() {
        return document.createElement("p");
    }

    print() {
        console.log(data.apa);
        console.log(uuidv1());
    }
}

export default FlowchartNode;