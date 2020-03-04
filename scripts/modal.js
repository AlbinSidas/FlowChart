import elementString from '../static/views/modal.html';
import Button from 'Base/button.js';
import SaveObject from './saveObj.js';
import View, {InlineView} from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js';
import styleClasses from 'Styles/modal-buttons.css';
import UserMadeVariable from './usermadevariable.js'

class Modal extends View
{
  constructor() {
    super();
    this.setHtml(elementString)
    this.obj = {};
    this.functionDefinitions = [];
    this.loadList = [];
    this.render = this.render.bind(this);

    this.modalTitle   = InlineView`<div class="modalHeader"><span id="nodeid"></span>
                                      <a class='dropdown-trigger btn' id="loadModalButton" href='#' data-target='modalDropdown'>Load function</a>
                                      <ul id='modalDropdown' class='dropdown-content' style="max-height: 500px; ">
                                        <li style="border-bottom:1px solid black"><a href="#!"><input id="loadFunctionInput"> </input></a></li>
                                      </ul>
                                    </div>`;

    this.modalContent = InlineView`<div class="modalContent"></div>`;
    this.modalFooter  = InlineView`<div class="modalFooter">
                                      <button class="btn" id="addModalButton">Add</button>
                                      <button class="btn" id="saveModalButton">Save function</button>
                                      <button class="btn" id="closeModalButton">Close</button>
                                  </div>`;
/*
    // hämta alla funktionstemplates
    fetch('path', (templateNames) => {

      // Ladda in dem i funktionslistan och loadlistan
      this.functionDefinitions = templateNames;
      this.loadList = templateNames;

      // Uppdatera DOMen med alla funktionsobjekt
    })*/

    this.functionDefinitions.push("Kalle")
    this.functionDefinitions.push("superlongonelinefunctiondefininitionexampleformeXD?")
    this.functionDefinitions.push("Felix")
    this.functionDefinitions.push("Kalle3")
    this.functionDefinitions.push("Kalle4")
    this.functionDefinitions.push("Kalle5")
  }

  uppdateList(){
    //uppdaterar listan med variabler baserat på objektet
    var ul = document.getElementById("cVarList");
    while(ul.firstChild) ul.removeChild(ul.firstChild);
    for (let i = 0; i < this.obj.userMadeVariables.length; i++){
      if(this.obj.userMadeVariables[i].type == "var"){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(this.obj.userMadeVariables[i].name));
        let theBox = document.createElement("INPUT");
        theBox.type = "text";
        theBox.value = this.obj.userMadeVariables[i].value;
        theBox.id = this.obj.userMadeVariables[i].name;
        li.appendChild(theBox);
        ul.appendChild(li);
      }
    }
    
  }
  loadDefinitionToModal(def) {
    document.getElementById("name").value = def.getName();
    document.getElementById("inputBox").value = def.input.getValue();
    document.getElementById("outputBox").value = this.obj.output.getValue();
    document.getElementById("funcdescBox").value = this.obj.functionDescription;
  }

  didAttach(parent) {
    this.attach(this.modalTitle)
    this.attach(this.modalContent)
    this.attach(this.modalFooter)

    let input = document.getElementById('loadFunctionInput');
    input.addEventListener('keyup', () => {
      this.updateLoadList(input.value);
      this.updateLoadListDOM();
    });
    
    document.addEventListener('DOMContentLoaded', function() {
      let elems = document.querySelectorAll('.dropdown-trigger');
      let options = {
        'alginment': 'right', 
        'autotrigger': false,
        'coverTrigger': false,
        'closeOnClick': false,
        'hover':false
      }
      M.Dropdown.init(elems, options);
    });

    this.closeButton = new CloseButton();
    this.saveButton  = new SaveButton();
    this.loadButton  = new LoadButton();
    this.addButton   = new AddButton()
    /*
    eventEmitter.on('listClick', (element) => {
      console.log(element.textContent);
      fetch(`path/till/hämta/enstaka/funcdesc/${element.textContent}`, (clickedDefinition) => {
        loadDefinitionToModal(clickedDefinition);


      })
    })*/

    
    
    

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
                                       this.obj.output.connections );
      
      this.functionDefinitions.push(saveObject);
    })
    
  eventEmitter.on('load-modal', () => {
      // Kan vara onödig
      console.log("Hämta data från databasen och visa upp i dropdownmenyn");
      // Utan dessa blir loadlistan tom när man öppnar efter att ha refreshat /Oskar
      this.updateLoadList("");
      this. updateLoadListDOM();
    })

    eventEmitter.on('addThings', () =>  {
      //knappen Add lägger till ett nytt objekt i 'userMadeVariables' och uppdaterar modal || document.getElementById('nameInp').value
      this.obj.userMadeVariables[this.obj.userMadeVariables.length] = new UserMadeVariable(document.getElementById('nameInp').value, "var", document.getElementById('valInp').value);
      this.uppdateList();
    })
  }

  updateLoadList(searchString) {
    this.loadList = [];
    for(let i = 0; i < this.functionDefinitions.length; i++){
      if(this.functionDefinitions[i].includes(searchString)){
        this.loadList.push(this.functionDefinitions[i]);
      }
    }
  }

  updateLoadListDOM() {
    let dropdown = document.getElementById('modalDropdown');

    while( dropdown.childElementCount > 1) {
      dropdown.removeChild(dropdown.lastChild); 
    }

    for (let i = 0; i < this.loadList.length; i++) {
      let listItem = new ListItem(this.loadList[i]);
      dropdown.appendChild(listItem.render());
    }

    dropdown.style.height = 'auto';
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
                              Input: <input type="text" id="inputBox" value="${this.obj.getInValue()}"> </br>
                              Output: <input type="text" id="outputBox" value="${this.obj.getOutValue()}"> </br>

                              Description: <input type="text" id="funcdescBox" value="${this.obj.functionDescription}">
                              <input type="text" value ="Name" id="nameInp"><input type="text" value ="Value" id="valInp"> </br></br>
                              Variables:
                              <ul id="cVarList"></ul>
                            </div>`);

      this.uppdateList();      
  }

  _save() {
    
    this.obj.setName(document.getElementById("name").value);
    
    this.obj.functionDescription = document.getElementById("funcdescBox").value;
    let fulIn = true;
    let fulOut = true;
    for (let i = 0; i < this.obj.userMadeVariables.length; i++){
      if(this.obj.userMadeVariables[i].type == "var"){
        this.obj.userMadeVariables[i].value = document.getElementById(this.obj.userMadeVariables[i].name).value;
      }
      else if(this.obj.userMadeVariables[i].type == "input"){
        this.obj.userMadeVariables[i].value = document.getElementById("inputBox").value;
        fulIn = false;
      }
      else if(this.obj.userMadeVariables[i].type == "output"){
        this.obj.userMadeVariables[i].value = document.getElementById("outputBox").value;
        fulOut = false;
      }
    }
    if (fulIn){
      this.obj.userMadeVariables[this.obj.userMadeVariables.length] = new UserMadeVariable("Stefan", "input", document.getElementById("inputBox").value);
    }
    if (fulOut){
      this.obj.userMadeVariables[this.obj.userMadeVariables.length] = new UserMadeVariable("Glen", "output", document.getElementById("outputBox").value);
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

class ListItem extends View {
  constructor(innerValue) { 
      super();
      this.setHtml(`<li class='loadDropdownItem'>${innerValue}</li>`);
      this.element.onclick = this.onClick;
  }

  onClick() {
    eventEmitter.emit('listClick', this);
  }
}

 
export default Modal;
