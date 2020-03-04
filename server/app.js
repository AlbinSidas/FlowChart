const assert          = require('assert');
const config          = require('./config.js')
const express         = require('express')
const mongo           = require('./mongo/mongo-controller') 
const cors            = require('cors')
const bodyParser      = require('body-parser')
const fs              = require('fs');
const serverConfig    = config.server
const dbConfig        = config.db 
const MongoHandler    = mongo.MongoHanlder;
const Schema          = require('./schema.js')
const apiAux          = require('./api/api_auxiliary')
const Response        = apiAux.Response
const apiHandlers     = require('./api/api-handlers');

async function main() {

    const app          = express()
    const url          = `mongodb://${dbConfig.ip_addr}:${dbConfig.port}`;
    const dbName       = dbConfig.db_name;
    
    // Kanske sätta ihopp de här två till en sak
    const db              = await mongo.setup(url, dbName); //när du awaitar så kallar du på din promies then med resten av koden, kolla <Generators>
    //const mongoHandler = MongoHandler(db);
    const mongoController = new mongo.MongoController(db)

    app.use(bodyParser.json());
    
    app.use(cors({
        "credentials": true,
        "origin": ["http://localhost:9000"],
        "methods": "GET, POST, PUT",
        "allowedHeaders": "Origin, X-Requested-With, Content-Type, Accept",
        "preflightContinue": true
    }))
    
    console.log("Back to main generated function")
    app.get('/', (req, res) => res.json({'apa':'Hello World!'}))

    app.put('/saved', function (req, res){
        fs.writeFile("./saved/"+req.body.filename+".json", JSON.stringify(req.body.data),function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
          }); 
        res.send("slurp");
    })

    app.get('/loadfile/:fileName', function (req, res){
        fs.readFile("./saved/"+req.params.fileName,function (err, data) {
            if (err) throw err;
            res.send(data);
          }); 
    });
    
    app.get('/loadfilenames', function (req, res){
        fs.readdir("./saved/",function (err, files) {
            if (err) throw err;
            res.send(files);
          }); 
    });

    app.post('/funcdef/save', async (req, res) => {
        const data = req.body;
        try {
            await Schema.validate(data, Schema.jsonSchemas.funcDefSchema);
        } catch (InvalidTypeError) {
            console.log("invalidated")
            console.log(InvalidTypeError.message)
            res.status(400);
            res.send(InvalidTypeError.message);
            return
        }
        const databaseOps = await mongoController.funcDefHandler.save(data)
        res.status(200)
        res.json(Response("Save function definition", databaseOps));
    });

    app.get('/funcdef/all', async(req, res) => {
        const databaseOps = await mongoController.funcDefHandler.getAll(); // kan behöva kallas på från någon annanstans om det blir större
        res.json(Response("", databaseOps))
    });

    app.get('/funcdef/:id', async(req, res) => {
        const databaseOps = await mongoController.funcDefHandler.getById(req.params.id); // kan behöva kallas på från någon annanstans om det blir större
        res.json(Response("", databaseOps))
    });



    app.listen(serverConfig.port, () => console.log(`Foran Flowchart server listening on port ${serverConfig.port}!`))
}

(function() {
   Promise.resolve(main());
})();