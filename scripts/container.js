class Container {
    constructor(htmlElement, ee) {
        this.eventEmitter = ee;
        this.onClick = this.onClick.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);

        this.height = window.innerHeight;
        this.htmlElement = htmlElement;
        this.childScrolled = this.childScrolled.bind(this)

        this.htmlElement.onkeypress = this.onKeyPress;
        this.htmlElement.onclick = this.onClick;

    }

    onClick(e) {
        //console.log("Klick på container med print i containerobjekt")
        this.eventEmitter.emit("clickedWorkspace", e);
    }

    onKeyPress(e){
      console.log(e)
      //if(e.ctrlKey){

        if(e.keyCode == 99){
          console.log("kopierad");
          this.eventEmitter.emit("copy");
        }
        else if(e.which == 118){
          console.log("inklistrad");
          this.eventEmitter.emit("paste");
        }

      //}
    }

    rerender() {
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

        console.log("i addbox: ", box);
        //console.log("Innan:",this.htmlElement)
        /*
        let promise = new Promise(function(resolve, rej) {
          resolve(box.render())
        }).then((ele) => {
            this.htmlElement.appendChild(box.render());
        })
        */
        this.htmlElement.appendChild(box.render());

        /*
        box.render().then((ele) => {
            this.htmlElement.appendChild(ele);
        })
        */
        console.log("efter",this.htmlElement)
        //box.onScrolled(this.childScrolled)
    }

    childScrolled(posY, height) {
        if((posY + height) >= this.height) {
            this.increaseSize();
        }
    }

}

export default Container;
