import FlowchartNode from "./flowchart-node";
import Container from "./container";
const uuidv1 = require('uuid/v1');
import Root from 'Base/root.js';
import 'Styles/style.css';

function main() {
    const workspaceObject = new Container();
    const root_container  = new Root(workspaceObject);

    function createNewObject(){
        if (document.getElementById("element-picker").style.visibility == "hidden"){
            document.getElementById("element-picker").style.visibility = "visible";
        }
        else {
            document.getElementById("element-picker").style.visibility = "hidden";
        }

        const flowObj = new FlowchartNode(uuidv1());
        workspaceObject.addBox(flowObj);
        flowObj.print();
    }
    document.querySelector("#newObject").addEventListener("click", createNewObject)
}

(function() {
   main();
})();
