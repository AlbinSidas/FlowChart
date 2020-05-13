// functionVariables  en array med object av functionVariable som är en basklass eller en vanlig klass som äger en special feature klass
class FunctionDefinition {
    constructor(id, name, description, versionNumber, functionVariables) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.versionNumber = versionNumber;
        this.functionVariables = functionVariables;
    }

    static CreateLocal(name, description, functionVariable) {
        return new FunctionDefinition(
            null,
            name,
            description,
            null,
            functionVariable,
        );
    }
}

export default FunctionDefinition;
