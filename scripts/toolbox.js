
import styleClasses from 'Styles/toolbox.css'
import Button from 'Base/button.js'
import View from 'Base/view.js'
import eventEmitter from 'Singletons/event-emitter.js'
import LoadButton from './load-button';
import SaveButton from './save-button';


class Toolbox extends View
{
  constructor(){
    super();
    this.setHtml('<div></div>');
    this.element.setAttribute('id', 'toolbox');
  }

  didAttach(parent) {
    super.didAttach(parent);
    //Load
    this.loadButton = new LoadButton();
    this.attach(this.loadButton);
    //Save
    this.saveButton = new SaveButton();
    this.attach(this.saveButton);
    //Vertical
    this.increaseSizeBtn = new IncreaseSizeButton();
    this.attach(this.increaseSizeBtn);
    this.decreaseSizeBtn = new DecreaseSizeButton();
    this.attach(this.decreaseSizeBtn);
    //Horizontal
    this.increaseHorizontalSizeBtn = new IncreaseHorizontalSizeButton();
    this.attach(this.increaseHorizontalSizeBtn);
    this.decreaseHorizontalSizeBtn = new DecreaseHorizontalSizeButton();
    this.attach(this.decreaseHorizontalSizeBtn);

  }

  show() {
    this.element.setAttribute("style", "visibility:visible");
  }

  hide() {
    this.element.setAttribute("style", "visibility:hidden");
  }

  render() {
    this.child_views.forEach(c => c.render());
    this.element.classList.add(styleClasses.tool_box);
    return this.element;
  }
}


class IncreaseSizeButton extends Button {
  constructor() {
      super();
      this.setHtml('<button type="button" class="btn" name="button">Increase Height</button>')
      this.element.setAttribute("style", "background-color:var(--button-color); width:200px; margin-top:40px")
      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
    }


  onClick(e) {
    eventEmitter.emit('increaseSize');
  }
}

class DecreaseSizeButton extends Button {
  constructor() {
    super();
    this.setHtml('<button type="button" class="btn" name="decrease_button">Decrease Height</button>')
    this.element.setAttribute("style", "background-color:var(--button-color); width:200px; margin-top:10px")
    this.render = this.render.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    eventEmitter.emit('decreaseSize');
  }
}

class IncreaseHorizontalSizeButton extends Button {
  constructor() {
      super();
      this.setHtml('<button type="button" class="btn" name="button_horizontal">Increase Width</button>')
      this.element.setAttribute("style", "background-color:var(--button-color); width:200px; margin-top:10px")
      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
      
    }


  onClick(e) {
    eventEmitter.emit('increaseSizeHorizontal');
  }
}

class DecreaseHorizontalSizeButton extends Button {
  constructor() {
    super();
    this.setHtml('<button type="button" class="btn" name="decrease_button_horizontal">Decrease Width</button>')
    this.element.setAttribute("style", "background-color:var(--button-color); width:200px; margin-top:10px")
    this.render = this.render.bind(this);
    this.onClick = this.onClick.bind(this);
    
  }

  onClick(e) {
    eventEmitter.emit('decreaseSizeHorizonal');
  }
}


export default Toolbox;
