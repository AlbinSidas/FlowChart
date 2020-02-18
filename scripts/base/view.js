
class View {

  constructor(tagString) {
    var range = document.createRange();
    console.log(tagString)
    
    // Make the parent of the first div in the document becomes the context node
    range.selectNode(document.getElementById("context"));
    var documentFragment = range.createContextualFragment(tagString);
    console.log(documentFragment)
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
    //console.log("Innan append child i View")
    this.element.appendChild(child.render());

    //console.log("efter append child i View")
    child.didAttach(this)
  }
  /*
  addChildView(child) {
      this.child_views.push(child)
      this.element.appendChild(child.render())
  }
  */

}
export default View;
