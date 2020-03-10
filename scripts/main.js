import FlowchartNode from "./flowchart-node";
import Container from "./container";
const uuidv1 = require('uuid/v1');
import Root from 'Base/root.js';
import 'Styles/style.css';
import StartNode from './start-node.js'

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
    document.querySelector("#newObject").addEventListener("click", createNewObject)
}

(function() {
   main();
})();
