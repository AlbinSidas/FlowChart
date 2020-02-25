import elementString from '../static/views/modal.html';
import View, {InlineView} from 'Base/view.js';

class Modal extends View
{
  constructor() {
    super();
    this.setHtml(elementString)
    this.obj = {};
    this.render = this.render.bind(this);
    this.modalTitle   = InlineView`<div class="modal-header"></div>`
    this.modalContent = InlineView`<div class="modal-content"></div>`
    this.modalFooter  = InlineView`<div class="modal-footer"></div>`
  }

  didAttach(parent) {
    this.attach(this.modalTitle)
    this.attach(this.modalContent)
    this.attach(this.modalFooter)
  }

  show(object) {
      this.obj = object;
      this.element.style.display = "block";
	    this.modalTitle.element.textContent = "ID: " + this.obj.id.toString();
	    this.modalContent.changeHtml(`
                            <div id="boxtime">                       
                              Input: <input type="text" id="inputBox" value="${this.obj.input.getValue()}"> </br>
                              Output: <input type="text" id="outputBox" value="${this.obj.output.getValue()}"> </br>
                              Description: <input type="text" id="fundescBox" value="${this.obj.functionDescription}">
                            </div>`)
      
      this.modalFooter.element.textContent = "Close";
      
  }

  close() {
    this.obj.input.setValue(document.getElementById("inputBox").value);
    this.obj.output.setValue(document.getElementById("outputBox").value);
    this.obj.functionDescription = document.getElementById("fundescBox").value;
    this.element.style.display = "none";
  }


  render() {
    return this.element;
  }
}

export default Modal;
