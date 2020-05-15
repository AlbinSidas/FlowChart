import styleClasses from 'Styles/toolbox.css';
import Button from 'Base/button.js';
import View, { InlineClickableView, InlineView } from 'Base/view.js';
import eventEmitter from 'Singletons/event-emitter.js';
import SaveButton from './save-button';
import style from 'Styles/style.css';

class Toolbox extends View {
    constructor(boxEventhandlerDelegate) {
        super();
        this.boxEventhandlerDelegate = boxEventhandlerDelegate;
        this.setHtml('<div></div>');
        this.element.setAttribute('id', 'toolbox');
        let verList = [];
    }

    didAttach(parent) {
        super.didAttach(parent);
        //Load
        this.loadButton = InlineClickableView(
            '<button type="button" class="btn" id="loadChart" style="background-color:var(--button-color); margin:5%; margin-right:10%; width:40%;" name="button">Load</button>',
            this.boxEventhandlerDelegate.loadFlow,
        ); //new LoadButton();
        this.attach(this.loadButton);
        this.loadButton.element.classList.add(style.buttonVisual);
        //Save
        this.saveButton = new SaveButton();
        this.attach(this.saveButton);
        //Version
        this.decreaseVerBtn = InlineClickableView(
            '<button type="button" class="btn" style="background-color:var(--verbutton-color); margin:5%; float:left; width:5%;" name="button"><</button>',
            this.boxEventhandlerDelegate.decVer,
        );
        this.attach(this.decreaseVerBtn);
        this.decreaseVerBtn.element.classList.add(style.buttonVisual);

        this.verCounter = InlineView(
            '<button class="btn" style="background-color:var(--button-color); margin-top:5%; margin-right:5%; width:57%; float:left; text-align:center;" id="vercounter">0</button>',
        );
        this.attach(this.verCounter);

        this.increaseVerBtn = InlineClickableView(
            '<button type="button" class="btn" style="background-color:var(--verbutton-color); margin-top:5%; width:5%; float:left;" name="button">></button>',
            this.boxEventhandlerDelegate.incVer,
        );
        this.attach(this.increaseVerBtn);
        this.increaseVerBtn.element.classList.add(style.buttonVisual);
        //Vertical
        this.increaseSizeBtn = new IncreaseSizeButton();
        this.attach(this.increaseSizeBtn);
        this.decreaseSizeBtn = new DecreaseSizeButton();
        this.attach(this.decreaseSizeBtn);
        //Horizontal
        this.increaseHorizontalSizeBtn = new IncreaseHorizontalSizeButton();
        this.attach(this.increaseHorizontalSizeBtn);
        this.decreaseHorizontalSizeBtn = new DecreaseHorizontalSizeButton();
        this.attach(this.decreaseHorizontalSizeBtn);
    }
    show() {
        this.element.setAttribute('style', 'visibility:visible');
        document.getElementById(
            'vercounter',
        ).innerHTML = this.boxEventhandlerDelegate.currentFlowchartVer;
    }

    hide() {
        this.element.setAttribute('style', 'visibility:hidden');
    }

    render() {
        this.child_views.forEach((c) => c.render());
        this.element.classList.add(styleClasses.tool_box);
        return this.element;
    }
}

class IncreaseSizeButton extends Button {
    constructor() {
        super();
        this.setHtml(
            '<button type="button" class="btn" name="button" id="increase-vertical">Increase Height</button>',
        );
        this.element.setAttribute(
            'style',
            'background-color:var(--button-color); width:90%; margin-top:15%; margin-left: 5%',
        );
        this.render = this.render.bind(this);
        this.onClick = this.onClick.bind(this);
        this.element.classList.add(style.buttonVisual);
    }

    onClick(e) {
        eventEmitter.emit('increaseSize');
    }
}

class DecreaseSizeButton extends Button {
    constructor() {
        super();
        this.setHtml(
            '<button type="button" class="btn" name="decrease_button" id="decrease-vertical">Decrease Height</button>',
        );
        this.element.setAttribute(
            'style',
            'background-color:var(--button-color); width:90%; margin-top:5%; margin-left: 5%',
        );
        this.render = this.render.bind(this);
        this.onClick = this.onClick.bind(this);
        this.element.classList.add(style.buttonVisual);
    }

    onClick(e) {
        eventEmitter.emit('decreaseSize');
    }
}

class IncreaseHorizontalSizeButton extends Button {
    constructor() {
        super();
        this.setHtml(
            '<button type="button" class="btn" name="button_horizontal" id="increase-horizontal">Increase Width</button>',
        );
        this.element.setAttribute(
            'style',
            'background-color:var(--button-color); width:90%; margin-top:5%; margin-left: 5%',
        );
        this.render = this.render.bind(this);
        this.onClick = this.onClick.bind(this);
        this.element.classList.add(style.buttonVisual);
    }

    onClick(e) {
        eventEmitter.emit('increaseSizeHorizontal');
    }
}

class DecreaseHorizontalSizeButton extends Button {
    constructor() {
        super();
        this.setHtml(
            '<button type="button" class="btn" name="decrease_button_horizontal" id="decrease-horizontal">Decrease Width</button>',
        );
        this.element.setAttribute(
            'style',
            'background-color:var(--button-color); width:90%; margin-top:5%; margin-left: 5%; margin-bottom: 5%',
        );
        this.render = this.render.bind(this);
        this.onClick = this.onClick.bind(this);
        this.element.classList.add(style.buttonVisual);
    }

    onClick(e) {
        eventEmitter.emit('decreaseSizeHorizonal');
    }
}

export default Toolbox;
