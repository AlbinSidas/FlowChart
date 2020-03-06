import elementString                          from '../static/views/modal.html';
import Button                                 from 'Base/button.js';
import View, {InlineView}                     from 'Base/view.js';
import eventEmitter                           from 'Singletons/event-emitter.js';
import styleClasses                           from 'Styles/modal-buttons.css';

import FunctionVariable                       from 'Model/function-variable.js';
import FunctionDefinition                     from 'Model/function-definition.js';
import NetworkAPIs                            from 'Network/network.js';
const funcDefAPI = NetworkAPIs.funcDefAPI;

class Modal extends View
{
  constructor() {
    super();
    this.setHtml(elementString)
    this.obj = {};
    this.functionDefinitions = [];
    this.loadList = [];
    this.mode = "node";
    this.render = this.render.bind(this);

    this.modalTitle   = InlineView`<div class="modalHeader"><h5 id="modalTitle"></h5>
                                      <a class='dropdown-trigger btn' id="loadModalButton" href='#' data-target='modalDropdown'>Load function</a>
                                      <ul id='modalDropdown' class='dropdown-content' style="max-height: 500px; ">
                                        <li style="border-bottom:1px solid black"><a href="#!"><input id="loadFunctionInput"> </input></a></li>
                                      </ul>
                                    </div>`;

    this.modalContent = InlineView`<div class="modalContent"></div>`;
    this.modalFooter  = InlineView`<div class="modalFooter">
                                    <button class="btn" id="createFunctionButton"> Create function </button>
                                    <button class="btn" id="closeModalButton">Close</button>
                                  </div>`;
    this.setupDropdownList();
  }

  didAttach(parent) {
    this.attach(this.modalTitle);
    this.attach(this.modalContent);
    this.attach(this.modalFooter);

    // This listener handles the load-dropdownlist on keypresses
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

    this.closeButton  = new CloseButton();
    this.loadButton   = new LoadButton();
    this.createButton = new CreateFunctionButton();
    
    eventEmitter.on('listClick', (listObject) => {
      console.log(listObject);

      this.loadDefinitionToModal(listObject);
      this._save();
      this.obj.changeFunctionName(listObject.name);
    })

    eventEmitter.on('createFunction', () => {
      let header   = document.getElementById("modalTitle");
      let content = document.getElementsByClassName("modalContent")[0];
      let footer  = document.getElementsByClassName("modalFooter")[0];
      this.mode = "Function";

      this._changeHeader(header);
      this._emptyInnerContent(content);
      this._changeAndAddButtonsFooter(footer);
    })

    eventEmitter.on('closeModal', () => {
      this.close();
    })

    eventEmitter.on('saveFunction', async () => {
      let funcDef = await this._save();
      try {
        await this._saveFuncDef(funcDef);
        this.functionDefinitions.push(funcDef);
      }
      catch(e){
        console.log(`Save failed due to ${e}`);
      }

    })
    
  eventEmitter.on('loadFunction', () => {
      // Utan dessa blir loadlistan tom när man öppnar efter att ha refreshat /Oskar
      this.updateLoadList("");
      this.updateLoadListDOM();
    })

    eventEmitter.on('addThings', () =>  {
      let nameInput = document.getElementById('nameInp');
      let typeInput = document.getElementById('valInp');
      /*
      this.obj.functionVariables.push(new FunctionVariable(nameInput.value, 
                                                           typeInput.value,
                                                           "not yet added"));

      */
      nameInput.value = '';
      typeInput.value = '';
      this.updateList();
    })
  }

  _changeHeader(header) {
    header.textContent = 'Create function';
  }
  _emptyInnerContent(content) {
    content.innerHTML = `
                            Name: <input type="text" id="name" value=""> </br>                       
                            Description: <input type="text" id="funcdescBox" value="${this.obj.functionDescription}">
                            Variables: </br>
                            <input type="text" value ="Name" id="nameInp"><input type="text" value ="Type" id="valInp"> </br></br>
                            <ul id="cVarList"></ul>
                         `;
  }
  _changeAndAddButtonsFooter(footer) {    
    let saveButton = '<button class="saveModalButton btn"> Save function </button>';
    let addButton  = '<button class="addModalButton btn"> Add variable </button>';

    // Denna line tar bort Create Function knappen
    footer.removeChild(footer.children[0]);
    
    footer.insertAdjacentHTML('afterbegin', saveButton);
    this.saveButton   = new SaveButton();

    footer.insertAdjacentHTML('afterbegin', addButton);
    this.addButton    = new AddButton();
  }

  async setupDropdownList() {
    const data = await funcDefAPI.getAll();
    data.forEach(funcdef => {
      this.functionDefinitions.push(funcdef);
      this.loadList.push(funcdef);
    })
    this.updateLoadListDOM()
  }

