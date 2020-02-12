
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

  render() {
    return this.element;
  }

  addChildView(view) {
      this.child_views.push(view)
      this.htmlElement.appendChild(view.element)
  }


}
export default View;
