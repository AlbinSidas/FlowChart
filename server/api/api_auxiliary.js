const logError = require('../util/logger').error;

const Response = (message, data = null, error = null) => {
    const res = {
        message
    }

    if (error) {
        res.error = error;
    }

    if(data) {
        res.data = data
    }

    return res;
}



function ServerError(str, error) {
    const e =  new Error(`${str} :BASED ON: --> ${error.toString()}`);
    logError(`${str} \n :BASED ON: --> ${error.toString()}`, "\n :STACK TRACE: --> ", error.stack);
    //logError(error.stack);
    return e;
}

module.exports = {Response, ServerError}