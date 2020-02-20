import elementString from '../static/views/modal.html';
import Button from 'Base/button.js';
import View from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js';

class Modal extends View
{
  constructor() {
    super(elementString);
    this.obj = {};
    this.render = this.render.bind(this);

    // Skapa tre knappar: Stäng, Spara, Ladda ( Ladda kommer vara en dropdown )
  }

  show(obje) {
    this.obj = obje;
    function addContentToModal(title, content, footer, obj) {
      //title.innerHTML = "<p>ID: " + obj.id.toString() + "</p>" + title.textContent;
      //title.childNodes.splice(1, 0, "ID: " + obj.id.toString())
      //let textnode = document.createTextNode("ID: " + obj.id.toString());
      //title.insertBefore(textnode, title)
      document.getElementById("nodeid").textContent = "ID: " + obj.id.toString()
      setConent(content, obj);
      //footer.textContent = "Close";
	    
	    function setConent(content, obj) {
		  content.innerHTML = `
                            <div id="boxtime">
                              Name: <input type="text" id="name" value="${obj.getName()}"> </br>
                              Input: <input type="text" id="inputBox" value="${obj.input.getValue()}"> </br>
                              Output: <input type="text" id="outputBox" value="${obj.output.getValue()}"> </br>
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

  didAttach() {
    super.didAttach(parent);
    this.closeButton = new CloseButton();
    this.saveButton  = new SaveButton();
    this.loadButton  = new LoadButton();

    eventEmitter.on('close-modal', () => {
      this.close();
    })
    eventEmitter.on('save-modal', () => {
      console.log("Spara ner all data på ett snyggt sätt och skicka till databasen");
    })
    eventEmitter.on('load-modal', () => {
      console.log("Hämta data från databasen och visa upp i dropdownmenyn");
    })
  }

  close() {
    this.obj.setName(document.getElementById("name").value);
    this.obj.input.setValue(document.getElementById("inputBox").value);
    this.obj.output.setValue(document.getElementById("outputBox").value);
    this.obj.functionDescription = document.getElementById("fundescBox").value;
    this.element.style.display = "none";
  }

  render() {
    this.child_views.forEach(c => c.render());
    return this.element;
  }
}

class CloseButton extends Button {
  constructor() {
      super(document.getElementById('closeModalButton'));
      this.element = document.getElementById('closeModalButton');
      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
      this.element.onclick = this.onClick;
  }

  onClick() {
    eventEmitter.emit('close-modal');
  }
}

class SaveButton extends Button {
  constructor() {
      super(document.getElementById('saveModalButton'));
      this.element = document.getElementById('saveModalButton');
      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
      this.element.onclick = this.onClick;
    }

  onClick() {
    eventEmitter.emit('save-modal');
  }
}

class LoadButton extends Button {
  constructor() {
      super(document.getElementById('loadModalButton'));
      this.element = document.getElementById('loadModalButton');
      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
      this.element.onclick = this.onClick;
    }

  onClick() {
    eventEmitter.emit('load-modal');
  }
}


export default Modal;
