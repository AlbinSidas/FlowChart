import SizeButton from './size-button'
import View from 'Base/view.js'
import elementString from 'Views/container.html'

class Container extends View {
    constructor(ee) {
        super(elementString)
        this.eventEmitter = ee;
        this.onClick = this.onClick.bind(this);
        console.log("!C",elementString)
        this.height = 3000;//window.innerHeight;
        //this.htmlElement = htmlElement;
        this.childScrolled = this.childScrolled.bind(this)
        //this.htmlElement.onclick = this.onClick;
        
       
        //console.log("APA", apa)
        
    }

    didAttach(parent) {
        const apa = new SizeButton();
        this.attach(apa) // addChildView istället
        //this.addChildView(apa);
    }

    onClick(e) {
        //console.log("Klick på container med print i containerobjekt")
        this.eventEmitter.emit("clickedWorkspace", e);
    }

    render() {
        this.child_views.forEach(c => c.render());
        this.setHeight(this.height)
        return this.element;
    }

    increaseSize() {
        console.log("INCREASING SIZE")
        this.setHeight(this.height + 200)
    }

    setHeight(height) {
        this.height = height;
        //this.htmlElement.style.height = `${height}px`
    }

    addBox(box) {
        //this.htmlElement.appendChild(box.render());
        box.onScrolled(this.childScrolled)
    }

    childScrolled(posY, height) {
        if((posY + height) >= this.height) {
            this.increaseSize();
        }
    }

}

export default Container;
