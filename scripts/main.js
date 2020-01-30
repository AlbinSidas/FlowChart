import FlowchartNode from "./flowchart-node";
const uuidv1 = require('uuid/v1');
let markedObject = {};

function main() {
    let objectIds = [];
    function createNewObject(){
        // Funktion som kallas då knappen "skapa nytt objekt trycks"


        if (document.getElementById("element-picker").style.visibility == "hidden"){
            document.getElementById("element-picker").style.visibility = "visible";
        }
        else {
            document.getElementById("element-picker").style.visibility = "hidden";
        }
        const id = uuidv1();
        objectIds.push(id);
        const flowObj = new FlowchartNode(id);
        const workspaceRoot = document.querySelector('#workspace-root');
        workspaceRoot.appendChild(flowObj.render());
        flowObj.print();
    }

    document.querySelector("#newObject").addEventListener("click", createNewObject)

}

(function() {
   main();
})();
/*
function createNewObject(){
    // Funktion som kallas då knappen "skapa nytt objekt trycks"
    console.log("NY");

    
}*/

// When object clicked