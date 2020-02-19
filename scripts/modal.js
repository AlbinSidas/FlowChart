import elementString from '../static/views/modal.html';
import View from 'Base/view.js';

class Modal extends View
{
  constructor() {
    super(elementString);
    this.obj = {};
    this.render = this.render.bind(this);
  }

  show(obje) {
    this.obj = obje;
    function addContentToModal(title, content, footer, obj) {
	    title.textContent = "ID: " + obj.id.toString();
	    setConent(content, obj);
	    footer.textContent = "Close";
	    
	    function setConent(content, obj){
		  content.innerHTML = `
                            <div id="boxtime">                       
                              Input: <input type="text" id="inputBox" value="${obj.input}"> </br>
                              Output: <input type="text" id="outputBox" value="${obj.output}"> </br>
                              Description: <input type="text" id="fundescBox" value="${obj.functionDescription}">
                            </div>`;
	    }
	}
    this.element.style.display = "block";
    let children = this.element.childNodes;
    let modalTitle   = children[1];
    let modalContent = children[3];
    let modalFooter  = children[5];
    addContentToModal(modalTitle, modalContent, modalFooter, this.obj);


  }

  close(e) {
    this.obj.input = document.getElementById("inputBox").value;
    this.obj.output = document.getElementById("outputBox").value;
    this.obj.functionDescription = document.getElementById("fundescBox").value;
    this.element.style.display = "none";
  }


  render() {
    this.child_views.forEach(c => c.render());
    return this.element;
  }

}

export default Modal;
