import FlowchartNode from "./flowchart-node";
import Container from "./container";
const uuidv1 = require('uuid/v1');
import Root from 'Base/root.js';
import 'Styles/style.css';
import StartNode from './start-node.js'
import ConditionalNode from "./conditional-node";
import ParallelNode from './parallel-node';

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

    function createParallelNewObject(){
        const flowObjPara = new ParallelNode(uuidv1());
        workspaceObject.addBox(flowObjPara);
        flowObjPara.print();
    }
    document.querySelector("#newObject").addEventListener("click", createNewObject)

    document.querySelector('#newIfObject').addEventListener("click", createIfNewObject)

    document.querySelector('#newParallelObject').addEventListener("click", createParallelNewObject)
}

(function() {
   main();
})();
