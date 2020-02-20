const assert       = require('assert');
const config       = require('./config.js')
const express      = require('express')
const mongo        = require('./mongo.js')
const serverConfig = config.server
const dbConfig     = config.db 

async function main() {

    const app     = express()
    const url     = `mongodb://${dbConfig.ip_addr}:${dbConfig.port}`;
    const dbName  = dbConfig.db_name;
    await mongo.setup(url, dbName) //när du awaitar så kallar du på din promies then med resten av koden, kolla <Generators>
    console.log("Back to main generated function")
    app.get('/', (req, res) => res.json({'apa':'Hello World!'}))
    app.get('/save/:filename/:content', function (req, res){
        
    })
    app.listen(serverConfig.port, () => console.log(`Foran Flowchart server listening on port ${serverConfig.port}!`))
}


(function() {
   Promise.resolve(main());
})();