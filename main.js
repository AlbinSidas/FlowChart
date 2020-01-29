import FlowchartNode from "./flowchart-node";


function main() {
    function createNewObject(){
        // Funktion som kallas då knappen "skapa nytt objekt trycks"
        console.log("NY");
        const flowObj = new FlowchartNode();
        flowObj.print();
    }

    document.querySelector("#newObject").addEventListener("click", createNewObject)
}

(function() {
   main();
})();