import elementString from '../static/views/modal.html';
import View from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js'
import AUVButton from './adduservariable-button.js'

class Modal extends View
{
  constructor() {
    super(elementString);
    this.obj = {};
    this.render = this.render.bind(this);

    const add = new AUVButton();
    this.attach(add)

    eventEmitter.on('addThings', () =>  {
      //knappen Add lägger till ett nytt objekt i 'userMadeVariables' och uppdaterar modal
      this.obj.userMadeVariables[document.getElementById('nameInp').value] = document.getElementById('valInp').value;
      this.uppdateList();
    })
    }

  show(obje) {
    this.obj = obje;
    console.log(obje.userMadeVariables)
    

    function addContentToModal(title, content, footer, obj) {
	    title.textContent = "ID: " + obj.id.toString();
	    setConent(content, obj);
	    footer.textContent = "Close";
	    
	    function setConent(content, obj){
		    content.innerHTML = `
                            <div id="boxtime">                       
                              Input: <input type="text" id="inputBox" value="${obj.input.getValue()}"> </br>
                              Output: <input type="text" id="outputBox" value="${obj.output.getValue()}"> </br>
                              Description: <input type="text" id="fundescBox" value="${obj.functionDescription}"></br>
                              <input type="text" value ="Name" id="nameInp"><input type="text" value ="Value" id="valInp"> </br></br>
                              <ul id="cVarList"></ul>
                            </div>`;
	    }
	  }
    this.element.style.display = "block";
    let children = this.element.childNodes;
    let modalTitle   = children[1];
    let modalContent = children[3];
    let modalFooter  = children[5];
    addContentToModal(modalTitle, modalContent, modalFooter, this.obj);
    this.uppdateList();
        
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

  close() {
    this.saveOnClose();
    console.log(this.obj.userMadeVariables)
    this.element.style.display = "none";
  }

  saveOnClose(){
    //sparar värden som finns lagrade i textrutor till objektet
    this.obj.input.setValue(document.getElementById("inputBox").value);
    this.obj.output.setValue(document.getElementById("outputBox").value);
    this.obj.functionDescription = document.getElementById("fundescBox").value;
    const keys = Object.keys(this.obj.userMadeVariables)
    for (const key of keys){
      this.obj.userMadeVariables[key] = document.getElementById(key).value;
    }
  }

  render() {
    this.child_views.forEach(c => c.render());
    return this.element;
  }
}

export default Modal;
