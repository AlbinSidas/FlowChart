import FlowchartNode from "./flowchart-node";
const uuidv1 = require('uuid/v1');
let markedObject = {};
//let nodes = [];

function main() {
    let objectIds = [];
    
    let selected_output = "";


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


    function selectOutput(e){

        // let output =  document.getElementById(e).parentElement.nodeName();
        console.log("hejsan");
    }

    function connectNodes(){

        outputNode = document.getElementById("box1"); // hitta "parent box"


        
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