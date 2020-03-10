
import Button from 'Base/button.js'
import eventEmitter from 'Singletons/event-emitter.js'


class LoadButton extends Button
{
  constructor() {
    super();
    this.setHtml('<button type="button" class="btn" style="background-color:var(--button-color); margin:5%; margin-right:10%; width:40%;" name="button">Load</button>')
    this.render = this.render.bind(this)
    this.name = "Load"
    this.onClick = this.onClick.bind(this);
  }

  didAttach(parent) {
    super.didAttach(parent);
  }

  render() {
    //this.child_views.forEach(c => c.render());
    return this.element;
  }
    
  onClick(e) {
      eventEmitter.emit("load")  
  }
}

export default LoadButton;
