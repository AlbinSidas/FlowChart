import View from 'Base/view.js';

class Connector extends View
{
  constructor() {
    super("<div></div>");
    this.render = this.render.bind(this);

  }

  updateConnections(prevNode, currNode){
    function calculateLine(outX,outY,inX,inY){
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
    
    // Aligning the connector with the input/output of a node
    let outX = prevNode.posX + 50;
    let outY = prevNode.posY + 115;
    let inX  = currNode.posX + 50;
    let inY  = currNode.posY - 15;
    
    // line contains the length, position x and y, and the angle
    let line = calculateLine(outX, outY, inX, inY);
    this.element.setAttribute("style", `width:${line[0]}px; left:${line[1]}px; top:${line[2]}px; transform:rotate(${line[3]}deg);`);
  }

  render() {
    return this.element; 
  }

}

export default Connector;