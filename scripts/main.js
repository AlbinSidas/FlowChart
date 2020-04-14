import FlowchartNode from "./flowchart-node";
import Container from "./container";
const uuidv1 = require('uuid/v1');
import Root from 'Base/root.js';
import 'Styles/style.css';
import StartNode from './start-node.js'
import ConditionalNode from "./conditional-node";

function main() {
    const workspaceObject = new Container();
    const rootContainer  = new Root(workspaceObject);
    
    const startNode = new StartNode("start-node");
    workspaceObject.addBox(startNode);

    function createNewObject(){
        const flowObj = new FlowchartNode(uuidv1());
        workspaceObject.addBox(flowObj);
        flowObj.print();
    }
    
    function createIfNewObject(){
        const flowObjIf = new ConditionalNode(uuidv1());
        workspaceObject.addBox(flowObjIf);
        flowObjIf.print();
    }
    //should use the same function with different inputs?
    document.querySelector("#newObject").addEventListener("click", createNewObject)

    document.querySelector('#newIfObject').addEventListener("click", createIfNewObject)
}

(function() {
   main();
})();
