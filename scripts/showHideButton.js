import Button from 'Base/button.js'
import eventEmitter from 'Singletons/event-emitter.js'


class ShowHideButton extends Button
{
  constructor() {
    super();
    this.setHtml('<button type="button" class="btn" name="button">Show/Hide</button>');
    this.element.setAttribute("style", "background-color:var(--button-color); width:10vw; margin:1.5vw; position:fixed; z-index:10;")
    this.render = this.render.bind(this);
    this.name = "ShowHide";
    this.onClick = this.onClick.bind(this);
  }

  didAttach(parent) {
    super.didAttach(parent);
  }

  render() {
    return this.element;
  }
    
  onClick(e) {
      eventEmitter.emit("showHide");  
  }
}

export default ShowHideButton;
