const info = require('./util/logger.js').info;
const chalk = require('chalk');

function logMiddleware(req, res,  next) {
    const urlPaint     = chalk.blue(`${req.originalUrl}`);
    const requestPaint = chalk.green(`[REQUEST] ${req.method}:`); 
    
    let jsonPaint;
    if(Object.entries(req.body).length > 0) {
        jsonPaint = '\nJSON data:\n' + chalk.magenta(JSON.stringify(req.body, null, 4)) + '\n';
    } else {
        jsonPaint = chalk.yellow('[no json]');
    }

    let paramsPaint;
    const params = Object.entries(req.params);
    if(params.length > 0) {
        paramsPaint = chalk.blue(params.reduce((acc, element) => acc + `${element[0]}: ${element[1]} `, ''));
    } else {
        paramsPaint = chalk.yellow('[no params]');
    }

    info( requestPaint, urlPaint, paramsPaint, jsonPaint );
    next();
}



module.exports = {
    logMiddleware
}