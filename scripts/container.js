import SizeButton from './size-button.js'
import FlowchartNode from "./flowchart-node";
const uuidv1 = require('uuid/v1');
import Modal from './modal.js'
import View from './view.js'

class Container extends View {
    constructor(htmlElement, ee) {
        super(htmlElement)
        this.eventEmitter = ee;
        this.eventEmitter.container = this;
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

        const modal = new Modal();
        console.log("Modal", modal)
        this.addChildView(modal)

        this.objects = [];
        this.markedObject = null;
        this.objectClick = {};
        this.copyObject = {};

        // Lägg dessa lyssnare i ett objekt eller i en egen funktion
        this.eventEmitter.on("clicked", function(id, e) {
            /*
                Set the mouseevent to objectClick to compare the
                event on workspace to determine if it's a "mark off" or click on object.
            */
           
            console.log("KLICK")
            this.container.objectClick = e;
            // Finds the correct node in the created nodes.
            let obj = this.container.objects.find((obj) => {
                return obj.id == id;
            });


            // If the click is on the marked object it's a doubleclick and will open the modal.
            if (obj == this.container.markedObject) {
                console.log("Open modal", modal);
                // Prevents further draging after doubleclick.
                obj.closeDragElement();
                console.log(this.container)
                modal.show(obj);
                //let modal = document.getElementById("modal");
                //modal.style.display = "block";
                //console.log(this.container.modal)
                //render().style.display = "block";

                /*let children = modal.childNodes;
                let modalTitle = children[1];
                let modalContent = children[3];
                let modalFooter = children[5];
                */
                //addContentToModal(modalTitle, modalContent, modalFooter, obj);
                console.log(window)
                window.onclick = function(event) {
                    if (event.target == modal.element) {
                        modal.element.style.display = "none";
                        //this.container.modal.close();
                    }
                }
            } else {
                if (this.container.markedObject != null) {
                    this.container.removeMarked();
                }
                this.container.markedObject = obj;
            }
        })
    }


    onClick(e) {
        console.log("Klick på container med print i containerobjekt")
        //this.eventEmitter.emit("clickedWorkspace", e);
        //console.log("");
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

      if(e.ctrlKey){

        if(e.keyCode == 67){
          //this.eventEmitter.emit("copy");
          if (this.markedObject != null) {
            // Create a copy without a reference to the original object.
            this.copyObject = new FlowchartNode(uuidv1(), this.eventEmitter);
            this.copyObject.copyOther(this.markedObject);
          }
        }
        else if(e.which == 86){
          //this.eventEmitter.emit("paste");
          if (this.copyObject != null) {
            // Paste the copied object
            console.log(this.copyObject);
            console.log(this)

            //this.objects.push(this.copyObject);
            //this.objectIds.push(this.copyObject.id);
            this.addBox(this.copyObject);
          }
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
        this.objects.push(box);
        console.log("added")
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
