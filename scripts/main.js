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

        // const outputObj = new outputObj(id);
        // const inputObj = new inputObj(id);

        workspaceRoot.appendChild(flowObj.render());
        
        const currentNode = document.getElementById(id.toString());
        
        const inputDiv = document.createElement("div");
        inputDiv.classList.add("box-input");
        inputDiv.setAttribute("id", id+"input");


        const nodeContent = document.createElement("div");
        nodeContent.classList.add("node-content");
        nodeContent.setAttribute("id", id+"content");


        const outputDiv = document.createElement("div");
        outputDiv.classList.add("box-output");
        outputDiv.setAttribute("id", id+"output");

        
        currentNode.appendChild(inputDiv);
        currentNode.appendChild(nodeContent);        
        currentNode.appendChild(outputDiv);

        
        flowObj.print();
        //outputObj.print();
        //inputObj.print();
    }


    function selectOutput(e){
        // let output =  document.getElementById(e).parentElement.nodeName();
        console.log("hejsan");
    }

    function connectNodes(){
        //let outputNode = document.getElementsById("box-output"); // hitta "parent box" 
        console.log("BLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
        
    }


    document.querySelector("#newObject").addEventListener("click", createNewObject)
    document.querySelector("#box-output").addEventListener("click", connectNodes)

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