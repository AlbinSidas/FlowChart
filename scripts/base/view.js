
class View {

  constructor(tagString) {
    var range = document.createRange();
    console.log(tagString)
    
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

}
export default View;
