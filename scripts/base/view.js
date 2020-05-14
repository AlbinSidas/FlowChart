import eventEmitter from 'Singletons/event-emitter.js';
function _html(tagString) {
    var range = document.createRange();
    // Make the parent of the first div in the document becomes the context node
    range.selectNode(document.getElementById('context'));
    var documentFragment = range.createContextualFragment(tagString);
    const element = documentFragment.childNodes[0];
    return element;
}

function ViewInterface(object) {
    return {
        render: function () {
            return object.element;
        },
        setHtml: function (template) {
            object.element = _html(template);
        },
        setElement: function (element) {
            object.element = element;
        },
        didAttach: function (parent) {},
        changeHtml: function (template) {
            if (!object.element) {
                throw 'Whoops no element';
            }
            object.element.innerHTML = template;
        },
        enable: function (bool = true) {
            this.element.disabled = !bool;
        },
    };
}

export function InlineView(elementString) {
    const object = {
        element: _html(elementString),
    };
    return Object.assign(object, ViewInterface(object));
}

export function InlineClickableView(elementString, clickCb) {
    const object = {
        element: _html(elementString),
    };
    object.element.onclick = clickCb;
    return Object.assign(object, ViewInterface(object));
}

export function InlineClickableViewBinding(element, eventName, styleClass, cb) {
    const object = {
        element: element,
    };
    if (styleClass) {
        object.element.classList.add(styleClass);
    }
    object.element.onclick = (e) => {
        if (cb) {
            cb(e);
        }
        if (eventName) {
            eventEmitter.emit(eventName);
        }
    };

    return Object.assign(object, ViewInterface(object));
}

class View {
    constructor() {
        this.child_views = [];
        this.element = null;
        Object.assign(ViewInterface(this), this);
        this.render = this.render.bind(this);
    }

    didAttach(parent) {}

    render() {
        return this.element;
    }

    setHtml(tagString) {
        const element = _html(tagString);
        this.element = element;
    }

    attach(child) {
        this.child_views.push(child);
        this.element.appendChild(child.render());
        child.didAttach(this);
    }

    addStyle(className) {
        this.element.classList.append(className);
    }

    getPosY() {
        return parseInt(
            window.getComputedStyle(this.element).getPropertyValue('top'),
        );
    }
    getPosYFromBottom() {
        return parseInt(
            window.getComputedStyle(this.element).getPropertyValue('bottom'),
        );
    }

    getPosX() {
        return parseInt(
            window.getComputedStyle(this.element).getPropertyValue('left'),
        );
    }

    getWidth() {
        return this.element.offsetWidth;
    }

    getHeight() {
        return this.element.offsetHeight;
    }
}

export default View;
