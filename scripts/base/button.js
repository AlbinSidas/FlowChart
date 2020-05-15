import View from 'Base/view.js';

class Button extends View {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    didAttach(parent) {
        super.didAttach(parent);
        this.element.onclick = this.onClick;
    }

    onClick(e) {}
}

export default Button;
