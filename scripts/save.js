import View from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js'
const uuidv1 = require('uuid/v1');
import FlowchartNode from "./flowchart-node";

class Save
{
    constructor() {	
	this.obj = {};
    }

    saveFlow(obj){
	console.log(obj.length, JSON.stringify(obj));
    }
    loadFlow(obj, that){
	let loadtxt = require('../save-files/mocksave.json');
	let object = loadtxt;
	let i = 0;
	console.log(loadtxt)
	for (i=0; i < object.length; i++){

		if(document.getElementById(object[i].id) == null){
			console.log("yyet");
			let loadnode = new FlowchartNode(object[i].id);
			loadnode.copyOther(object[i], object[i].posX, object[i].posY)
			obj.push(loadnode);
			that.attach(loadnode);
		}
	}
	console.log(i);
    }

}

export default Save;
