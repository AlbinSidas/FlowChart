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
		for (i = 1; i < obj.length; i++) {
			let saveObj = obj[i].getMetaInfo();
			saveObjectList.push(saveObj);
		}
		const data = {
			"nodes": saveObjectList,
			"name": filename,
		};

		API.flowchartAPI.save(data);
	}
	
    async loadFlow(obj, that){	
		const jsonData = await API.flowchartAPI.getNameList();
		let a = 0;
		let trash ="";
		for (a = 0; a < jsonData.length; a++){
			trash += jsonData[a].name + "\n"
		}

		let filename = prompt("skriv in namnet på filen du vill ladda\n" +trash)
		let foundId  = jsonData.find(element => element.name == filename)._id;
		const loadtxt = await API.flowchartAPI.getById(foundId);
		let object = loadtxt.nodes;

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
