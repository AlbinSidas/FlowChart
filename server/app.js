const assert       = require('assert');
const config       = require('./config.js')
const express      = require('express')
const mongo        = require('./mongo.js')
const cors         = require('cors')
const bodyParser   = require('body-parser')
const serverConfig = config.server
const dbConfig     = config.db 

async function main() {

    const app     = express()
    const url     = `mongodb://${dbConfig.ip_addr}:${dbConfig.port}`;
    const dbName  = dbConfig.db_name;
    await mongo.setup(url, dbName) //när du awaitar så kallar du på din promies then med resten av koden, kolla <Generators>
    app.use(bodyParser.json())
     app.use(cors({
        "credentials": true,
        "origin": ["http://localhost:9000"],
        "methods": "GET, POST, PUT",
        "allowedHeaders": "Origin, X-Requested-With, Content-Type, Accept",
        "preflightContinue": true
    }))
    console.log("Back to main generated function")
    app.get('/', (req, res) => res.json({'apa':'Hello World!'}))

    app.put('/save', function (req, res){
        console.log(req.body)
        res.send("slurp");
    })

    app.get('/loadFile/:fileName', function (req, res){
        res.send("slurp");
    })
    
    app.get('/k', function (req, res){
        console.log("Load file name")
        res.status(500);
        res.end()
    })

    app.listen(serverConfig.port, () => console.log(`Foran Flowchart server listening on port ${serverConfig.port}!`))
}


(function() {
   Promise.resolve(main());
})();