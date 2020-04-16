import elementString                          from '../static/views/modal.html';
import Button                                 from 'Base/button.js';
import View, {InlineView, InlineClickableViewBinding} from 'Base/view.js';
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
    this.mode = "Node";
    this.render = this.render.bind(this);
    this.saveVersionButton = null;

    const validator = {
        set: (target, key, value) => {
            let res = Reflect.set(target, key, value);
            if(!this.saveVersionButton) {return  res }
            if(key == "obj" && (value == null || value == {})) {
              this.saveVersionButton.enable(false);
            } else {
              this.saveVersionButton.enable();
            }
            return res;
        },
        get: function (target, prop, receiver) {
          return Reflect.get(...arguments);
      }
    };

    this.currentFunctionDefinition = new Proxy({}, validator);

    this.modalTitle   = InlineView`<div class="modalHeader"><h5 id="modalTitle" style="padding: 0 0 0 1%;"></h5>
                                      <a class='dropdown-trigger btn' style="background-color: var(--button-color)" 
                                      id="loadModalButton" href='#' data-target='modalDropdown'>Load function</a>
                                      <ul id='modalDropdown' class='dropdown-content' style="max-height: 500px; ">
                                        <li style="border-bottom:1px solid black"><a href="#!"><input id="loadFunctionInput"> </input></a></li>
                                      </ul>
                                    </div>`;

    this.modalContent = InlineView`<div class="modalContent"></div>`;
    this.modalFooter  = InlineView`<div class="modalFooter">
                                    <button class="btn" id="createFunctionButton" style="background-color: var(--button-color)"> Create function </button>
                                    <button class="btn" id="closeModalButton" style="background-color: var(--button-color)">Close</button>
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

    this.closeButton  = InlineClickableViewBinding(document.getElementById('closeModalButton'), 
                                                  'closeModal', styleClasses.buttonFooter);
    this.loadButton   = new LoadButton();
    this.createButton = InlineClickableViewBinding(document.getElementById('createFunctionButton'), 
                                                  'createFunction', styleClasses.buttonFooter);

    
    eventEmitter.on('listClick', (listObject) => {
      this.loadDefinitionToModal(listObject);
      this.currentFunctionDefinition.obj = listObject;  
      if(this.mode == "Node") {
        // Uppdatera DOM för att motsvara korrekt funktionsdefinitionsnamn
        document.getElementById('functionDefinition').innerHTML = "Function: " + listObject.name;
        document.getElementById('versionNumber').innerHTML = listObject.versionNumber;
        this.obj.functionDefinitionInstance = listObject;
        this._saveNode();
      }
    })

    eventEmitter.on('createFunction', () => {
      let header   = document.getElementById("modalTitle");
      let content = document.getElementsByClassName("modalContent")[0];
      let footer  = document.getElementsByClassName("modalFooter")[0];
      this.mode = "Function";

      this._changeHeader(header);
      this._emptyInnerContent(content);
      this._changeAndAddButtonsFooter(footer);

      this.currentFunctionDefinition.obj = null;
    })

    eventEmitter.on('closeModal', () => {
      this.close();
    })

    eventEmitter.on('saveNewFunctionDef', async () => {
      let funcDef = await this._save();
      try {
        const data = await this._saveNewFuncDef(funcDef);
        const versionObject = data.data[0];
        let funcDefObject = versionObject.versions[0];
        funcDefObject.id = versionObject._id;

        this.functionDefinitions.push(funcDefObject);
        this.loadList.push(funcDefObject);
        this.updateLoadListDOM();
        this.currentFunctionDefinition.obj = funcDefObject;
       
      }
      catch(e){
        console.log(`Save failed due to ${e}`);
      }
    })

    eventEmitter.on('saveVersionFunctionDef', async () => {
      try {
        
        let funcDef = this.currentFunctionDefinition.obj;
        
        funcDef.name = document.getElementById("name").value;
        funcDef.description = document.getElementById("funcdescBox").value;
        funcDef.functionVariables = this._saveScreenVariables();        
        let data = await this._saveVersionFuncDef(funcDef);
        
        console.log(this.currentFunctionDefinition.obj)
        if(this.currentFunctionDefinition.obj.versionNumber < data.data.versionNumber) {
          this.currentFunctionDefinition.obj.versionNumber = data.data.versionNumber;
        }

        this.functionDefinitions.forEach(function(def, i) { 
            if (def.id == funcDef.id) def[i] = funcDef; 
        });
        this.updateLoadListDOM();

      } catch(e) {
        console.log(`Save failed due to ${e}`);
      }
    })
    
    eventEmitter.on('backToNode', () => {
      /*
        TODO
        Gör koll här och konfirma att personen vill lämna sidan och gå tillbaka till noden?
      */
      this.close();
      this.show(this.obj);
    })
      
    eventEmitter.on('loadFunction', () => {
      this.updateLoadList("");
      this.updateLoadListDOM();
    })

    eventEmitter.on('changeLowerVersion', () => {
      this._updateVersionNumber(-1);
    })

    eventEmitter.on('changeHigherVersion', () => {
      this._updateVersionNumber(1);
    })

    eventEmitter.on('addVariable', () =>  {
      // Bör ha logik i denna för att ha unika delar av funktionsvariablerna så inte de får unika id i DOMen senare.
      let nameInput = document.getElementById('nameInp');
      let typeInput = document.getElementById('typeInp');
      if(nameInput.length != 0 && typeInput.length != 0) {
        this._addVariable(document.getElementById('cVarList'), new FunctionVariable(nameInput.value, 
                                                                                    typeInput.value, 
                                                                                    "not yet added"));
      }

      nameInput.value = 'Name';
      typeInput.value = 'Type';
    })
  }

  _updateVersionNumber(upOrDown) {
    let elem = document.getElementById('versionNumber');
    let newValue = "";

    if(this.currentFunctionDefinition.obj == undefined) {
      return;
    }

    if(upOrDown > 0){
      newValue = parseInt(elem.innerHTML) + 1;
      
      // denna kan hitta samma funktionsdefinition i definitionslistan som innehåller senaste versionsvärdet
      // Kontrollerar endast lokalt
      let latestVersionNumber = this.functionDefinitions.find(elem => {
        return elem.id == this.currentFunctionDefinition.obj.id;
      }).versionNumber;

      // Lägg till max version som är senaste versionen av 
      if (newValue > latestVersionNumber) {
        newValue = latestVersionNumber;
      } else {
        this._updateVersion(newValue);
      }
    } else {
      newValue = parseInt(elem.innerHTML) - 1;
      if (newValue < 1) {
        newValue = 1;
      } else {
        this._updateVersion(newValue);
      }
    }

    elem.innerHTML = newValue;
  }

  async _updateVersion(requestVersion) {
    let funcDef = await this._getVersionSnapShot(this.currentFunctionDefinition.obj.id, requestVersion);

    this.close();
    this.obj.functionDefinitionInstance = funcDef.targetVersion;
    if(funcDef.targetVersion.versionNumber == 1) {
      funcDef.targetVersion.id = funcDef._id;
    }
    this.show(this.obj);
  }

  _changeHeader(header) {
      let backButton = '<button style="background-color: var(--button-color)" id="backModalButton" class="btn"> Back </button>';

      header.insertAdjacentHTML('beforebegin', backButton);
      this.backButton    = new BackButton();
      header.textContent = 'Create function';
  }
  _emptyInnerContent(content) {
    content.innerHTML = `
                            Name: <input type="text" id="name" value=""> </br>                       
                            Description: <input type="text" id="funcdescBox" value="">
                            Variables: </br>
                            <input type="text" value="Name" id="nameInp"><input type="text" value="Type" id="typeInp"> </br></br>
                            <ul id="cVarList"></ul>
                         `;
  }
  _changeAndAddButtonsFooter(footer) {  
    let saveVersionButton = '<button style="background-color: var(--button-color)" class="saveFunctionVersionButton btn"> Save as new version </button>';
    let saveNewFunctionButton = '<button style="background-color: var(--button-color)" class="saveFunctionDefButton btn"> Save as new function </button>';
    let addButton  = '<button style="background-color: var(--button-color)" class="addModalButton btn"> Add variable </button>';

    // Denna line tar bort Create Function knappen
    footer.removeChild(footer.children[0]);

    footer.insertAdjacentHTML('afterbegin', saveVersionButton);
    this.saveVersionButton   = InlineClickableViewBinding(document.getElementsByClassName('saveFunctionVersionButton')[0], 
    'saveVersionFunctionDef', styleClasses.buttonFooter);
    
    footer.insertAdjacentHTML('afterbegin', saveNewFunctionButton);
    this.saveNewFunctionButton   =  InlineClickableViewBinding(document.getElementsByClassName('saveFunctionDefButton')[0], 
                                                      'saveNewFunctionDef', styleClasses.buttonFooter);
    if(this.currentFunctionDefinition.obj != null || this.currentFunctionDefinition.obj != {}) {
        this.saveVersionButton.enable(false);
    }

    footer.insertAdjacentHTML('afterbegin', addButton);
    this.addButton    = new AddButton();
  }

  async setupDropdownList() {
    const data = await funcDefAPI.getAll();
    data.forEach(funcdef => {
      funcdef.latestVersion.id = funcdef._id;
      this.functionDefinitions.push(funcdef.latestVersion);
      this.loadList.push(funcdef.latestVersion);
    })
    this.updateLoadListDOM();
  }

  updateList() {
    let ul = document.getElementById("cVarList");
    if(!this.obj.functionDefinitionInstance) { return; }
    for (let i = 0; i < this.obj.functionDefinitionInstance.functionVariables.length; i++){
      this._addVariable(ul, this.obj.functionDefinitionInstance.functionVariables[i]);
      // Lägga till en knapp i listitemet för att kunna ta bort tillagda variabler?
      // Lägg till dessa varianter till addvariable isåfall.
    }
  }

  _addVariable(list, variableObject) {
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(variableObject.type + ': ' + variableObject.name));
      if(this.mode == "Node") {
        let input = document.createElement("INPUT");
        input.setAttribute('id', variableObject.name);
        // TODO Sätt defaultvärden här om det behövs. Förändra defaultvärdet i funktionsvariabler?
        input.value = variableObject.value ? variableObject.value : "Fill value"; 
        li.appendChild(input);
      }
      list.appendChild(li);
  }

  loadDefinitionToModal(def) {
    if(this.mode == "Function") {
      document.getElementById('name').value = def.name;
      document.getElementById("funcdescBox").value = def.description;
    }

    let varList = document.getElementById('cVarList');
    varList.innerHTML = '';
    def.functionVariables.forEach(variable => {
      this._addVariable(varList, variable)
    })
    this.currentFunctionDefinition.obj = def;
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
      this.mode = "Node";
      this.obj = object;

      if(this.obj.functionDefinitionInstance != null) {
        this.currentFunctionDefinition.obj = this.obj.functionDefinitionInstance;
      }

      this.element.style.display = "block";
      let idField = document.getElementById("modalTitle");
      idField.classList.add(styleClasses.idText);
      idField.textContent = "ID: " + this.obj.id.toString();
      
	    this.modalContent.changeHtml(`
                            <div id="boxtime">
                              <p>Name: <input type="text" id="name" value="${this.obj.getName()}"></p> 
                              <p>Description: <input type="text" id="nodeDescriptionBox" value="${this.obj.functionDescription}"> </p>
                              <p id="functionDefinition"> Function: ${this.obj.functionDefinitionInstance ? this.obj.functionDefinitionInstance.name : "No function assigned"} </br> </p>
                              <div id="functionVersion"> Version: 
                                <button id="functionVersionDown" class="btn"></button> 
                                <span id="versionNumber"> ${this.obj.functionDefinitionInstance ? this.obj.functionDefinitionInstance.versionNumber : 0} </span>
                                <button id="functionVersionUp" class="btn"></button>
                              </div>
                              Variables:
                              <ul id="cVarList"></ul>
                            </div>`);


      this.lowerVersion  = new EarlierVersionButton();
      this.higherVersion = new LaterVersionButton();
      document.getElementById('cVarList').innerHTML = '';
      this.updateList();
  }

  _updateFooterNode() {
    let footer = document.getElementsByClassName("modalFooter")[0];
    if(footer.innerHTML.includes("Add variable")) {
      footer.removeChild(footer.children[0]);
      footer.removeChild(footer.children[0]);
      footer.removeChild(footer.children[0]);
      let createButton = '<button id ="createFunctionButton" style="background-color: var(--button-color)" class="btn"> Create function </button>';
      footer.insertAdjacentHTML('afterbegin', createButton);
      this.createButton = InlineClickableViewBinding(document.getElementById('createFunctionButton'), 
                          'createFunction', styleClasses.buttonFooter);
    }
  }

  _updateHeaderNode() {
    let header = document.getElementsByClassName("modalHeader")[0];
    if(header.innerHTML.includes("Back")) {
      header.removeChild(header.children[0]);
    }
  }

  async _saveNewFuncDef(saveObject) {
      try {
          const res = await funcDefAPI.save( saveObject );
          return res;
      } catch(e) {
        throw new Error('Failed to save functiondefinition');
      }
  }

  async _saveVersionFuncDef(saveObject) {
    try {
        let data = {
          "id": saveObject.id,
          "content": { ...saveObject }
        };
        let res =  await funcDefAPI.saveVersion(data);
        return res;
    } catch(e) {
      throw new Error('Failed to save version');
    }
  }

  async _getVersionSnapShot(id, version) {
    try {
      let res =  await funcDefAPI.getVersion(id, version);
      return res;
    } catch(e) {
      throw new Error('Failed to get version');
    }
  }

  _saveNode() {
    this.obj.setName(document.getElementById("name").value ? 
                     document.getElementById("name").value : "" );

    this.obj.functionDescription = document.getElementById("nodeDescriptionBox").value;
    if (this.obj.functionDefinitionInstance) {
      let definitionVariables = this.obj.functionDefinitionInstance.functionVariables;
      for (let i = 0; i < definitionVariables.length; i++) {
          definitionVariables[i].value = document.getElementById(definitionVariables[i].name).value;
      }
    }
  }

  _saveScreenVariables() {
    let variableList = [];
    const variables = document.getElementById('cVarList').children;
    for(let i=0; i < variables.length ; i++) {
      let nameAndType = variables[i].textContent.split(": ");
      let type = nameAndType[0];
      let name = nameAndType[1];
      variableList.push( 
        new FunctionVariable(name, type, 'Not yet added')
      );
    }
    return variableList;
  }

  _save() {
    let funcDef = FunctionDefinition.CreateLocal(document.getElementById("name").value,
                                     document.getElementById("funcdescBox").value,
                                     this._saveScreenVariables());
    return funcDef;
  }

  close() {
    if(this.mode == "Node") {
      // Logik för att se om det finns ickesparade förändringar? 
      this._saveNode();
    }
    this._updateFooterNode();
    this._updateHeaderNode();
    this.currentFunctionDefinition.obj = {};
    this.element.style.display = "none";
    this.obj.refreshPreview();
  }

  render() {
    return this.element;
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
    eventEmitter.emit('addVariable');
  }
}

class BackButton extends Button {
  constructor() {
      super();
      this.setHtml(document.getElementById('backModalButton'));
      this.element = document.getElementById('backModalButton');
      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
      this.element.onclick = this.onClick;
      this.element.classList.add(styleClasses.backButton);
  }

  onClick() {
    eventEmitter.emit('backToNode');
  }
}

class LaterVersionButton extends Button {
  constructor() {
      super();
      this.setHtml(document.getElementById('functionVersionUp'));
      this.element = document.getElementById('functionVersionUp');
      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
      this.element.onclick = this.onClick;
      this.element.innerHTML = `<img src="${require('../static/assets/rightArrow.png').default}" >`;
      this.element.children[0].classList.add(styleClasses.versionImages)
  }

  onClick() {
    eventEmitter.emit('changeHigherVersion');
  }
}

class EarlierVersionButton extends Button {
  constructor() {
      super();
      this.setHtml(document.getElementById('functionVersionDown'));
      this.element = document.getElementById('functionVersionDown');
      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
      this.element.onclick = this.onClick;
      this.element.innerHTML = `<img src="${require('../static/assets/leftArrow.png').default}">`;
      this.element.children[0].classList.add(styleClasses.versionImages);
  }

  onClick() {
    eventEmitter.emit('changeLowerVersion');
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
