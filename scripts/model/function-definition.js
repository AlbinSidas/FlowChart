

// functionVariables  en array med object av functionVariable som är en basklass eller en vanlig klass som äger en special feature klass 
class FunctionDefinition
{
    constructor(name, description, functionVariables) {
        this.name              = name;
        this.description       = description;
        this.functionVariables = functionVariables;
    }
}

export default FunctionDefinition;