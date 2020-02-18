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
	console.log(JSON.stringify(obj));
    }
    loadFlow(obj, that){
	let loadtxt = require('./mocksave.json');
	let object = loadtxt;
	let i = 0;
	for (i=0; i < object.length; i++){
	    let loadnode = new FlowchartNode(uuidv1());
	    loadnode.copyOther(object[i], object[i].posX, object[i].posY)
	    obj.push(loadnode);
	    that.attach(loadnode);
	}
	console.log(obj);
    }

}

export default Save;
