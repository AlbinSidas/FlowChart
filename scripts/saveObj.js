import View from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js'
const uuidv1 = require('uuid/v1');
import FlowchartNode from "./flowchart-node";

class SaveObj
{
    constructor(name, funDes, pX, pY, id, iCon, oCon) {
    this.name = name;
    this.funDes = funDes;
    this.pX = pX;
    this.pY = pY;
    this.id = id;
    this.iCon = iCon;
    this.oCon = oCon;
    }
}

export default SaveObj;
