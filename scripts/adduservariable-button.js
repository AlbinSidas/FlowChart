
import elementString from '../static/views/auv-button.html'
import Button from 'Base/button.js'
import eventEmitter from 'Singletons/event-emitter.js'


class AddUserVariableButton extends Button
{
  constructor() {
    super(elementString);
    this.render = this.render.bind(this)
    this.name = "Add"
    this.onClick = this.onClick.bind(this);
  }

  didAttach(parent) {
    super.didAttach(parent);
  }

  render() {
    this.child_views.forEach(c => c.render());
    return this.element;
  }
    
  onClick(e) {
      eventEmitter.emit("addThings")  
  }
}

export default AddUserVariableButton;
