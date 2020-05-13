const logError = require('../util/logger').error;

const Response = (message, data = null) => {
    const res = {
        message,
    };

    if (data) {
        res.data = data;
    }

    return res;
};

function ServerError(str, error) {
    const e = new Error(`${str} [BASED ON] --> ${error.toString()}`);
    return e;
}

module.exports = { Response, ServerError };
