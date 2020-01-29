import FlowchartNode from "../flowchart-node";

let markedObject = {};

function main() {
    function createNewObject(){
        // Funktion som kallas då knappen "skapa nytt objekt trycks"
        console.log("NY");
        const flowObj = new FlowchartNode();
        flowObj.print();

        if (document.getElementById("element-picker").style.visibility == "hidden"){
            document.getElementById("element-picker").style.visibility = "visible";
        }
        else {
            document.getElementById("element-picker").style.visibility = "hidden";
        }
    
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