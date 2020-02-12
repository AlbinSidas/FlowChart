class Root {
    constructor(base) {
        this.root = document.querySelector('#container-root');
        const element = base.render();
        this.root.appendChild(element);
        base.didAttach(this);
    }
}


export default Root;