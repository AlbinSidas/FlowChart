import FlowchartNode from "./flowchart-node";
const EventEmitter = require("events");
import Container from "./container";
import SizeButton from "./size-button"
const uuidv1 = require('uuid/v1');
//let nodes = [];


function main() {
    let eventEmitter = new EventEmitter();
    let selected_output = "";
    const v = new SizeButton();
    const workspaceObject = new Container(document.querySelector('#workspace-root'), eventEmitter);
    workspaceObject.render()

    function createNewObject(){
        // Funktion som kallas då knappen "skapa nytt objekt trycks"


        if (document.getElementById("element-picker").style.visibility == "hidden"){
            document.getElementById("element-picker").style.visibility = "visible";
        }
        else {
            document.getElementById("element-picker").style.visibility = "hidden";
        }

        const flowObj = new FlowchartNode(uuidv1(), eventEmitter);
        workspaceObject.addBox(flowObj);
        flowObj.print();
    }


    function selectOutput(e){
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
