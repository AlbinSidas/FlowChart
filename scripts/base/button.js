import View from 'Base/view.js';

class Button extends View {
    constructor(tagString) { 
        super(tagString)
    }

    didAttach(parent) {
        super.didAttach(parent)
        this.element.onclick = this.onClick
    }

    onClick(e) {

    }
}

export default Button