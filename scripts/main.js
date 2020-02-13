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

            let newconnector = document.createElement("div");
            newconnector.id = currNode.id + "connector";
            console.log("Connection start id: "+ newconnector.id);
            newconnector.classList.add("connector");
            //newconnector.setAttribute("style", `width:${hypothenuse}px; left:${centerX}px; top:${centerY}px; transform:rotate(${angle}deg);`);
            
            let workspace = document.getElementById("workspace-root");
            workspace.appendChild(newconnector);
            updateConnections(prevNode, currNode);
        } 
    })


    eventEmitter.on("updateConnectors", function(node){
        //Wait until 
        let currNode = objects.find((temp) => {
            return temp.id == node.id;
        })

        console.log("update emit: CurrNode: "+node.id);
        console.log("update emit: PrevNode: "+node.input.connections[0]);

        let prevNode = objects.find((temp) => {
            return temp.id == node.input.connections[0];
        })

        updateConnections(prevNode, currNode);
    })


    function updateConnections(prevNode, currNode){

        let updatedConnector = document.getElementById(currNode.id +"connector");
        console.log(updatedConnector.id);
        
        let outX = prevNode.posX + 50;
        let outY = prevNode.posY + 125;
        let inX  = currNode.posX + 50;
        let inY  = currNode.posY - 25;

        let diagLine = calculateDiagonal(outX, outY, inX, inY);

        console.log(diagLine);

        let hypothenuse = diagLine[0];
        let centerX = diagLine[1];
        let centerY = diagLine[2];
        let angle = diagLine[3];
      
        updatedConnector.setAttribute("style", `width:${hypothenuse}px; left:${centerX}px; top:${centerY}px; transform:rotate(${angle}deg);`);
        
        //let workspace = document.getElementById("workspace-root");
        //workspace.appendChild(updatedConnector);
    }



    function calculateDiagonal(outX,outY,inX,inY){
        //Calculaties the line between one nodes output(red) and another nodes input(green).
        let preAbsLenX = outX - inX;
        let preAbsLenY = outY - inY;

        let lenX = Math.abs(preAbsLenX);
        let lenY = Math.abs(preAbsLenY);
        //console.log("LenX after abs = " + lenX)
        //console.log("LenY after abs = " + lenY)
        
        let hypothenuse = Math.sqrt((Math.pow(lenX, 2) + Math.pow(lenY, 2)));
        //console.log("Hypothenuse length = " + hypothenuse);

        let angle = Math.atan2(lenY,lenX)*180/Math.PI;

        let hypCenterPosX = outX;
        if(preAbsLenX > 0){
            hypCenterPosX = (outX - (lenX/2));
            angle = 180 - angle;    
        }
        else if (preAbsLenX < 0){
            hypCenterPosX = (outX + (lenX/2));
        }

        hypCenterPosX = hypCenterPosX - hypothenuse/2;
        let hypCenterPosY = (outY + (lenY/2)) - 5;

        //console.log("HypCenterPosX: " +hypCenterPosX)
        //console.log("HypCenterPosY: " +hypCenterPosY)
        

        return [hypothenuse, hypCenterPosX, hypCenterPosY, angle];
    }

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