  updateList(){
    //uppdaterar listan med variabler baserat på objektet
    let ul = document.getElementById("cVarList");
    //while(ul.firstChild) ul.removeChild(ul.firstChild);
    //console.log(ul.innerHTML)

    // Denna bör loopa över funtionsvariabler i funktionsdefinitionen, inte i obj som är noden
    // 

    for (let i = 0; i < this.obj.functionVariables.length; i++){
      //if(this.obj.functionVariables[i].type == "var"){
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(this.obj.functionVariables[i].type + ': ' + this.obj.functionVariables[i].name));
        
        // Lägga till en knapp i listitemet för att kunna ta bort tillagda variabler?
       
        /*let theBox = document.createElement("INPUT");
        theBox.type = "text";
        theBox.value = this.obj.functionVariables[i].value;
        theBox.id = this.obj.functionVariables[i].name;
        li.appendChild(theBox);
        */

        ul.appendChild(li);
      //}
    }
  }

  _loadVariables() {
    // Ta in en default parameter och bygg sedan upp cvarlist på type samma 
    // sätt fast ha en if om det ska läggas till inputfält för att ändra värde på 
    // variabeln, Detta ska endast kunna ske i node mode

    // Denna bör användas av load Definitionmodal och av updateList
  }

  loadDefinitionToModal(def) {
    document.getElementById("name").value = def.name;
    document.getElementById("funcdescBox").value = def.description;

    // Lägg till konditions för ifall värden för saker ska ändras, kolla på this.mode för att se ifall det är node eller funktion mode som är aktivt.
    let varList = document.getElementById('cVarList');
    varList.innerHTML = '';
    def.functionVariables.forEach(variable => {
      let listItem = document.createElement('li');
      listItem.innerHTML = variable.type + ': ' + variable.name;
      varList.appendChild(listItem);
    })
  }

  updateLoadList(searchString) {
    this.loadList = [];
    for(let i = 0; i < this.functionDefinitions.length; i++){
      if(this.functionDefinitions[i].name.includes(searchString)){
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
      let listItem = new ListItem(this.loadList[i].name, this.loadList[i]);
      dropdown.appendChild(listItem.render());
    }

    dropdown.style.height = 'auto';
  }

  show(object) {
      this.mode = "node";
      this._updateFooterNode();
      this.obj = object;
      this.element.style.display = "block";
      let idField = document.getElementById("modalTitle");
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
      
      document.getElementById('cVarList').innerHTML = '';
      this.updateList();
  }

  _updateFooterNode() {
    let header = document.getElementsByClassName("modalHeader")[0];
    let footer = document.getElementsByClassName("modalFooter")[0];
    if(footer.innerHTML.includes("Add variable")) {
      footer.removeChild(footer.children[0]);
      footer.removeChild(footer.children[0]);
      let createButton = '<button id ="createFunctionButton" class="btn"> Create function </button>';
      footer.insertAdjacentHTML('afterbegin', createButton);
      this.createButton = new CreateFunctionButton();
    }
  }

  async _saveFuncDef(saveObject) {
      try {
          await funcDefAPI.save(
            /*
            new FunctionDefinition(this.obj.getName(), this.obj.functionDescription, [
              new FunctionVariable("MockInput",  "Input",  "Value rm-rf * Mock"),
              new FunctionVariable("MockOutput", "Output", "Value rm-rf * Mock"),
          ])*/
          saveObject
          );
      } catch(e) {
        throw e;
      }
  }

  _save() {
    /*
    this.obj.setName(document.getElementById("name").value);
    
    this.obj.functionDescription = document.getElementById("funcdescBox").value;
    let setDefaultInput = true;
    let setDefaultOutput = true;
    for (let i = 0; i < this.obj.functionVariables.length; i++){
      if(this.obj.functionVariables[i].type == "var"){
        this.obj.functionVariables[i].value = document.getElementById(this.obj.functionVariables[i].name).value;
      }
      else if(this.obj.functionVariables[i].type == "input"){
        this.obj.functionVariables[i].value = document.getElementById("inputBox").value;
        setDefaultInput = false;
      }
      else if(this.obj.functionVariables[i].type == "output"){
        this.obj.functionVariables[i].value = document.getElementById("outputBox").value;
        setDefaultOutput = false;
      }
    }
    if (setDefaultInput){
      this.obj.functionVariables[this.obj.functionVariables.length] = new FunctionVariable("defaultInput", "input", document.getElementById("inputBox").value);
    }
    if (setDefaultOutput){
      this.obj.functionVariables[this.obj.functionVariables.length] = new FunctionVariable("defaultOutput", "output", document.getElementById("outputBox").value);
    }
    */
    /* NY SAVE STARTAR HÄR*/

    let variableList = [];
    const variables = document.getElementById('cVarList').children;
    for(let i=0; i < variables.length ; i++) {
      let nameAndType = variables[i].textContent.split(": ");
      let name = nameAndType[0];
      let type = nameAndType[1];
      variableList.push( 
        new FunctionVariable(name, type, 'Not yet added')
      );
    }

    let funcDef = new FunctionDefinition(document.getElementById("name").value,
                                     document.getElementById("funcdescBox").value,
                                     variableList);

    return funcDef;
  }

  close() {
    if(this.mode == "node") { this._save(); }
    //document.getElementById('cVarList').innerHTML = '';
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
    eventEmitter.emit('closeModal');
  }
}

class CreateFunctionButton extends Button {
  constructor() {
      super();
      this.setHtml(document.getElementById('createFunctionButton'));
      this.element = document.getElementById('createFunctionButton');
      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
      this.element.onclick = this.onClick;
      this.element.classList.add(styleClasses.buttonFooter);
    }

  onClick() {
    eventEmitter.emit('createFunction');
  }
}

class SaveButton extends Button {
  constructor() {
      super();
      this.setHtml(document.getElementsByClassName('saveModalButton')[0]);
      this.element = document.getElementsByClassName('saveModalButton')[0];
      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
      this.element.onclick = this.onClick;
      this.element.classList.add(styleClasses.buttonFooter);
    }

  onClick() {
    eventEmitter.emit('saveFunction');
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
    eventEmitter.emit('loadFunciton');
  }
}

class AddButton extends Button {
  constructor() {
      super();
      this.setHtml(document.getElementsByClassName('addModalButton')[0]);
      this.element = document.getElementsByClassName('addModalButton')[0];
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
  constructor(innerValue, object = {}) { 
      super();
      this.setHtml(`<li class='loadDropdownItem'>${innerValue}</li>`);
      this.object          = object;
      this.onClick         = this.onClick.bind(this)
      this.element.onclick = this.onClick;
  }

  onClick() {
    eventEmitter.emit('listClick', this.object);
  }
}

 
export default Modal;
