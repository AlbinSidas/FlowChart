

// functionVariables  en array med object av functionVariable som är en basklass eller en vanlig klass som äger en special feature klass 
class FunctionDefinition
{
    constructor(id, name, description, functionVariables) {
        this.id                = id;
        this.name              = name;
        this.description       = description;
        this.functionVariables = functionVariables;
        this.version           = 1;
    }
    
    static CreateLocal(name, description, functionVariable) {
        return new FunctionDefinition(null, name, description, functionVariable)
    }
}

export default FunctionDefinition;