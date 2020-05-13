import Button from 'Base/button.js';
import eventEmitter from 'Singletons/event-emitter.js';
import style from 'Styles/style.css';

class SaveButton extends Button {
    constructor() {
        super();
        this.setHtml(
            '<button type="button" class="btn" id="saveChart" style="background-color:var(--button-color); width:40%; name="button">Save</button>',
        );
        this.render = this.render.bind(this);
        this.name = 'Save';
        this.onClick = this.onClick.bind(this);
        this.element.classList.add(style.buttonVisual);
    }

    didAttach(parent) {
        super.didAttach(parent);
    }

    render() {
        this.child_views.forEach((c) => c.render());
        return this.element;
    }

    onClick(e) {
        eventEmitter.emit('save');
    }
}

export default SaveButton;
