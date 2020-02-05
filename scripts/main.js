import FlowchartNode from "./flowchart-node";
const EventEmitter = require("events");
const uuidv1 = require('uuid/v1');
//let nodes = [];


function main() {
    let eventEmitter = new EventEmitter();
    let selected_output = "";
    let objectIds = [];
    let objects = [];
    let markedObject = {};


    eventEmitter.on("clicked", function(id, e) {

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
            addContentToModal(modalTitle, modalContent, modalFooter);

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        } else {
            markedObject = obj;
            console.log(obj)
            console.log(document.getElementById(obj.id))
            
            
            //let addGlow = document.getElementById(obj.id).getAttribute("class") + " " + "markedObject";
            console.log("events")
            console.log(event.clientX, obj.offsetX, event.clientX - obj.offsetX)
            console.log(event.clientY, obj.offsetY, typeof(toString(event.clientY - obj.offsetY)))

            
            let x = (event.clientX - obj.offsetX).toString();
            let y = (event.clientY - obj.offsetY).toString();
            let s = " box-shadow: " + x + "px " + y + "px" + " 40px 20px #0ff;";
            let elementStyle = document.getElementById(obj.id).style.cssText;
            document.getElementById(obj.id).setAttribute("style", elementStyle + s);
            console.log("ELEMENTSTYLE", document.getElementById(obj.id).getAttribute("style"));
            /*
            console.log(document.getElementById(obj.id).style.cssText + " background-color: black;")
            let glowStyle = " box-shadow: " + (event.clientX - obj.offsetX).toString + "px " + (event.clientY - obj.offsetY).toString() + "px " + "40px 20px #0ff;";
            console.log("glow", glowStyle)
            document.getElementById(obj.id).style.cssText = document.getElementById(obj.id).style.cssText + (" box-shadow: " + event.clientX - obj.offsetX + "px " 
                                                           + event.clientY - obj.offsetY + "px "
                                                           + "40px 20px #0ff;");

                console.log(document.getElementById(obj.id).style.cssText)
            */
            /*document.getElementById(obj.id).style.cssText = document.getElementById(obj.id).style.cssText + " background-color:black;";*//*(" box-shadow: " + event.clientX - obj.offsetX + "px " 
                                                                            + event.clientY - obj.offsetY + "px "
                                                                            + "40px 20px #0ff;"); */
             /*("style", "background-color: black;")*/ /*"box-shadow: " + event.clientX - obj.offsetX + "px " 
                                                                                 + event.clientY - obj.offsetY + "px "
                                                                                 + "40px 20px #0ff")
                                                                                   //"box-shadow: 120px 80px 40px 20px #0ff")
            
            // Lägg till en styling för att visa marked
            console.log("markedObject: ", markedObject);
            */
        }
    })

    
    function addContentToModal(title, content, footer) {
        title.textContent = "Title";
        /* 
         setContent() Bör vara en funktion som kallas här som ska
         hantera all content som kan variera beroende på vad man är
         inne i.
        */
        content.textContent = "Fest";
        footer.textContent = "Clows";
    }

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