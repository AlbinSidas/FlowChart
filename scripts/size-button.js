
import styleClasses from 'Styles/size_button.css'
import Button from 'Base/button.js'
import View from 'Base/view.js'
import eventEmitter from 'Singletons/event-emitter.js'


class SizeButtons extends View
{
  constructor(){
    super('<div></div>');
  }

  didAttach(parent) {
    super.didAttach(parent);
    //Vertical
    this.increase_size_btn = new IncreaseSizeButton();
    this.attach(this.increase_size_btn);
    this.decrease_size_btn = new DecreaseSizeButton();
    this.attach(this.decrease_size_btn);
    //Horizontal
    this.increase_horizontal_size_btn = new IncreaseHorizontalSizeButton();
    this.attach(this.increase_horizontal_size_btn);
    this.decrease_horizontal_size_btn = new DecreaseHorizontalSizeButton();
    this.attach(this.decrease_horizontal_size_btn);

  }

  render() {
    this.child_views.forEach(c => c.render());
    this.element.classList.add(styleClasses.size_button);
    return this.element;
  }

}

class IncreaseSizeButton extends Button {
  constructor() {
      super('<button type="button" name="button">Increase</button>');

      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
    }


  onClick(e) {
    eventEmitter.emit('increase_size');
  }
}

class DecreaseSizeButton extends Button {
  constructor() {
    super('<button type="button" name="decrease_button">Decrease</button>');

    this.render = this.render.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    eventEmitter.emit('decrease_size');
  }
}

class IncreaseHorizontalSizeButton extends Button {
  constructor() {
      super('<button type="button" name="button_horizontal">Increase Width</button>');

      this.render = this.render.bind(this);
      this.onClick = this.onClick.bind(this);
    }


  onClick(e) {
    eventEmitter.emit('increase_size_horizontal');
  }
}

class DecreaseHorizontalSizeButton extends Button {
  constructor() {
    super('<button type="button" name="decrease_button_horizontal">Decrease Width</button>');

    this.render = this.render.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    eventEmitter.emit('decrease_size_horizonal');
  }
}


export default SizeButtons;
