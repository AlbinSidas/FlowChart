import FlowchartNode from "./flowchart-node";
import Container from "./container";
import SizeButton from "./size-button"
const uuidv1 = require('uuid/v1');
import Root from 'Base/root.js'


function main() {
    let selected_output = "";


    const workspaceObject = new Container();
    const root_container  = new Root(workspaceObject);



    function createNewObject(){
        // Funktion som kallas då knappen "skapa nytt objekt trycks"


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
