import View from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js'
const uuidv1 = require('uuid/v1');
import FlowchartNode from "./flowchart-node";
import SaveObj from "./saveObj.js";

class Save
{
    constructor() {	
	this.obj = [];
    }

    saveFlow(obj){
		let filename = prompt("Please enter the name for your save file")
		let saveObjectList = [];
		let i = 0;
		for (i = 0; i < obj.length; i++){
			let saveObj = new SaveObj(obj[i].functionDescription, obj[i].posX, obj[i].posY, obj[i].id, obj[i].input.connections, obj[i].output.connections);
			saveObjectList.push(saveObj);
		}
		const data = "{ data: "+JSON.stringify(saveObjectList)+", filename: "+ filename+",}";
		console.log(data);
		fetch('http://localhost:3000/save', 
		{
			method: 'PUT',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: data,
		  })
	}
	
    loadFlow(obj, that){	
		let fileNameList = {};
		fetch('http://localhost:3000/loadFileNames').then((Response)=> {fileNameList = Response.json})
		console.log(fileNameList);
		let loadtxt = require('../save-files/mocksave.json');
		let object = loadtxt;
		let i = 0;
		for (i=0; i < object.length; i++){

			if(document.getElementById(object[i].id) == null){
				let loadnode = new FlowchartNode(object[i].id);
				loadnode.copyOther(object[i], object[i].pX, object[i].pY)
				obj.push(loadnode);
				that.attach(loadnode);
			}
		}
		for (i=0; i < object.length; i++){
			let j = 0;
			for (j=0; j < object[i].oCon.length; j++){
				eventEmitter.emit("outputClicked", object[i].id);
				eventEmitter.emit("inputClicked", object[i].oCon[j]);
				
			}
		}

    }

}
export default Save;
