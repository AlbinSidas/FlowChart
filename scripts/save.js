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

	saveFlowVer(obj, name, id){
		if(this.validateSave(obj)){
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
			console.log(saveObjectList);

			API.flowchartAPI.saveVersion({
				"flowchart_id": id,
			
				"content": data
			});
		}
	}
	

	validateSave(obj){
		if(obj.length < 2){
			let saveEmpty = confirm("It looks like you are trying to save a empty flowchart.\n Are you sure you want to do that?");
			if(!saveEmpty)
			{
				return false;	
			}
		}
		if(!obj[0].hasConnector())
		{
			let saveNoStart = confirm("The start node doesn't have a connector to another node.\n Are you sure you want to save the flowchart?");
			if(!saveNoStart){
				return false;
			} 
		}
		return true;
	}
	
    async loadFlow() {
		let resultArray = [];
		const jsonData = await API.flowchartAPI.getNameList();
		console.log(jsonData);
		let a = 0;
		let flowchartNamesbuffer ="";
		for (a = 0; a < jsonData.length; a++){
			flowchartNamesbuffer += jsonData[a].name + "\n"
		}

		let filename = prompt("skriv in namnet på filen du vill ladda\n" + flowchartNamesbuffer)
		let foundId  = jsonData.find(element => element.name == filename).flowchart_id;
		const loadedData = await API.flowchartAPI.getById(foundId);
		console.log(loadedData);
		let nodes = loadedData.nodes;
		return loadedData
	}
	async loadFlowVer(id, ver) {
		const loadedData = await API.flowchartAPI.getFlowVersion(id, ver);
		return loadedData
    }

}
export default Save;

