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
			let saveObj = new SaveObj(obj[i].functionDescription, obj[i].posX, obj[i].posY, obj[i].id, obj[i].input.connections, obj[i].output.connections, obj[i].userMadeVariables);
			saveObjectList.push(saveObj);
		}
		const data = {
			"data": saveObjectList,
			"filename": filename
		};
		fetch('http://localhost:3000/save', 
		{
			method: 'PUT',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		  })
	}
	
    async loadFlow(obj, that){	
		const resp = await fetch('http://localhost:3000/loadfilenames');
		const jsonData = await resp.json();
		let a = 0;
		let trash ="";
		for (a = 0; a < jsonData.length; a++){
			trash += jsonData[a] + "\n"
		}
		let filename = prompt("skriv in namnet på filen du vill ladda\n" +trash)
		const respun = await fetch('http://localhost:3000/loadfile/'+filename);
		const loadtxt = await respun.json()
		let object = loadtxt;
		let i = 0;
		for (i=0; i < object.length; i++){

			if(document.getElementById(object[i].id) == null){
				let loadnode = new FlowchartNode(object[i].id);
				loadnode.fillNode(object[i])
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
