
class View {

  constructor(tagString) {
    var range = document.createRange();
<<<<<<< HEAD
=======
    //console.log(tagString)
>>>>>>> master
    
    // Make the parent of the first div in the document becomes the context node
    range.selectNode(document.getElementById("context"));
    var documentFragment = range.createContextualFragment(tagString);
    this.element = documentFragment.childNodes[0];
    this.child_views = []
  }

  didAttach(parent) {

  }

  render() {
    return this.element;
  }

  attach(child) {
    this.child_views.push(child)
    this.element.appendChild(child.render());
    child.didAttach(this)
  }
  
  // Används denna funktionen någonstans?
  addChildView(child) {
      this.child_views.push(child)
      this.element.appendChild(child.render())
  }

  addStyle(className) {
    this.element.classList.append(className)
  }

  getPosY() {
    return parseInt(window.getComputedStyle(this.element).getPropertyValue('top'))
  }
  getPosYFromBottom() {
    return parseInt(window.getComputedStyle(this.element).getPropertyValue('bottom'))
  }

  getPosX(){
    return parseInt(window.getComputedStyle(this.element).getPropertyValue('left'))
  }

  getWidth() {
    return this.element.offsetWidth
  }

  getHeight() {
    return this.element.offsetHeight
  }
}
export default View;
