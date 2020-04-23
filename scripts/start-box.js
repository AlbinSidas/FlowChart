import elementString                          from '../static/views/modal.html';
import Button                                 from 'Base/button.js';
import View, {InlineView}                     from 'Base/view.js';
import eventEmitter                           from 'Singletons/event-emitter.js';
import styleClasses                           from 'Styles/modal-buttons.css';
import API                                    from "Network/network.js"
import { on } from 'events';


class StartBox extends View
{
  constructor() {
    super();
    this.setHtml(elementString)
    this.obj = {};
    this.render = this.render.bind(this);


    this.modalContent = InlineView`<div class="modalContent"><ul id="hehu"></ul></div>`;
    this.modalFooter  = InlineView`<div class="modalFooter">
                                    <button class="btn" id="newButton" style="background-color: var(--button-color)"> Create New Flowchart </button>
                                    <a class='dropdown-trigger btn' style="background-color: var(--button-color); margin:1%; color:black" 
                                      id="loadModalButton" href='#' data-target='modalDropdown'>Open Flowchart</a>
                                      <ul id='modalDropdown' class='dropdown-content' style="max-height: 500px; ">
                                        <li style="border-bottom:1px solid black"><a href="#!"><input id="loadFunctionInput"> </input></a></li>
                                      </ul>
                                  </div>`;
    
  }

  didAttach(parent) {
    this.attach(this.modalContent);
    this.attach(this.modalFooter);

    this.newButton  = new NewButton();
    eventEmitter.on("openFlowchart",(name, id) => {  
        this.openFlow(name, id);
    })

    eventEmitter.on("newFlowchartMade",() => {  
      let filename = prompt("Please enter the name for your new Flowchart")
      eventEmitter.emit('newFlowchart', filename);
      this.close();
    })

    this.loadFileNameList();
  }


  async openFlow(name, id){
    const loadedData = await API.flowchartAPI.tempGetById(id);
    eventEmitter.emit('openedFlowchart', loadedData);
    this.close();
  }

  async loadFileNameList(){
    const jsonData = await API.flowchartAPI.getNameList();
    let dropdown = document.getElementById('modalDropdown');
    while( dropdown.childElementCount > 1) {
      dropdown.removeChild(dropdown.lastChild); 
    }
    for (let a = 0; a < jsonData.length; a++){
      let listItem = new ListItem(jsonData[a].name, jsonData[a].flowchart_id);
      dropdown.appendChild(listItem.render());
    }
    dropdown.style.height = 'auto';
  }

  show() {
      this.element.style.display = "block";
  }

  close() {
    this.element.style.display = "none";
  }

  render() {
    return this.element;
  }
}

class NewButton extends Button {
    constructor() {
        super();
        this.setHtml(document.getElementById('newButton'));
        this.element = document.getElementById('newButton');
        this.render = this.render.bind(this);
        this.onClick = this.onClick.bind(this);
        this.element.onclick = this.onClick;
        this.element.classList.add(styleClasses.backButton);
    }
  
    onClick() {
      eventEmitter.emit('newFlowchartMade');
    }
  }

  class ListItem extends View {
    constructor(name, id) { 
        super();
        this.setHtml(`<li class='loadDropdownItem'>${name}</li>`);
        this.name = name;
        this.id = id;
        this.onClick         = this.onClick.bind(this)
        this.element.onclick = this.onClick;
    }
  
    onClick() {
      eventEmitter.emit('openFlowchart', this.name, this.id);
    }
  }


 
export default StartBox;
