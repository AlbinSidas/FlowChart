class Network {
    constructor(host, port, apiRoute) {
        this.host = host;
        this.port = port;
        this.apiRoute = apiRoute
        this.baseURL = `http://${this.host}:${this.port}/${this.apiRoute}`
    }

    async save(obj) {
        console.log("OBJ", obj)
        fetch(`${this.baseURL}/save`, 
        {
            method:   'POST',
            headers:  {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then((response) => {
            // Confirm save
            console.log("success", response.json().data);
            
        }).catch((error) => {
            // Handle error
            console.log("Fail", error);
        });

      // Konfirmation that object was saved
      
      // Kolla på fetch för PUT för att skicka med objektet till backend 
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

//     async updateVariableTemplate(nodeId, variables) {
//         return fetch(`${this.baseURL}/variables/${nodeId}`, 
//         {
//             method:   'PUT',
//             headers:  {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(variables)
//         }).then(response => response.json())
//           .then(response => response.data)
//           .catch((error) => {
//             // Handle error
//             console.log("Fail", error);
//         });
//     } 

//    async getVariables(nodeId) {
//        return fetch(`${this.baseURL}/variables/${nodeId}`, 
//         {
//             method:   'GET',
//             headers:  {
//                 'Content-Type': 'application/json'
//             }
//         }).then((response) => {
//             // Confirm save
//             console.log("success", response.json().data);
            
//         }).catch((error) => {
//             // Handle error
//             console.log("Fail", error);
//         });
//     }
}



const funcDefAPI   = new FuncDefAPI('localhost', '3000', 'funcdef')
const flowchartAPI = new FlowchartAPI('localhost', '3000', 'flowchart')
const nodeAPI      = new NodeAPI('localhost', '3000', 'node')

// class .... Samma sak för andra generella saker som funcDef, antar FlowChart 
// ... Fyll i
// ... Fyll i



    //   console.log("Spara ner all data på ett snyggt sätt och skicka till databasen");
    //   // Ha en failsafe för att se vilka object som finns i listan över sedan tidigare sparade objekt föra tt inte spara samma flera gånger? Hur ska vi göra versionhanteringen?
      
    //   let saveObject = new SaveObject( this.obj.name, 
    //                                    this.obj.functionDescription, 
    //                                    /* Vet ej hur vi vill göra vid denna delen av spara nod, kanske ha en spara funktionsdefinition som ärver från saveObject? eller bara annan funktion?*/
    //                                    100,
    //                                    100,
    //                                    0,
    //                                    {}, 
    //                                    {} );
    //                                    console.log("SAVED SAKER", JSON.parse


    /*
    {
        id : {functionvariable}, 
    }




    */
    //(JSON.stringify(saveObject)))

    //   this.functionDefinitions.push(saveObject);
export default { funcDefAPI, flowchartAPI }
