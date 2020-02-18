import elementString from '../static/views/modal.html';
import View from 'Base/view.js';
class Modal extends View
{
  constructor() {
    super(elementString);
    this.render = this.render.bind(this);
  }

  show(obj) {
    function addContentToModal(title, content, footer, obj) {
      title.textContent = "ID: " + obj.id.toString();
      setConent(content, obj);
      footer.textContent = "Close";

      function setConent(content, obj){
          content.innerHTML = `<div>
                                  Input: ${obj.input} </br>
                                  Output: ${obj.output} </br>
                                  Description: ${obj.functionDescription}
                               </div>`;
      }
    }

    this.modal = document.getElementById("modal");
    this.modal.style.display = "block";
    let children = modal.childNodes;
    let modalTitle = children[1];
    let modalContent = children[3];
    let modalFooter = children[5];
    addContentToModal(modalTitle, modalContent, modalFooter, obj);

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
