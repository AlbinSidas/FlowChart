class Network {
    constructor(destination, apiRoute) {
        this.host = destination.host;
        this.port = destination.port
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
            return data;

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
        }).then((response) => response.json())
        .then(data => {
            // Confirm save
            console.log("success", data);
            return data;

        }).catch((error) => {
            // Handle error
            console.log("Fail", error);
        });
    }

    async getAll() {
        const data = await fetch(`${this.baseURL}/all`).then(res  => res.json())
                                                       .then(res => res.data)
        return data;
    }

    async getById(id) {
        const data = await fetch(`${this.baseURL}/${id}`).then(res  => res.json())
                                                         .then(res => res.data);
        return data;
    }

}

class FuncDefAPI extends Network {
    constructor(destination, apiRoute) {
        super(destination, apiRoute)
    }

    async getVersion(id, version) {
        const data = await fetch(`${this.baseURL}/${id}/${version}`).then(res  => res.json())
                                                         .then(res => res.data)
        return data;
    }
}

class FlowchartAPI extends Network {
    constructor(destination, apiRoute) {
        super(destination, apiRoute)
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
