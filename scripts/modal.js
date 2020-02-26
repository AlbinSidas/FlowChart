import elementString from '../static/views/modal.html';
import Button from 'Base/button.js';
import SaveObject from './saveObj.js';
import View, {InlineView} from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js';
import styleClasses from 'Styles/modal-buttons.css';

class Modal extends View
{
  constructor() {
    super();
    this.setHtml(elementString)
    this.obj = {};
    this.functionDefinitions = [];
    this.render = this.render.bind(this);
    /* 
    <li><a href="#!">one</a></li> 
                                        <li><a href="#!">two</a></li> 
                                        <li class="divider" tabindex="-1"></li> 
                                        <li><a href="#!">three</a></li> 
                                        <li><a href="#!"><i class="material-icons">view_module</i>four</a></li> 
                                        <li><a href="#!"><i class="material-icons">cloud</i>five</a></li> 
    */

    //lägg in sökruta här för att filtrera i dropdown --> <!-- Gör en loop här över de element som ligger i dropdownlistan som matchar de funktionsdefinitioner som sökes--> <!-- <li><a href="#!">one</a></li> <li><a href="#!">two</a></li> <li class="divider" tabindex="-1"></li> <li><a href="#!">three</a></li> <li><a href="#!"><i class="material-icons">view_module</i>four</a></li> <li><a href="#!"><i class="material-icons">cloud</i>five</a></li> 
    this.modalTitle   = InlineView`<div class="modalHeader"><span id="nodeid"></span>
                                      <a class='dropdown-trigger btn' id="loadModalButton" href='#' data-target='modalDropdown'>Load</a>
                                      <ul id='modalDropdown' class='dropdown-content'>
                                        
                                      </ul>
                                    </div>`;

    this.modalContent = InlineView`<div class="modalContent"></div>`;
    this.modalFooter  = InlineView`<div class="modalFooter">
                                      <button class="btn" id="addModalButton">Add</button>
                                      <button class="btn" id="saveModalButton">Save</button>
                                      <button class="btn" id="closeModalButton">Close</button>
                                  </div>`;
           
  }

  uppdateList(){
    //uppdaterar listan med variabler baserat på objektet
    var ul = document.getElementById("cVarList");
    while(ul.firstChild) ul.removeChild(ul.firstChild);
    const keys = Object.keys(this.obj.userMadeVariables)
    for (const key of keys){
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(key));
      let theBox = document.createElement("INPUT");
      theBox.type = "text";
      theBox.value = this.obj.userMadeVariables[key];
      theBox.id = key;
      li.appendChild(theBox);
      ul.appendChild(li);
    }
    
  }

  didAttach(parent) {
    this.attach(this.modalTitle)
    this.attach(this.modalContent)
    this.attach(this.modalFooter)
    
    document.addEventListener('DOMContentLoaded', function() {
      let elems = document.querySelectorAll('.dropdown-trigger');
      let options = {
        'alginment': 'right', 
        'autotrigger': true,
        'coverTrigger': false,
        'closeOnClick': true,
        'hover':false
      }
      M.Dropdown.init(elems, options);
    });

    this.closeButton = new CloseButton();
    this.saveButton  = new SaveButton();
    this.loadButton  = new LoadButton();
    this.addButton   = new AddButton()

    eventEmitter.on('close-modal', () => {
      this.close();
    })

    eventEmitter.on('save-modal', () => {
      console.log("Spara ner all data på ett snyggt sätt och skicka till databasen");
      // Ha en failsafe för att se vilka object som finns i listan över sedan tidigare sparade objekt föra tt inte spara samma flera gånger? Hur ska vi göra versionhanteringen?
      this._save();
      let saveObject = new SaveObject( this.obj.name, 
                                       this.obj.functionDescription, 
                                       /* Vet ej hur vi vill göra vid denna delen av spara nod, kanske ha en spara funktionsdefinition som ärver från saveObject? eller bara annan funktion?*/
                                       100, 
                                       100, 
                                       
                                       this.obj.id, 
                                       this.obj.input.connections, 
                                       this.obj.output.connections )
      
      this.functionDefinitions.push(saveObject);
    })

    eventEmitter.on('load-modal', () => {
      // Måste skapa en 2-way binding till listan med functionsdefinitioner som funnits sedan tidigare
      console.log("Hämta data från databasen och visa upp i dropdownmenyn");
    })

    eventEmitter.on('addThings', () =>  {
      //knappen Add lägger till ett nytt objekt i 'userMadeVariables' och uppdaterar modal
      this.obj.userMadeVariables[document.getElementById('nameInp').value] = document.getElementById('valInp').value;
      this.uppdateList();
    })
  }

  show(object) {
      this.obj = object;
      this.element.style.display = "block";
      let idField = document.getElementById("nodeid");
      idField.classList.add(styleClasses.idText);
      idField.textContent = "ID: " + this.obj.id.toString();
	    this.modalContent.changeHtml(`
                            <div id="boxtime">
                              Name: <input type="text" id="name" value=""> ${this.obj.getName()} </br>                       
                              Input: <input type="text" id="inputBox" value="${this.obj.input.getValue()}"> </br>
                              Output: <input type="text" id="outputBox" value="${this.obj.output.getValue()}"> </br>
                              Description: <input type="text" id="funcdescBox" value="${this.obj.functionDescription}"> </br>
                              Add new variable:
                              <input type="text" value ="Name" id="nameInp"><input type="text" value ="Value" id="valInp"> </br></br>
                              Variables:
                              <ul id="cVarList"></ul>
                            </div>`)
      this.uppdateList();
      
  }

  _save() {
    this.obj.setName(document.getElementById("name").value);
    this.obj.input.setValue(document.getElementById("inputBox").value);
    this.obj.output.setValue(document.getElementById("outputBox").value);
    this.obj.functionDescription = document.getElementById("funcdescBox").value;
    const keys = Object.keys(this.obj.userMadeVariables)
    for (const key of keys){
      this.obj.userMadeVariables[key] = document.getElementById(key).value;
    }
  }

  close() {
    this._save();
    this.element.style.display = "none";
  }

  render() {
    return this.element;
  }
}

class CloseButton extends Button {
  constructor() {
      super();
      this.setHtml(document.getElementById('closeModalButton'));
      this.element = document.getElementById('closeModalButton');
      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
      this.element.onclick = this.onClick;
      this.element.classList.add(styleClasses.buttonFooter);
  }

  onClick() {
    eventEmitter.emit('close-modal');
  }
}

class SaveButton extends Button {
  constructor() {
      super();
      this.setHtml(document.getElementById('saveModalButton'));
      this.element = document.getElementById('saveModalButton');
      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
      this.element.onclick = this.onClick;
      this.element.classList.add(styleClasses.buttonFooter);
    }

  onClick() {
    eventEmitter.emit('save-modal');
  }
}

class LoadButton extends Button {
  constructor() {
      super();
      this.setHtml(document.getElementById('loadModalButton'));
      this.element = document.getElementById('loadModalButton');
      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
      this.element.onclick = this.onClick;
      this.element.classList.add(styleClasses.buttonLoad);
    }

  onClick() {
    eventEmitter.emit('load-modal');
  }
}
class AddButton extends Button {
  constructor() {
      super();
      this.setHtml(document.getElementById('addModalButton'));
      this.element = document.getElementById('addModalButton');
      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
      this.element.onclick = this.onClick;
      this.element.classList.add(styleClasses.buttonFooterAdd);
  }

  onClick() {
    eventEmitter.emit('addThings');
  }
}


export default Modal;
