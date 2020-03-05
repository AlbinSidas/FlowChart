class Network {
    constructor(host, port, apiRoute) {
        this.host = host;
        this.port = port;
        this.apiRoute = apiRoute
        this.baseURL = `http://${this.host}:${this.port}`
    }

    async save(obj) {
        console.log("Fest i save", JSON.stringify(obj))
        fetch(`${this.baseURL}/${this.apiRoute}/save`, 
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
        const data = await fetch('http://localhost:3000/funcdef/all').then(res  => res.json())
                                                                     .then(res => res.data)
        return data;
    }

    async load() {

    }
}

class FuncDefAPI extends Network {
    constructor(host, port, apiRoute) {
        super(host, port, apiRoute)
    }

}


const funcDefAPI = new FuncDefAPI('localhost', '3000', 'funcdef')
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
    //                                    console.log("SAVED SAKER", JSON.parse(JSON.stringify(saveObject)))

    //   this.functionDefinitions.push(saveObject);
export default { funcDefAPI }
