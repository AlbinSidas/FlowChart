import FlowchartNode from "./flowchart-node";
const EventEmitter = require("events");
const uuidv1 = require('uuid/v1');
//let nodes = [];


function main() {
    let eventEmitter = new EventEmitter();
    let selected_output = "";
    let objectIds = [];
    let objects = [];
    let markedObject = {"Kalle" : 1};


    eventEmitter.on("clicked", function(id) {
        //console.log("Back in main");
        //console.log(id);

        // Hittare korret nod
        let obj = objects.find((obj) => {
            return obj.id == id;
        });
        if (obj == markedObject) {
            // Öppna modal
            /* https://www.w3schools.com/howto/howto_css_modals.asp */
            console.log("Open modal");
            let modal = document.getElementById("modal");
            //let span = document.getElementById("close")[0];
            modal.style.display = "block";
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }

        } else {
            markedObject = obj;
            // Lägg till en styling för att visa marked
            console.log("markedObject: ", markedObject);
        }



    })

    


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
        const flowObj = new FlowchartNode(id, eventEmitter);
        objects.push(flowObj);
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
<<<<<<< HEAD
        //let outputNode = document.getElementsById("box-output"); // hitta "parent box" 
        console.log("BLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
=======

        outputNode = document.getElementById("box1"); // hitta "parent box"
>>>>>>> modal_menu
        
    }

    document.querySelector("#newObject").addEventListener("click", createNewObject)
    document.querySelector("#box-output").addEventListener("click", connectNodes)

}

(function() {
   main();
})();