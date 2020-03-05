
class FunctionVariable {
    constructor(name, type, value, extra ={}){
        this.name = name;    // potatis
        this.type = type;    // output
        this.value = value;  // han fyller
        this.extra = extra;  // saker som den här typen har unikit
    }
}
export default FunctionVariable;