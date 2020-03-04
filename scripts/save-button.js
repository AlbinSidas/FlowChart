
import elementString from '../static/views/save-button.html'
import styleClasses from 'Styles/size_button.css'
import Button from 'Base/button.js'
import eventEmitter from 'Singletons/event-emitter.js'


class SaveButton extends Button
{
  constructor() {
    super();
    this.setHtml(elementString)
    this.render = this.render.bind(this)
    this.name = "Save"
    this.onClick = this.onClick.bind(this);
    this.element.setAttribute("style", "background-color:--main-accent")
  }

  didAttach(parent) {
    super.didAttach(parent);
  }

  render() {
    this.child_views.forEach(c => c.render());
    return this.element;
  }
    
  onClick(e) {
      eventEmitter.emit("save")  
  }
}

export default SaveButton;
