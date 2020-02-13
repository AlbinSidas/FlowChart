import FlowchartNode from "./flowchart-node";
import Container from "./container";
import SizeButton from "./size-button"
const uuidv1 = require('uuid/v1');
import Root from 'Base/root.js'


function main() {
    let markedOutput = "";


    const workspaceObject = new Container();
    const root_container  = new Root(workspaceObject);

    
    
    eventEmitter.on("outputClicked", function(id) {   
        markedOutput = id;
    })

    eventEmitter.on("inputClicked", function(id) {
        if (id == markedOutput) {
            return;
        } 
        else if (markedOutput != ""){
            let currNode = objects.find((temp) => {
                return temp.id == id;
            })

            let prevNode = objects.find((temp) => {
                return temp.id == markedOutput;
            })

            console.log("prev node: "+ prevNode.id);
            console.log("curr node: "+ currNode.id);

            // Checka om en connection redan finns och ta bort i noder
            //                     |||||||||||||
            // i samband med detta VVVVVVVVVVVVV            
            currNode.input.connections.push(markedOutput);
            prevNode.output.connections.push(currNode.id);

            markedOutput = "";

            let newconnector = document.createElement("div");
            newconnector.id = currNode.id + "connector";
            console.log("Connection start id: "+ newconnector.id);
            newconnector.classList.add("connector");
            
            let workspace = document.getElementById("workspace-root");
            workspace.appendChild(newconnector);
            updateConnections(prevNode, currNode);
        } 
    })


    // SKa eventuellt tas bort?????????????
    eventEmitter.on("updateConnectors", function(node){
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
        
        // Aligning the connector with the input/output of a node
        let outX = prevNode.posX + 50;
        let outY = prevNode.posY + 115;
        let inX  = currNode.posX + 50;
        let inY  = currNode.posY - 15;

        // line contains the length, position x and y, and the angle
        let line = calculateLine(outX, outY, inX, inY);

        // hypothenuse = line[0];
        // centerX = line[1];
        // centerY = line[2];
        // angle = line[3];
      
        updatedConnector.setAttribute("style", `width:${line[0]}px; left:${line[1]}px; top:${line[2]}px; transform:rotate(${line[3]}deg);`);
        
        //let workspace = document.getElementById("workspace-root");
        //workspace.appendChild(updatedConnector);
        //Commit comment
    }



    function calculateLine(outX,outY,inX,inY){
        //Calculaties the line between one nodes output(red) and another nodes input(green).
        let preAbsLenX = outX - inX;
        let preAbsLenY = outY - inY;

        let lenX = Math.abs(preAbsLenX);
        let lenY = Math.abs(preAbsLenY);
        
        let hypothenuse = Math.sqrt((Math.pow(lenX, 2) + Math.pow(lenY, 2)));

        let angle = Math.atan2(lenY,lenX)*180/Math.PI;

        let hypCenterPosX = outX;
        if(preAbsLenX > 0){
            hypCenterPosX = (outX - (lenX/2));
            angle = 180 - angle;    
        }
        else if (preAbsLenX < 0){
            hypCenterPosX = (outX + (lenX/2));
        }

        let hypCenterPosY = outY;
        if(preAbsLenY > 0){
            hypCenterPosY = (outY - (lenY/2));
            angle = 180 - angle;    
        }
        else if (preAbsLenY < 0){
            hypCenterPosY = (outY + (lenY/2));
        }
       
        hypCenterPosX = hypCenterPosX - hypothenuse/2;
        return [hypothenuse, hypCenterPosX, hypCenterPosY, angle];
    }


    function createNewObject(){
        // Funktion som kallas då knappen "skapa nytt objekt trycks"
        if (document.getElementById("element-picker").style.visibility == "hidden"){
            document.getElementById("element-picker").style.visibility = "visible";
        }
        else {
            document.getElementById("element-picker").style.visibility = "hidden";
        }
<<<<<<< HEAD
        
        
        
        const id = uuidv1();
        objectIds.push(id);


        const flowObj = new FlowchartNode(id, eventEmitter);
        objects.push(flowObj);
  //      const workspaceRoot = document.querySelector('#workspace-root');
//        workspaceRoot.appendChild(flowObj.render());

=======
>>>>>>> master

        const flowObj = new FlowchartNode(uuidv1());
        workspaceObject.addBox(flowObj);
        flowObj.print();
        //outputObj.print();
        //inputObj.print();
    }


<<<<<<< HEAD
    //function selectOutput(e){
        // let output =  document.getElementById(e).parentElement.nodeName();
    //    console.log("hejsan");
    //}

    // function connectNodes(){
    //    console.log("jag är clickad!!!!!1!!")
    // }
=======
    function selectOutput(e){
        console.log("hejsan");
    }

    function connectNodes(){
        outputNode = document.getElementById("box1"); // hitta "parent box"

    }
>>>>>>> master

    document.querySelector("#newObject").addEventListener("click", createNewObject)
    //document.querySelector("#box-output").addEventListener("click", connectNodes)

}

(function() {
   main();
})();
