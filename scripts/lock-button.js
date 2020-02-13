
import elementString from '../static/views/lock-button.html'
import styleClasses from 'Styles/size_button.css'
import Button from 'Base/button.js'
import eventEmitter from 'Singletons/event-emitter.js'


class LockButton extends Button
{
  constructor() {
    super(elementString);
    this.render = this.render.bind(this)
    this.name = "Lock"
    this.locked = true;
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
    console.log("I AM CLICKED" + this.name)
    if(this.locked == true){
        this.locked = false;
        eventEmitter.emit("unlock")
    }
    else if(this.locked == false){
        this.locked = true;
        eventEmitter.emit("lock")
    }
    else{
        console.log("error");
    }
    
  }



}

export default LockButton;
