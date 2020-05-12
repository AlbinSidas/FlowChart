const assert          = require('assert');
const config          = require('./config.js')
const express         = require('express')
const mongo           = require('./mongo/mongo-controller') 
const logMiddleware   = require('./middleware.js').logMiddleware
const cors            = require('cors')
const bodyParser      = require('body-parser')
const fs              = require('fs');
const serverConfig    = config.server
const dbConfig        = config.db 
const MongoHandler    = mongo.MongoHanlder;
const Schema          = require('./schema.js')
const apiAux          = require('./api/api_auxiliary')
const Response        = apiAux.Response


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

    function  errorHandler (err, req, res, next) {
        res.status(500).send(err.toString());
    }
    
    app.use(logMiddleware)
    app.use(errorHandler);
    app.get('/', (req, res) => res.json({'apa':'Hello World!'}))



// ================ FLOWCHART ====================
    app.post('/flowchart/save', async function (req, res) {
        try{
            const databaseOps = await mongoController.flowchartHandler.save(req.body)
            res.status(200)
            res.json(Response("Save flowchart", databaseOps));
        }
        catch(err){
            next(err)
            //res.json(Response("Error saving flowchart: ", error.toString()));
        }

    });

    app.get('/flowchart/all', async function (req, res) {
        try {  
            const databaseOps = await mongoController.flowchartHandler.getAll(); // kan behöva kallas på från någon annanstans om det blir större
            res.json(Response("", databaseOps));
        } catch(err) {
            next(err)
        }
    });

    app.get('/flowchart/view', async function(req, res) {
        try {
            const databaseOps = await mongoController.flowchartHandler.getView();
            res.json(Response("", databaseOps))
        } catch(err) {
            next(err);
        }
    });

    app.get('/flowchart/:id/:version?', async function (req, res) {
        try {
            const databaseOps = await mongoController.flowchartHandler.getOne(req.params.id, req.params.version)
            res.status(200)
            res.json(Response("Get flowchart: ", databaseOps));
        } catch(err) {
            next(err);
        }
    });

   app.post('/flowchart/version/add', async (req, res) => {
        try {
            const data = req.body;
            // SCHEMA VALIDATION?
            const databaseOps = await mongoController.flowchartHandler.addVersion(data);
            res.status(200)
            res.json(Response("Versioned function definition", databaseOps));
        } catch(err) {
            next(err);
        }
    });

    app.get('/flowchart/version/snapshot/:id', async(req, res) => {
        try{
            const result = await mongoController.flowchartHandler.getVersionSnpashot(req.params.id);
            res.status(200)
            res.json(Response("Fetched version numbers", result));
        }
        catch(error){
           next(error);
        }
    });

// ================= FUNCDEF =====================
    app.post('/funcdef/version/add', async (req, res) => {
        try {
            const data = req.body;
            // SCHEMA VALIDATION?
            const databaseOps = await mongoController.funcDefHandler.addVersion(data)
            res.status(200)
            res.json(Response("Versioned function definition", databaseOps));
        } catch(err) {
            next(err);
        }
    });

    app.get('/funcdef/version/snapshot/:id', async(req, res) => {
        try {
            const result = await mongoController.funcDefHandler.getVersionSnpashot(req.params.id);
            res.status(200);
            res.json(Response("Fetched version numbers", result));
        } catch(err) {
            next(err);
        }
    });

    // ORDNINGEN BLIR VIKTIG HÄR! Om funcdef/all ligger under funcdef/:id kommer "all" att
    // identifieras som id och därför gå in i fel path.
    app.get('/funcdef/all', async(req, res) => {
        try {
            const databaseOps = await mongoController.funcDefHandler.getAll(); // kan behöva kallas på från någon annanstans om det blir större
            res.json(Response("", databaseOps));
        } catch(err) {
            next(err);
        }
    });

    app.get('/funcdef/:id/:version?', async(req, res) => {
        try {
            const databaseOps = await mongoController.funcDefHandler.getOne(req.params.id, req.params.version); // kan behöva kallas på från någon annanstans om det blir större
            res.json(Response("", databaseOps));
        } catch(err) {
            next(err);
        }
    });

    app.post('/funcdef/save', async (req, res) => {
        const data = req.body;
        try {
            await Schema.validate(data, Schema.jsonSchemas.funcDefSchema);
        } catch (InvalidTypeError) {
            console.log(InvalidTypeError.message)
            res.status(400);
            res.send(InvalidTypeError.message);
            return
        }
        const databaseOps = await mongoController.funcDefHandler.save(data)
        res.status(200)
        res.json(Response("Save function definition", databaseOps));
    });

    app.listen(serverConfig.port, () => console.log(`Foran Flowchart server listening on port ${serverConfig.port}!`))
}

(function() {
   Promise.resolve(main());
})();