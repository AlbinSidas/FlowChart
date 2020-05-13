class FunctionVariable {
    constructor(name, type, value, extra = {}) {
        this.name = name; // exempel potatis
        this.type = type; // exempel output
        this.value = value; // sake Martin fyller
        this.extra = extra; // saker som gör den här typen har unikit
    }
}
export default FunctionVariable;
