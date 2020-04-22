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

    saveFlow(obj, name){
		let filename = name;
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
	
    async loadFlow() {
		let resultArray = [];
		const jsonData = await API.flowchartAPI.getNameList();
		let a = 0;
		let trash ="";
		for (a = 0; a < jsonData.length; a++){
			trash += jsonData[a].name + "\n"
		}

		let filename = prompt("skriv in namnet på filen du vill ladda\n" +trash)
		let foundId  = jsonData.find(element => element.name == filename)._id;
		const loadedData = await API.flowchartAPI.getById(foundId);
		let nodes = loadedData.nodes;
		return loadedData
    }

}
export default Save;

