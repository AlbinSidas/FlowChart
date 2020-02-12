
import elementString from '../static/views/size_button.html'
import elementStyle from '../static/styling/size_button.css'
import Button from 'Base/button.js'

class SizeButton extends Button
{
  constructor() {
    super(elementString);
    console.log("Element",this.element)
    console.log(elementStyle)
    this.render = this.render.bind(this)
    this.name = "JI"
    this.onClick = this.onClick.bind(this);
  }


  didAttach(parent) {
    super.didAttach(parent);
  }

  render() {
    this.child_views.forEach(c => c.render());
    this.element.setAttribute('style', `position: fixed; width:100px; height: 100px;`);
    return this.element;
  }

  onClick(e) {
    console.log("I AM CLICKED" + this.name)
  }



}

export default SizeButton;
