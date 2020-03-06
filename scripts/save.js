import View from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js'
const uuidv1 = require('uuid/v1');
import FlowchartNode from "./flowchart-node";
import API from "Network/network.js"

class Save
{
    constructor() {	
		this.obj = [];
    }

    saveFlow(obj){
		let filename = prompt("Please enter the name for your save file")
		let saveObjectList = [];
		let i = 0;
		for (i = 1; i < obj.length; i++){
			let saveObj = obj[i].getMetaInfo();
			saveObjectList.push(saveObj);
			console.log(obj[i])
		}
		const data = {
			"nodes": saveObjectList,
			"name": filename,
		};
		console.log(data)
		API.flowchartAPI.save(data);
		// fetch('http://localhost:3000/saved', 
		// {
		// 	method: 'PUT',
		// 	headers: {
		// 	  'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(data),
		//   })
	}
	
    async loadFlow(obj, that){	
		//const resp     = //await fetch('http://localhost:3000/loadfilenames');
		const jsonData = await API.flowchartAPI.getNameList() // {id, name}
		let a = 0;
		let trash ="";
		for (a = 0; a < jsonData.length; a++){
			trash += jsonData[a].name + "\n"
		}
		let filename = prompt("skriv in namnet på filen du vill ladda\n" +trash)
		//const respun =  await fetch('http://localhost:3000/loadfile/'+filename);
		let foundId  = jsonData.find(element => element.name == filename)._id;
		const loadtxt = await API.flowchartAPI.getById(foundId); //await respun.json()
		let object = loadtxt.nodes;
		console.log("SADASDF", object)
		let i = 0;
		for (i=0; i < object.length; i++){

			if(document.getElementById(object[i].id) == null){
				let loadnode = new FlowchartNode(object[i].id);
				loadnode.fillNode(object[i]);
				obj.push(loadnode);
				that.attach(loadnode);
			}
		}
		for (i=0; i < object.length; i++){
			if(object[i].inputConnectionList.length !=0 && object[i].inputConnectionList.includes("start-node")){
				eventEmitter.emit("outputClicked", "start-node");
				eventEmitter.emit("inputClicked", object[i].id);
			}
			for (let j=0; j < object[i].outputConnectionList.length; j++){
				eventEmitter.emit("outputClicked", object[i].id);
				eventEmitter.emit("inputClicked", object[i].outputConnectionList[j]);
				
			}
		}
		
    }

}
export default Save;
