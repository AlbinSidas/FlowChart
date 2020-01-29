let markedObject = {};

function createNewObject(){
    // Funktion som kallas då knappen "skapa nytt objekt trycks"
    console.log("NY");

    if (document.getElementById("element-picker").style.visibility == "hidden"){
        document.getElementById("element-picker").style.visibility = "visible";
    }
    else {
        document.getElementById("element-picker").style.visibility = "hidden";
    }
    
}

// When object clicked