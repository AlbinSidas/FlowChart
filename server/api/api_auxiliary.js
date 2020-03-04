const Response = (message, data = null) => {
    const res = {
        message
    }

    if(data) {
        res.data = data
    }

    return res;
}

module.exports = {Response}