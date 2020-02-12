
import SizeButton from './size-button.js'
import FlowchartNode from "./flowchart-node";
const uuidv1 = require('uuid/v1');
import Modal from './modal.js'
import View from 'Base/view.js'
import elementString from 'Views/container.html'
import eventEmitter from 'Singletons/event-emitter.js'

class Container extends View {
    constructor(ee) {
        super(elementString)
        this.onClick = this.onClick.bind(this);

        this.onKeyPress = this.onKeyPress.bind(this);
        this.height = 3000;//window.innerHeight;
        //this.htmlElement = htmlElement;
        this.childScrolled = this.childScrolled.bind(this)

 
        
        this.modal = new Modal();
      

        this.objects = [];
        this.markedObject = null;
        this.objectClick = {};
        this.copyObject = {};
        this.mouseX = 0;
        this.mouseY = 0;

        // Lägg dessa lyssnare i ett objekt eller i en egen funktion ?
        ee.on("clicked", (id, e) => {
            /*
                Set the mouseevent to objectClick to compare the
                event on workspace to determine if it's a "mark off" or click on object.
            */
           
            console.log("KLICK")
            this.objectClick = e;
            // Finds the correct node in the created nodes.
            let obj = this.objects.find((obj) => {
                return obj.id == id;
            });

            // If the click is on the marked object it's a doubleclick and will open the modal.
            if (obj == this.markedObject) {
                // Prevents further draging after doubleclick.
                obj.closeDragElement();
                this.modal.show(obj);

                window.onclick = function(event) {
                    if (event.target == this.modal.element) {
                        this.modal.element.style.display = "none";
                    }
                }
            } else {
                if (this.markedObject != null) {
                    this.removeMarked();
                }
                this.markedObject = obj;
            }
        })
        this.element.onkeydown = this.onKeyPress;
    }

    didAttach(parent) {
        const apa = new SizeButton();
        this.attach(apa) // addChildView istället

        this.addChildView(this.modal)
        eventEmitter.on('increase_size', () =>  {
            console.log("APAAAAAA")
            this.increaseSize()
        })
        this.element.onclick = this.onClick;
        //this.addChildView(apa);
    }

    onClick(e) {
        console.log("_ONKEYDOWN",this.element.onkeydown);
        if ((e.clientX != this.objectClick.clientX || e.clientY != this.objectClick.clientY) && this.markedObject != null) {
            this.removeMarked();
        }
    }

    removeMarked() {
        let css = document.getElementById(this.markedObject.id).style.cssText;
        css = css.split(" box-shadow")[0];
        document.getElementById(this.markedObject.id).style.cssText = css;
        this.markedObject = null;
    }


    onKeyPress(e){
        console.log("haha");
        if(e.ctrlKey){
            if(e.keyCode == 67){
            if (this.markedObject != null) {
                // Create a copy without a reference to the original object.
                document.addEventListener('mousemove', (e) => { this.mouseX = e.clientX; this.mouseY = e.clientY});
                this.copyObject = new FlowchartNode(uuidv1(), this.eventEmitter);
                this.copyObject.copyOther(this.markedObject, this.mouseX, this.mouseY);
            }
            }
            else if(e.which == 86){
            if (this.copyObject != null) {
                
                let pasteObject = new FlowchartNode(uuidv1(), this.eventEmitter);
                pasteObject.copyOther(this.copyObject, this.mouseX, this.mouseY);
                this.objects.push(pasteObject);
                //workspaceObject.addBox(pasteObject);

                this.addBox(pasteObject);
            }
            }

        }
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
        this.element.style.height = `${height}px`
        //this.htmlElement.style.height = `${height}px`
    }

    addBox(box) {
        this.objects.push(box);
        //console.log("added")
        //this.htmlElement.appendChild(box.render());
        this.attach(box)
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
