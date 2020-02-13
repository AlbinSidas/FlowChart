import elementString from '../static/views/modal.html';
import View from 'Base/view.js';
import LockButton from './lock-button.js'
import eventEmitter from 'Singletons/event-emitter.js'

class Modal extends View
{
  constructor() {
    super(elementString);
    this.render = this.render.bind(this);
  }

  show(obj) {
    const lock = new LockButton();
    this.attach(lock);
    eventEmitter.on('lock', () =>  {
      obj.input = document.getElementById("inputBox").value;
      obj.output = document.getElementById("outputBox").value;
      obj.functionDescription = document.getElementById("fundescBox").value;
      document.getElementById("inputTextBox").value = document.getElementById("inputBox").value;
      document.getElementById("outputTextBox").value = document.getElementById("outputBox").value;
      document.getElementById("fundescTextBox").value = document.getElementById("fundescBox").value;
      document.getElementById("texttime").style = "display:inline;";
      document.getElementById("boxtime").style = "display:none;";
      
  })
  eventEmitter.on('unlock', () =>  {
    document.getElementById("boxtime").style = "display:inline;";
    document.getElementById("texttime").style = "display:none;";
})
    function addContentToModal(title, content, footer, obj, lock) {
      title.textContent = "ID: " + obj.id.toString();
      setConent(content, obj, lock);
      footer.textContent = "Close";
      
      function setConent(content, obj, lock){
          content.innerHTML = `
                               <div id="texttime" style="display:inline;">                       
                               Input: <input type="text" id="inputTextBox" value="${obj.input}" disabled > </br>
                               Output: <input type="text" id="outputTextBox" value="${obj.output}" disabled> </br>
                               Description: <input type="text" id="fundescTextBox" value="${obj.functionDescription}" disabled>
                               </div>
                               <div id="boxtime" style="display:none;">                       
                                  Input: <input type="text" id="inputBox" value="${obj.input}"> </br>
                                  Output: <input type="text" id="outputBox" value="${obj.output}"> </br>
                                  Description: <input type="text" id="fundescBox" value="${obj.functionDescription}">
                               </div>`;
      }
    }

    this.modal = document.getElementById("modal");
    this.modal.style.display = "block";
    let children = modal.childNodes;
    let modalTitle = children[1];
    let modalContent = children[3];
    let modalFooter = children[5];
    addContentToModal(modalTitle, modalContent, modalFooter, obj, lock);

  }

  close() {
    this.element.style.display = "none";
  }


  render() {
    this.child_views.forEach(c => c.render());
    //this.element.setAttribute('style', `position: fixed; width:100px; height: 100px;`);
    return this.element;
  }

}

export default Modal;
