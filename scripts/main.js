import FlowchartNode from "./flowchart-node";
const EventEmitter = require("events");
import Container from "./container";
import SizeButton from "./size-button"
const uuidv1 = require('uuid/v1');
//let nodes = [];


function main() {
    let eventEmitter = new EventEmitter();
    let objectIds = [];
    let objects = [];
    let markedObject = null;
    let objectClick = {};
    let markedOutput = "";

    const v = new SizeButton()


    eventEmitter.on("clickedWorkspace", (e) => {
        // Remove marked object
        if ((e.clientX != objectClick.clientX || e.clientY != objectClick.clientY) && markedObject != null) {
            removeMarked();
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

    
    
    eventEmitter.on("outputClicked", function(id) {   
        markedOutput = id;

    })

    eventEmitter.on("inputClicked", function(id) {
        
        if (id == markedOutput) {
            //modal should not pop up
            //removeMarked()
        } 
        else if (markedOutput != ""){
            //console.log("NEW INPUT!!!!!!!!!!!!!!!!!!!1");

            let currNode = objects.find((temp) => {
                return temp.id == id;
            })

            let prevNode = objects.find((temp) => {
                return temp.id == markedOutput;
            })

            console.log("prev node: "+ prevNode.id);
            console.log("curr node: "+ currNode.id);

            currNode.input.connections.push(markedOutput);
            prevNode.output.connections.push(currNode.id);
            
            markedOutput = "";

            // let lineContainer = document.getElementById("connector-canvas");
            // let newLine = document.createElement("line");
            // newLine.classList.add("connector-line");
                    
            // newLine.setAttribute("x1", prevNode.posX);
            // newLine.setAttribute("y1", prevNode.posY);
            // newLine.setAttribute("x2", currNode.posX);
            // newLine.setAttribute("y2", currNode.posY);

            // lineContainer.appendChild(newLine);


            // let prevNodeElement = document.getElementById(prevNode.id);

            let prevNodeElement = document.getElementById("workspace-root");


            let testDiv = document.createElement("div");
            testDiv.classList.add("connector");
            
            
            testDiv.setAttribute("height", (currNode.posY - prevNode.posY).toString() );
            testDiv.setAttribute("width", (currNode.posX - prevNode.posX).toString() );


            prevNodeElement.appendChild(testDiv);


            // for (id in node.output.connections) {
            //     console.log(node.output.connections[id]);
            //     console.log("skriv ut detta^^^")
            // }

            // Rita pil??????????????????????????????????


        } 
    })


    //const workspaceRoot = ;
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
        //outputObj.print();
        //inputObj.print();
    }


    //function selectOutput(e){
        // let output =  document.getElementById(e).parentElement.nodeName();
    //    console.log("hejsan");
    //}

    // function connectNodes(){
    //    console.log("jag är clickad!!!!!1!!")
    // }

    document.querySelector("#newObject").addEventListener("click", createNewObject)
    //document.querySelector("#box-output").addEventListener("click", connectNodes)

}

(function() {
   main();
})();
