
import elementString from '../static/views/load-button.html'
import styleClasses from 'Styles/size_button.css'
import Button from 'Base/button.js'
import eventEmitter from 'Singletons/event-emitter.js'


class LoadButton extends Button
{
  constructor() {
    super(elementString);
    this.render = this.render.bind(this)
    this.name = "Load"
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
      eventEmitter.emit("load")  
  }
}

export default LoadButton;
