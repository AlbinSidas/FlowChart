import { AssertionError } from "assert";
import { ServerResponse } from "http";
import FunctionDefinition from "../model/function-definition";

/*
    Ha transformationer av response data från server till 
    model data som frontend vill här, vi slipper hålla 
    på med ändring av key namn innut kode :)

    En transformer brukar säga:
        Hej, jag kan omvandla server gibberish till client data
        som alltid makear sense
*/

class TransformerInterface {
    resObject() { throw new Error("NOT IMPLEMENTED vad gör du??!"); } // virtual 
    resArray() { throw new Error("NOT IMPLEMENTED vad gör du??!"); } // virtual    

}

export class FlowchartTransformer extends TransformerInterface {
    resObject(serverResponse) {
        return serverResponse.data;
    }

    resArray(serverResponse) {
        return serverResponse;
    }
    
    findVerNumbers(serverResponse){
        return serverResponse.data;
    }
}

export class FuncDefTransformer extends TransformerInterface {
    resObject(serverResponse) {
        const data = serverResponse.data
        return new FunctionDefinition(data.funcdef_id, data.name, data.description, data.versionNumber, data.functionVariables);
    }

    resArray(serverResponse) {
        const data = serverResponse.data
        return data.map(d => new FunctionDefinition(d.funcdef_id, d.name, d.description, d.versionNumber, d.functionVariables));
    }    
}