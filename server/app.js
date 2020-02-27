const assert       = require('assert');
const config       = require('./config.js')
const express      = require('express')
const mongo        = require('./mongo.js')
const cors         = require('cors')
const bodyParser   = require('body-parser')
const fs           = require('fs');
const serverConfig = config.server
const dbConfig     = config.db 
const MongoHandler = mongo.MongoHanlder;
const Schema       = require('./schema.js')

async function main() {

    const app          = express()
    const url          = `mongodb://${dbConfig.ip_addr}:${dbConfig.port}`;
    const dbName       = dbConfig.db_name;
    const db           = await mongo.setup(url, dbName); //när du awaitar så kallar du på din promies then med resten av koden, kolla <Generators>
    const mongoHandler = MongoHandler(db);
    
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
        fs.writeFile("./saved/"+req.body.filename+".json",JSON.stringify(req.body.data),function (err) {
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

    app.post('/save', async (req, res) => {
        const data = req.body;
        try {
             await Schema.validate(data, Schema.jsonSchemas.funcDefSchema);
        } catch (InvalidTypeError) {
            console.log(InvalidTypeError)
            res.status(400);
            res.send(InvalidTypeError.message);
        }
        mongoHandler.saveFunctionDef(data)
        res.status(200)
        res.end("express");
    });
    app.listen(serverConfig.port, () => console.log(`Foran Flowchart server listening on port ${serverConfig.port}!`))
}

(function() {
   Promise.resolve(main());
})();