import View from 'Base/view.js';

class Connector extends View
{
  constructor(id, prevNode, currNode) {
    super();
    this.setHtml("<div></div>")
    this.render = this.render.bind(this);
    this.id = id;
    this.element.id = id;
    this.currNode = currNode;
    this.prevNode = prevNode;
    this.updateConnections = this.updateConnections.bind(this)
  }

  updateConnections(){
    // Aligning the connector with the input/output of a node
    let outX = this.prevNode.posX + 150;
    let outY = this.prevNode.posY + 250;
    let inX  = this.currNode.posX + 150;
    let inY  = this.currNode.posY - 15;

    if (this.prevNode.id == "start-node"){
      outX = this.prevNode.posX + 50;
      outY = this.prevNode.posY + 50;
    }
    
    // line contains the length, position x and y, and the angle
    let line = this._calculateLine(outX, outY, inX, inY);
    this.element.setAttribute("style", `width:${line[0]}px; left:${line[1]}px; top:${line[2]}px; transform:rotate(${line[3]}deg);`);
  }

  _calculateLine(outX,outY,inX,inY){
    //Calculaties the line between one nodes output(red) and another nodes input(green).
    let preAbsLenX = outX - inX;
    let preAbsLenY = outY - inY;

    let lenX = Math.abs(preAbsLenX);
    let lenY = Math.abs(preAbsLenY);
    
    let hypothenuse = Math.sqrt((Math.pow(lenX, 2) + Math.pow(lenY, 2)));

    let angle = Math.atan2(lenY,lenX)*180/Math.PI;

    let hypCenterPosX = outX;
    if(preAbsLenX > 0){
        hypCenterPosX = (outX - (lenX/2));
        angle = 180 - angle;    
    }
    else if (preAbsLenX < 0){
        hypCenterPosX = (outX + (lenX/2));
    }

    let hypCenterPosY = outY;
    if(preAbsLenY > 0){
        hypCenterPosY = (outY - (lenY/2));
        angle = 180 - angle;    
    }
    else if (preAbsLenY < 0){
        hypCenterPosY = (outY + (lenY/2));
    }

    hypCenterPosX = hypCenterPosX - hypothenuse/2;
    return [hypothenuse, hypCenterPosX, hypCenterPosY, angle];
}

  render() {
    return this.element; 
  }

}

export default Connector;