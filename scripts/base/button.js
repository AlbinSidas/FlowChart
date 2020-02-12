import View from 'Base/view.js';

class Button extends View {
    constructor(tagString) { 
        super(tagString)
        console.log("element does not exsits", this.element)
        //this.addEventListener("click", this.onClick);
    }

    didAttach(parent) {
        super.didAttach(parent)
        this.element.onclick = this.onClick
    }

    onClick(e) {

    }
}

export default Button