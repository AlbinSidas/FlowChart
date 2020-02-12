
class View {

  constructor(tagString) {
    var range = document.createRange();
    console.log(tagString)
    // Make the parent of the first div in the document becomes the context node
    range.selectNode(document.getElementById("context"));
    var documentFragment = range.createContextualFragment(tagString);
    this.element = documentFragment.childNodes[0];
  }

  render() {

  }


}
export default View;
