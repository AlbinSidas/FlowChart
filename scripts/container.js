class Container {
    constructor(htmlElement) {
        this.height = window.innerHeight;
        this.htmlElement = htmlElement;
        this.childScrolled = this.childScrolled.bind(this)
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