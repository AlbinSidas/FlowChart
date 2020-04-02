class Network {
    constructor(host, port, apiRoute) {
        this.host = host;
        this.port = port;
        this.apiRoute = apiRoute
        this.baseURL = `http://${this.host}:${this.port}/${this.apiRoute}`
    }

    async save(obj) {
        console.log("OBJ", obj)
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
        console.log("Save object to update Version", obj)
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
    }

    async getAll() {
        const data = await fetch(`${this.baseURL}/all`).then(res  => res.json())
                                                                        .then(res => res.data)
        return data;
    }

    async getById(id) {
        const data = await fetch(`${this.baseURL}/${id}`).then(res  => res.json())
                                                         .then(res => res.data)
        return data;
    }

    async getNameList() {
        const data = await fetch(`${this.baseURL}/view`).then(res  => res.json())
                                                                        .then(res => res.data)
        return data;
    }
}

class FuncDefAPI extends Network {
    constructor(host, port, apiRoute) {
        super(host, port, apiRoute)
    }


}

class FlowchartAPI extends Network {
    constructor(host, port, apiRoute) {
        super(host, port, apiRoute)
    }

}
class NodeAPI extends Network {
    constructor(host, port, apiRoute) {
        super(host, port, apiRoute)
    }


}



const funcDefAPI   = new FuncDefAPI('localhost', '3000', 'funcdef')
const flowchartAPI = new FlowchartAPI('localhost', '3000', 'flowchart')
const nodeAPI      = new NodeAPI('localhost', '3000', 'node')

// class .... Samma sak för andra generella saker som funcDef, antar FlowChart 
// ... Fyll i
// ... Fyll i


export default { funcDefAPI, flowchartAPI }
