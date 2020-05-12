import FunctionDefinition from "../model/function-definition";
import { FuncDefTransformer, FlowchartTransformer } from "./transformer";

class Network {
    constructor(destination, apiRoute, transformerInterface) {
        this.host = destination.host;
        this.port = destination.port;
        this.transformerInterface = transformerInterface;
        this.apiRoute = apiRoute
        this.baseURL = `http://${this.host}:${this.port}/${this.apiRoute}`
    }

    async save(obj) {
        return fetch(`${this.baseURL}/save`, 
        {
            method:   'POST',
            headers:  {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then((response) => response.json())
        .then(data => {
            // Confirm save
            console.log("success", data);
            return this.transformerInterface.resObject(data);

        }).catch((error) => {
            // Handle error
            console.log("Fail", error);
        });

      // Konfirmation that object was saved
      
      // Kolla på fetch för PUT för att skicka med objektet till backend 
    }

    async saveVersion(obj) {

        return fetch(`${this.baseURL}/version/add`, 
        {
            method:   'POST',
            headers:  {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then((response) => response.json())
        .then(data => {
            // Confirm save
            console.log("success", data);
            return this.transformerInterface.resObject(data);

        }).catch((error) => {
            // Handle error
            console.log("Fail", error);
        });
    }

    async getAll() {
        const data = await fetch(`${this.baseURL}/all`).then(res  => res.json())
        return this.transformerInterface.resArray(data);
    }

    async getById(id) {
        const data = await fetch(`${this.baseURL}/${id}`).then(res  => res.json());
        return this.transformerInterface.resObject(data);
    }

}

class FuncDefAPI extends Network {
    constructor(destination, apiRoute) {
        super(destination, apiRoute, new FuncDefTransformer())
    }

    async getVersion(id, version) {
        const data = await fetch(`${this.baseURL}/${id}/${version}`).then(res  => res.json());
        return this.transformerInterface.resObject(data);
    }
}

class FlowchartAPI extends Network {
    constructor(destination, apiRoute) {
        super(destination, apiRoute, new FlowchartTransformer())
    }
    
    async getVerNums(id){
        const data = await fetch(`${this.baseURL}/version/snapshot/${id}`).then(res  => res.json());
        return this.transformerInterface.findVerNumbers(data, id);
    }
    async getFlowVersion(id, ver){
        const data = await fetch(`${this.baseURL}/${id}/${ver}`).then(res  => res.json());
        return this.transformerInterface.resObject(data);
    }

    async getNameList() {
        try {
            const data = await fetch(`${this.baseURL}/view`)
                .then(res  => res.json())
                .then(res => res.data)
            return data;
        } 
        catch(e) {
            console.log("Could not fetch the name list ", e);
        }                               
        return null;
    }
}


const defaultDestination = {
    host: 'localhost',
    port: '3000'
}

const funcDefAPI   = new FuncDefAPI(defaultDestination,   'funcdef');
const flowchartAPI = new FlowchartAPI(defaultDestination, 'flowchart');

// class .... Samma sak för andra generella saker som funcDef, antar FlowChart 
// ... Fyll i
// ... Fyll i


export default { funcDefAPI, flowchartAPI }
