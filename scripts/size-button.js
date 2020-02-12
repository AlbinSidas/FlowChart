
import elementString from '../static/views/size_button.html'
import elementStyle from '../static/styling/size_button.css'
import View from './view.js'
class SizeButton extends View
{
  constructor() {

    super(elementString);
    console.log("Element",this.element)
    elementStyle.use();
    console.log(elementStyle)
    this.render = this.render.bind(this)
  }


  render() {
    this.child_views.forEach(c => c.render());
    this.element.setAttribute('style', `position: fixed; width:100px; height: 100px;`);
    return this.element;
  }


}

export default SizeButton;
