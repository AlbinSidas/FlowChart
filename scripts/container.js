import SizeButton from './size-button'
import View from './view.js'

class Container extends View {
    constructor(htmlElement, ee) {
        super(htmlElement)
        this.eventEmitter = ee;
        this.onClick = this.onClick.bind(this);

        this.onKeyPress = this.onKeyPress.bind(this);
        this.height = 3000;//window.innerHeight;
        this.htmlElement = htmlElement;
        this.childScrolled = this.childScrolled.bind(this)

        this.htmlElement.onkeydown = this.onKeyPress;
        this.htmlElement.onclick = this.onClick;
        
        const apa = new SizeButton();
        console.log("APA", apa)
        this.addChildView(apa);
    }


    onClick(e) {
        //console.log("Klick på container med print i containerobjekt")
        this.eventEmitter.emit("clickedWorkspace", e);
    }


    onKeyPress(e){

      if(e.ctrlKey){
        if(e.keyCode == 67){
          this.eventEmitter.emit("copy");
        }
        else if(e.which == 86){
          this.eventEmitter.emit("paste");
        }

      }
    }


    render() {
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
