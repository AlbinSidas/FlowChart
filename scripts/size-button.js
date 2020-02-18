
import elementString from '../static/views/size_button.html'
import styleClasses from 'Styles/size_button.css'
import Button from 'Base/button.js'
import eventEmitter from 'Singletons/event-emitter.js'


class SizeButton extends Button
{
  constructor() {
    super(elementString);
    this.render = this.render.bind(this)
    this.name = "JI";
    this.onClick = this.onClick.bind(this);
  }


  didAttach(parent) {
    super.didAttach(parent);
  }

  render() {
    this.child_views.forEach(c => c.render());
    this.element.classList.add(styleClasses.size_button)  
    return this.element;
  }

  onClick(e) {
    eventEmitter.emit("increase_size")
  }



}

export default SizeButton;
