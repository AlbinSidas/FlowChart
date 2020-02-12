import SizeButton from './size-button'

class Container {
    constructor(htmlElement, ee) {
        this.eventEmitter = ee;
        this.onClick = this.onClick.bind(this);

        this.height = 3000;//window.innerHeight;
        this.htmlElement = htmlElement;
        this.childScrolled = this.childScrolled.bind(this)
        this.htmlElement.onclick = this.onClick;
        this.child_views = []
        const apa = new SizeButton();
        console.log("APA", apa)
        this.addChildView(apa);
    }

    addChildView(view) {
        this.child_views.push(view)
        this.htmlElement.appendChild(view.element)
    }

    onClick(e) {
        //console.log("Klick på container med print i containerobjekt")
        this.eventEmitter.emit("clickedWorkspace", e);
    }

    rerender() {
        this.child_views.forEach(c => c.render());
        this.setHeight(this.height)
        return this.htmlElement;
    }

    increaseSize() {
        console.log("INCREASING SIZE")
        this.setHeight(this.height + 200)
    }

    setHeight(height) {
        this.height = height;
        this.htmlElement.style.height = `${height}px`
    }

    addBox(box) {
        this.htmlElement.appendChild(box.render());
        box.onScrolled(this.childScrolled)
    }

    childScrolled(posY, height) {
        if((posY + height) >= this.height) {
            this.increaseSize();
        }
    }

}

export default Container;
