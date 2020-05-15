// functionVariables an array with objects of functionVariable class that owns a special class feature
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
