import FlowchartNode from "./flowchart-node";
const EventEmitter = require("events");
import Container from "./container";
const cloneDeep = require("lodash.clonedeep");
const uuidv1 = require('uuid/v1');
//let nodes = [];


function main() {
    let eventEmitter = new EventEmitter();
    let selected_output = "";
    let objectIds = [];
    let objects = [];
    let markedObject = null;
    let objectClick = {};
    let copyObject = {};


    eventEmitter.on("clickedWorkspace", (e) => {
        // Remove marked object
        if ((e.clientX != objectClick.clientX || e.clientY != objectClick.clientY) && markedObject != null) {
            removeMarked();
        }
    })

    eventEmitter.on("copy", () => {
      console.log("Back in main")
      if (markedObject != null) {
        // Create a copy without a reference to the original object.
        //Object.assign(copyObject, markedObject);
        copyObject = cloneDeep(markedObject);
        //copyObject = markedObject;

        console.log("APAPPAPA", markedObject === copyObject)
        //Object.setPrototypeOf(copyObject, Object.getPrototypeOf(markedObject))
        //console.log("efter prototype", copyObject)
        copyObject.id = uuidv1();
        //copyObject.element = null;
        copyObject.element = document.createElement("div");
        copyObject.element.classList.add("flowchart-square");
        copyObject.element.id = copyObject.id;
        console.log("marked", markedObject)
        console.log("cp", copyObject);

      }
    })

    eventEmitter.on("paste", () => {
      console.log("Back in main")
      if (copyObject != null) {
        // Paste the copied object
        objects.push(copyObject);
        console.log("pushed");
        console.log(objects);
        //copyObject.id = uuidv1();
        objectIds.push(copyObject.id);

        workspaceObject.addBox(copyObject);
        console.log("wsobj", workspaceObject);
        console.log("id's", objectIds)
        //copyObject.render();
        //workspaceObject.rerender();

      }
    })

    eventEmitter.on("clicked", function(id, e) {
        /*
            Set the mouseevent to objectClick to compare the
            event on workspace to determine if it's a "mark off" or click on object.
        */

        objectClick = e;
        // Finds the correct node in the created nodes.
        let obj = objects.find((obj) => {
            return obj.id == id;
        });

        // If the click is on the marked object it's a doubleclick and will open the modal.
        if (obj == markedObject) {
            console.log("Open modal", obj);
            // Prevents further draging after doubleclick.
            obj.closeDragElement();

            let modal = document.getElementById("modal");
            modal.style.display = "block";

            let children = modal.childNodes;
            let modalTitle = children[1];
            let modalContent = children[3];
            let modalFooter = children[5];
            addContentToModal(modalTitle, modalContent, modalFooter, obj);

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        } else {
            if (markedObject != null) {
                removeMarked();
            }
            markedObject = obj;
        }
    })

    function removeMarked() {
        let css = document.getElementById(markedObject.id).style.cssText;
        css = css.split(" box-shadow")[0];
        document.getElementById(markedObject.id).style.cssText = css;
        markedObject = null;
    }

    function addContentToModal(title, content, footer, obj) {
        title.textContent = "ID: " + obj.id.toString();
        setConent(content, obj);
        footer.textContent = "Close";

        function setConent(content, obj){
            content.innerHTML = `<div>
                                    Input: ${obj.input} </br>
                                    Output: ${obj.output} </br>
                                    Description: ${obj.functionDescription}
                                 </div>`;
        }
    }


    //const workspaceRoot = ;
    const workspaceObject = new Container(document.querySelector('#workspace-root'), eventEmitter);
    workspaceObject.rerender()

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
  //      const workspaceRoot = document.querySelector('#workspace-root');
//        workspaceRoot.appendChild(flowObj.render());


        //const flowObj = new FlowchartNode(id);
        //const container_root = document.querySelector('#container-root')
        workspaceObject.addBox(flowObj);
        //workspaceRoot.appendChild(flowObj.render());
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
